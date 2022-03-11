import escapeStringRegexp from "escape-string-regexp"
import {Request, Response, NextFunction} from "express"
import React from "react"
import {Provider} from "react-redux"
import ReactDOMServer from "react-dom/server"
import {ServerStyleSheet as StyledComponentSheets} from "styled-components"
import {ServerStyleSheets as MaterialUiServerStyleSheets, createGenerateClassName} from "@mui/styles"
import BFFLogger from "../../core/BFFLogger"
import {makeStore} from "../../../ducks"
import App from "../../../App"
import env from "../../../config/env"
import getServerSideProps from "../../../App.server"

const renderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let html = req.html || ""
    let SHEETS = ""
    try {
        // Create the Redux store
        const store = makeStore() as any
        const serverSideProps: any = await getServerSideProps(req, res, store)

        if (serverSideProps.isDataError) {
            return res.sendStatus(204)
        }

        if (serverSideProps.isNotModified) {
            return res.sendStatus(304)
        }

        serverSideProps.appScope = req.appScope
        serverSideProps.themeVersion = req.themeVersion
        const scopedCSSClassname = `${
            serverSideProps.appScope ? serverSideProps.appScope.split("static")[0].substring(0, 6) : "produc"
        }`
        const styledComponentSheet = new StyledComponentSheets()
        const generateClassName = createGenerateClassName({
            productionPrefix: scopedCSSClassname,
            disableGlobal: true,
        })

        const materialUiSheets = new MaterialUiServerStyleSheets({
            serverGenerateClassName: generateClassName,
        })
        const htmlContent = ReactDOMServer.renderToString(
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
        const {themeColours, ...otherSSRProps} = serverSideProps

        const htmlReplacements: StringMap = {
            HTML_CONTENT: htmlContent,
            INITIAL_STATE: JSON.stringify(preloadedState),
            APP_PROPS: JSON.stringify(otherSSRProps),
            ITEM_NUMBER:
                typeof req.params.itemNumber !== "number" ? `"${req.params.itemNumber}"` : req.params.itemNumber,
            RAW_ITEM_NUMBER: req.params.itemNumber,
            SHEETS,
            DEVELOPER_MODE: env.DEVELOPMENT
                ? `<html>
                        <head>
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <noscript id="jss-insertion-point"></noscript>
                                <style> body {max-width: 216px;} .prod-summary-star-rating--hidden div { display: none;}</style> 
                                    <script>
                                        window.themeColours = ${JSON.stringify({
                                            [otherSSRProps.themeVersion]: req.theme,
                                        })}
                                    </script>
                                    <script nomodule src="${
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
        if (req.siteUrl) {
            const re = new RegExp(req.siteUrl.token, "g")
            html = html.replace(re, `${req.siteUrl.url}${req.siteUrl.token}`)
        }

        // remove the scripts from the fragment, those will need to be downloaded separately by the downstream app (plp)
        if (!env.DEVELOPMENT) html = html.substring(0, html.indexOf("<script src"))
        ;(res as any).html = html

        next()
    } catch (err) {
        BFFLogger.error(err)
        res.sendStatus(500)
    }
}

export default renderMiddleware
