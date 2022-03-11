import escapeStringRegexp from "escape-string-regexp"
import {NextFunction, Request, Response} from "express"
import React from "react"
import {Provider} from "react-redux"
import {FONTS} from "@monorepo/themes"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import ReactDOMServer from "react-dom/server"
import {ServerStyleSheet as StyledComponentSheets} from "styled-components"
import {ServerStyleSheets as MaterialUiServerStyleSheets, createGenerateClassName} from "@mui/styles"
import BFFLogger from "../../core/BFFLogger"
import {makeStore} from "../../../ducks"
import env from "../../../config/env"
import App from "../../../App"
import getServerSideProps from "../../../App.server"
import {ESI_MUI_CSS, ESI_CUSTOM_CSS, SPLASH_SCREEN_HTML, BOOKMARK_TITLE} from "./assets"
import {DEV_ESI_HEADER} from "../../../config/constants"
import getGoogleAnalyticsConfig from "../../../utils/getGoogleAnalyticsConfig"
import getMonetateConfig from "../../../utils/getMonetateConfig"
import {SettingsSdkKeys} from "../../../models/settings"

const renderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let html = req.html || ""
    let SHEETS = ""
    let htmlContent = ""
    try {
        const headers = getSettingsHeadersAsObject(req.headers)
        const realm = (headers?.realm as string)?.toLowerCase()
        // Create the Redux store
        const store = makeStore() as any
        const serverSideProps: any = getServerSideProps ? await getServerSideProps(req, res, store) : {}
        serverSideProps.appScope = "header"
        serverSideProps.themeVersion = req.themeVersion
        serverSideProps.siteUrl = req.siteUrl.url
        const useDevEsi = !!req.headers[DEV_ESI_HEADER]
        serverSideProps.useDevEsi = useDevEsi

        // Extract styles
        const styledComponentSheet = new StyledComponentSheets()
        const generateClassName = createGenerateClassName({
            productionPrefix: serverSideProps.appScope,
            disableGlobal: true,
        })

        const materialUiSheets = new MaterialUiServerStyleSheets({
            serverGenerateClassName: generateClassName,
        })
        htmlContent = ReactDOMServer.renderToString(
            styledComponentSheet.collectStyles(
                materialUiSheets.collect(
                    <Provider store={store}>
                        <App {...serverSideProps} />
                    </Provider>,
                ),
            ),
        )
        if (env.DEVELOPMENT) {
            SHEETS = ReactDOMServer.renderToString(
                <>
                    {materialUiSheets.getStyleElement()}
                    {styledComponentSheet.getStyleElement()}
                </>,
            )
        }

        // Get a copy of store data to create the same store on client side
        const preloadedState = store.getState()
        // removing the theme from the initial props as it will be in the window object
        const {themeColours, text, ...otherSSRProps} = serverSideProps
        const config = res.locals.configuration
        const gaConfig = getGoogleAnalyticsConfig(config)
        const monetateConfig = getMonetateConfig(config)

        const htmlReplacements: StringMap = {
            HTML_CONTENT: htmlContent,
            ESI_MUI_CSS: ESI_MUI_CSS(req.siteUrl.url, useDevEsi),
            ESI_CUSTOM_CSS: ESI_CUSTOM_CSS(req.siteUrl.url, useDevEsi),
            INITIAL_STATE: JSON.stringify(preloadedState),
            SHEETS,
            APP_PROPS: JSON.stringify(otherSSRProps),
            DEVELOPER_MODE: env.DEVELOPMENT
                ? `<html><head>
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <noscript id="jss-insertion-point"></noscript>
                            ${FONTS(
                                themeColours,
                                `${env.REACT_APP_BLOB_STORAGE_PATH}/fonts`,
                                "#platform_modernisation_header",
                            )}
                            ${BOOKMARK_TITLE(config[SettingsSdkKeys.bookmarkTitle])}
                            ${SPLASH_SCREEN_HTML(realm)}
                            <script id="themeColours">
                                window.themeColours = ${JSON.stringify({
                                    [otherSSRProps.themeVersion]: req.theme,
                                })}
                            </script>
                            <script nomodule src="${
                                env.REACT_APP_BLOB_STORAGE_PATH
                            }/vendors/core-js/3.18.3/core.min.js"></script>
                            <script src="${
                                env.REACT_APP_BLOB_STORAGE_PATH
                            }/vendors/react/16.13.1/umd/react.development.js"></script>
                            <script src="${
                                env.REACT_APP_BLOB_STORAGE_PATH
                            }/vendors/react/16.13.1/umd/react-dom.development.js" ></script>
                            
                            <script type="text/javascript">var monetateT = new Date().getTime();</script>
                            <script type="text/javascript" src=${monetateConfig.accountMonetateSDK}></script>
                        
                            <script src="${env.REACT_APP_BLOB_STORAGE_PATH}/monetate-sdk/monetate.js" ></script>
                            <script src="${env.REACT_APP_BLOB_STORAGE_PATH}/gtm-sdk/gtm.js" ></script>
                        </head><body>`
                : "",
            END_DEVELOPER_MODE: env.DEVELOPMENT ? `</body></html>` : "",
            MONETATE: monetateConfig.enableMonetateSDK
                ? `<script type="text/javascript"> 
                if (window.document.getElementById("platform_modernisation") || (window.platmodflags && window.platmodflags.monetateEvents) && MonetateShoppingBagSDK) {
                    MonetateShoppingBagSDK.Initialise("${req.siteUrl.url}") 
                }
            </script>`
                : "",
            GTM: gaConfig.useGoogleAnalytics
                ? `<script type="text/javascript"> 
            if (window.document.getElementById("platform_modernisation") || (window.platmodflags && window.platmodflags.googleAnalytics) && GoogleAnalyticsNext) {
                 GoogleAnalyticsNext.GoogleTagManager("${gaConfig.account}", "${gaConfig.environmentKey}") 
            }
        </script>`
                : "",
        }

        Object.keys(htmlReplacements).forEach(key => {
            const value = htmlReplacements[key]
            html = html.replace(new RegExp(`__${escapeStringRegexp(key)}__`, "g"), value)
        })

        if (req.siteUrl) {
            const re = new RegExp(req.siteUrl.token, "g")
            html = html.replace(re, `${req.siteUrl.url}${req.siteUrl.token}`)
        }
        // remove the scripts from the fragment, those will need to be downloaded separately by the downstream app (plp)
        if (!env.DEVELOPMENT) html = html.substring(0, html.indexOf("<script src"))

        if (process.env.IE) {
            html = html.replace(/localhost/g, process.env.IE)
        }

        ;(res as any).html = html

        next()
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).send("Error")
    }
}

export default renderMiddleware
