import escapeStringRegexp from "escape-string-regexp"
import {Request, Response, NextFunction} from "express"
import React from "react"
import CleanCSS from "clean-css"
import {Provider} from "react-redux"
import ReactDOMServer from "react-dom/server"
import {ServerStyleSheet as StyledComponentSheets} from "styled-components"
import {ServerStyleSheets as MaterialUiServerStyleSheets, createGenerateClassName} from "@mui/styles"
import {FONTS} from "@monorepo/themes"
import BFFLogger from "../../core/BFFLogger"
import {makeStore} from "../../../ducks"
import env from "../../../config/env"
import App from "../../../App"
import getServerSideProps from "../../../App.server"

const renderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let html = req.html || ""
    let SHEETS = ""
    let htmlContent = ""
    try {
        // Create the Redux store
        const store = makeStore() as any
        const serverSideProps: any = await getServerSideProps(req, res, store)
        serverSideProps.appScope = (req as any).appScope
        serverSideProps.themeVersion = (req as any).themeVersion

        // Extract styles
        const scopedCSSClassname = `${
            serverSideProps.appScope ? serverSideProps.appScope.split("static")[0].substring(0, 6) : "footer"
        }`
        const styledComponentSheet = new StyledComponentSheets()

        const generateClassName = createGenerateClassName({
            productionPrefix: scopedCSSClassname,
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
            let styledComponentsStyles = styledComponentSheet.getStyleTags()
            if (styledComponentsStyles?.includes("</style>")) {
                styledComponentsStyles = styledComponentsStyles.slice(
                    styledComponentsStyles.indexOf(">") + 1,
                    styledComponentsStyles.indexOf("</style>"),
                )
            }

            SHEETS = `<style id="footer-jss-server-side" data-reactroot="">${
                new CleanCSS().minify(materialUiSheets.toString() + styledComponentsStyles).styles
            }</style>`
        }

        // Get a copy of store data to create the same store on client side
        const preloadedState = store.getState()

        // removing the theme from the initial props as it will be in the window object
        const {themeColours, ...otherSSRProps} = serverSideProps

        const htmlReplacements: StringMap = {
            HTML_CONTENT: htmlContent,
            INITIAL_STATE: JSON.stringify(preloadedState),
            SHEETS,
            APP_PROPS: JSON.stringify(otherSSRProps),
            DEVELOPER_MODE: env.DEVELOPMENT
                ? `<html><head>
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <noscript id="jss-insertion-point"></noscript>
                            ${FONTS(
                                (req as any).theme,
                                `${env.REACT_APP_BLOB_STORAGE_PATH}/fonts`,
                                "#platform_modernisation_footer",
                            )}
                            <script id="themeColours">
                                window.themeColours = ${JSON.stringify({
                                    [otherSSRProps.themeVersion]: (req as any).theme,
                                })}
                            </script>
                            <script src="${
                                env.REACT_APP_BLOB_STORAGE_PATH
                            }/vendors/core-js/2.6.11/core.min.js"></script>
                            <script src="${
                                env.REACT_APP_BLOB_STORAGE_PATH
                            }/vendors/react/16.13.1/umd/react.production.min.js"></script>
                            <script src="${
                                env.REACT_APP_BLOB_STORAGE_PATH
                            }/vendors/react/16.13.1/umd/react-dom.production.min.js" ></script>
                        </head><body>`
                : "",
            END_DEVELOPER_MODE: env.DEVELOPMENT ? `</body></html>` : "",
        }

        Object.keys(htmlReplacements).forEach(key => {
            const value = htmlReplacements[key]
            html = html.replace(new RegExp(`__${escapeStringRegexp(key)}__`, "g"), value)
        })
        if ((req as any).siteUrl) {
            const re = new RegExp((req as any).siteUrl.token, "g")
            html = html.replace(re, `${(req as any).siteUrl.url}${(req as any).siteUrl.token}`)
        }

        if (!env.DEVELOPMENT) html = html.substring(0, html.indexOf("<script src"))
        ;(res as any).html = html
        ;(res as any).isDefaultFooter = serverSideProps.isConfError
        next()
    } catch (err) {
        // send appInsights
        BFFLogger.error(err)
        res.status(500).send("Error")
    }
}

export default renderMiddleware
