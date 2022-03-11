import {Response, NextFunction} from "express"
import React from "react"
import Minifier from "clean-css"
import ReactDOMServer from "react-dom/server"
import {Provider} from "react-redux"
import {ServerStyleSheet as StyledComponentSheets} from "styled-components"
import {ServerStyleSheets as MaterialUiServerStyleSheets, createGenerateClassName} from "@mui/styles"
import BFFLogger from "../../core/BFFLogger"
import {makeStore} from "../../../ducks"
import App from "../../../App"
import getServerSideProps from "../../../App.server"
import {
    BASELINECSS_GENERATE_CSS_ITEM_NUMBER,
    BASELINECSS_MATERIALUI,
    QUERY_PARAMETER_NEW_IN,
    JSS_SERVERSIDE,
} from "../../../config/settings"

const cssMiddleware = async (req: any, res: Response, _next: NextFunction) => {
    let SHEETS
    try {
        const cssType = req.params.type
        req.params.type = null
        // We need every component to render so we capture all the css the tile needs.
        req.params.itemNumber = BASELINECSS_GENERATE_CSS_ITEM_NUMBER
        req.query[QUERY_PARAMETER_NEW_IN] = "true"
        const store = makeStore() as any
        const serverSideProps: any = await getServerSideProps(req, res, store)
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
        try {
            const materialUiSheets = new MaterialUiServerStyleSheets({
                serverGenerateClassName: generateClassName,
            })
            ReactDOMServer.renderToString(
                styledComponentSheet.collectStyles(
                    materialUiSheets.collect(
                        <Provider store={store}>
                            <App {...serverSideProps} />
                        </Provider>,
                    ),
                ),
            )
            if (cssType !== BASELINECSS_MATERIALUI) {
                let styledComponentsStyles = styledComponentSheet.getStyleTags()
                if (styledComponentsStyles?.includes("</style>")) {
                    styledComponentsStyles = styledComponentsStyles.slice(
                        styledComponentsStyles.indexOf(">") + 1,
                        styledComponentsStyles.indexOf("</style>"),
                    )
                }
                SHEETS = new Minifier().minify(styledComponentsStyles).styles
            } else {
                SHEETS = new Minifier().minify(materialUiSheets.toString()).styles
            }
        } finally {
            styledComponentSheet.seal()
        }
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Content-Type", "text/css")
        res.status(200).send(`<style id="${JSS_SERVERSIDE}${cssType}">${SHEETS}</style>`)
    } catch (err) {
        BFFLogger.error(new Error(err))
        res.status(500).send("CSS Error")
    }
}

export default cssMiddleware
