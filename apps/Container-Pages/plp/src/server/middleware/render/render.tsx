import escapeStringRegexp from "escape-string-regexp"
import {Request, Response, NextFunction} from "express"
import React from "react"
import {Provider} from "react-redux"
import ReactDOMServer from "react-dom/server"
import {FONTS} from "@monorepo/themes"
import {StringMap} from "react-app-env"
import {ServerStyleSheet as StyledComponentSheets} from "styled-components"
import {ServerStyleSheets as MaterialUiServerStyleSheets, createGenerateClassName} from "@mui/styles"
import BFFLogger from "../../core/BFFLogger"
import {makeStore} from "../../../ducks"
import {
    PRODUCT_SUMMARY_BUNDLES,
    PRELOAD,
    ESI_CUSTOM_CSS,
    ESI_MUI_CSS,
    HEADER_BUNDLES,
    FOOTER_BUNDLES,
    THEME,
    HEADER,
    FOOTER,
    VENDORS,
    BUNDLE,
    FAV_ICON_PATH,
} from "./assets"
import env from "../../../config/env"
import {removeWebpackGeneratedCSS, removeWebpackGeneratedScripts} from "../../../utils/removeWebpackGeneratedFiles"
// eslint-disable-next-line import/no-named-as-default
import App from "../../../App"
import getServerSideProps from "../../../App.server"
import {isRedirectResponse} from "../../../models/searchApi/typeGuards"
import ClientRedirect from "./clientRedirect"
import {
    DEV_ESI_HEADER,
    LANGUAGE_HEADER,
    TERRITORY_HEADER,
    SEO_METADATA_INCLUDE_COMPONENTS,
} from "../../../config/constants"
import {generateSeoMetaTagsHtml} from "../../../utils/seo/generateSeoMetaTagsHtml"
import {selectSeoMetadata} from "../../../utils/seo/selectSeoMetadata"
import {selectOverrideMetadata} from "../../../ducks/feature-switch"
import OVERRIDE_SEO_METADATA from "./seo-metadata"

const renderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let html = req.html || ""
    let SHEETS = ""
    let htmlContent = ""
    let METADATA
    try {
        // Create the Redux store
        const store = makeStore()
        const {appProps: serverSideProps, otherProps} = await getServerSideProps(req, res, store)
        serverSideProps.appScope = "plp"
        serverSideProps.themeVersion = req.themeVersion

        if (otherProps && otherProps.searchResponse && isRedirectResponse(otherProps.searchResponse)) {
            ClientRedirect(res, req.siteUrl.url, otherProps.searchResponse)
            return
        }

        const enableOverrideMetadata = selectOverrideMetadata(store.getState())
        const stateSeoMetadata = selectSeoMetadata(store.getState())

        const {includedComponents} = store.getState().search

        // For seo metadata
        if (enableOverrideMetadata && includedComponents.includes(SEO_METADATA_INCLUDE_COMPONENTS)) {
            const urlPath = req.originalUrl
            METADATA = OVERRIDE_SEO_METADATA(req.siteUrl.url, urlPath, stateSeoMetadata, req.baseUrl)
        } else {
            METADATA = generateSeoMetaTagsHtml(stateSeoMetadata, req.siteUrl.url, req.baseUrl)
        }

        // Extract styles
        const scopedCSSClassname = serverSideProps.appScope
        const styledComponentSheet = new StyledComponentSheets()
        const generateClassName = createGenerateClassName({
            productionPrefix: scopedCSSClassname,
            disableGlobal: true,
        })

        const materialUiSheets = new MaterialUiServerStyleSheets({
            serverGenerateClassName: generateClassName,
        })

        const startTime = Date.now()

        htmlContent = ReactDOMServer.renderToString(
            styledComponentSheet.collectStyles(
                materialUiSheets.collect(
                    <Provider store={store}>
                        <App {...serverSideProps} />
                    </Provider>,
                ),
            ),
        )
        const duration = Date.now() - startTime
        BFFLogger.dependency("ReactDOMServer.renderToString", duration)
        let styledComponentsStyles = styledComponentSheet.getStyleTags()
        if (styledComponentsStyles?.includes("</style>")) {
            styledComponentsStyles = styledComponentsStyles.slice(
                styledComponentsStyles.indexOf(">") + 1,
                styledComponentsStyles.indexOf("</style>"),
            )
        }

        SHEETS = `<style id="plp-jss-server-side-custom" data-reactroot="">${
            materialUiSheets.toString() + styledComponentsStyles
        }</style>`

        // Get a copy of store data to create the same store on client side
        const preloadedState = store.getState()
        const {
            search: {seoFilters},
            ...restOfState
        } = preloadedState
        const finalState = {...restOfState, search: {...preloadedState.search, seoFilters: null}}

        // remove theme from the initial props (as the THEME template variable will put it in the window object)
        const {themeColours, ...otherSSRProps} = serverSideProps

        if (!env.DEVELOPMENT && !env.REACT_APP_INCLUDE_VENDORS) {
            html = removeWebpackGeneratedScripts(html)
            html = removeWebpackGeneratedCSS(html)
        }

        const SITEURL = req.siteUrl.url
        const useDevEsi = !!req.headers[DEV_ESI_HEADER]
        const htmlReplacements: StringMap = {
            VENDORS: env.DEVELOPMENT || env.REACT_APP_INCLUDE_VENDORS ? VENDORS : "",
            FONTS:
                env.DEVELOPMENT || env.REACT_APP_INCLUDE_VENDORS
                    ? FONTS(req.theme, `${env.REACT_APP_BLOB_STORAGE_PATH}/fonts`, "#plp-entrypoint")
                    : "",
            BUNDLE,
            HTML_CONTENT: htmlContent,
            INITIAL_STATE: JSON.stringify(finalState),
            SHEETS,
            ESI_MUI_CSS: ESI_MUI_CSS(SITEURL, useDevEsi),
            ESI_CUSTOM_CSS: ESI_CUSTOM_CSS(SITEURL, useDevEsi),
            APP_PROPS: JSON.stringify(otherSSRProps),
            PRODUCT_SUMMARY_BUNDLES: PRODUCT_SUMMARY_BUNDLES(SITEURL, useDevEsi),
            HEADER_BUNDLES: HEADER_BUNDLES(SITEURL, useDevEsi),
            FOOTER_BUNDLES: FOOTER_BUNDLES(SITEURL, useDevEsi),
            PRELOAD: PRELOAD(SITEURL, useDevEsi, req.theme),
            THEME: THEME(req.theme, otherSSRProps.themeVersion),
            HEADER: HEADER(SITEURL, useDevEsi),
            SEO_FILTERS: seoFilters,
            DIRECTION: serverSideProps.textAlignment,
            FOOTER: FOOTER(SITEURL, useDevEsi),
            FAV_ICON_PATH: FAV_ICON_PATH(env.REACT_APP_BLOB_STORAGE_PATH, serverSideProps.realm),
            METADATA,
            lang:
                req.headers[LANGUAGE_HEADER] && req.headers[TERRITORY_HEADER]
                    ? `lang="${req.headers[LANGUAGE_HEADER]}-${req.headers[TERRITORY_HEADER]}"`
                    : "",
        }

        Object.keys(htmlReplacements).forEach(key => {
            const value = htmlReplacements[key]
            html = html.replace(new RegExp(`__${escapeStringRegexp(key)}__`, "g"), value)
        })
        if (req.siteUrl.token) {
            const re = new RegExp(req.siteUrl.token, "g")
            html = html.replace(re, `${req.siteUrl.url}${req.siteUrl.token}`)
        }

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
