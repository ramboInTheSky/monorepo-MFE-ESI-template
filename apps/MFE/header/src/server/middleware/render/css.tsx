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
import {BASELINECSS_MATERIALUI, JSS_SERVERSIDE} from "../../../config/constants"
import getServerSideProps from "../../../App.server"

const cssMiddleware = async (req: any, res: Response, _next: NextFunction) => {
    let SHEETS
    try {
        const store = makeStore()
        const serverSideProps: any = getServerSideProps ? await getServerSideProps(req, res, store) : {}
        serverSideProps.appScope = "header"
        const styledComponentSheet = new StyledComponentSheets()
        const generateClassName = createGenerateClassName({
            productionPrefix: serverSideProps.appScope,
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
            if (req.params.type !== BASELINECSS_MATERIALUI) {
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
        res.status(200).send(`<style id="${JSS_SERVERSIDE}${req.params.type}">${SHEETS}</style>`)
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).send("CSS Error")
    }
}

export default cssMiddleware
