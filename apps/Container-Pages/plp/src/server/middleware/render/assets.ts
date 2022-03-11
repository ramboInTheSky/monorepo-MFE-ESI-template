import {ThemeColor} from "@monorepo/themes"
import {env as runtimeEnv} from "process"
import env from "../../../config/env"
import {version} from "../../../../package.json"

const headerEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    env.REACT_APP_HEADER_BASEURL && useDevEsi ? env.REACT_APP_HEADER_BASEURL : SITEURL
const meganavEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    env.REACT_APP_MEGANAV_BASEURL && useDevEsi ? env.REACT_APP_MEGANAV_BASEURL : SITEURL
const footerEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    env.REACT_APP_FOOTER_BASEURL && useDevEsi ? env.REACT_APP_FOOTER_BASEURL : SITEURL
const productSummaryEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    env.REACT_APP_PROD_SUMM_BASEURL && useDevEsi ? env.REACT_APP_PROD_SUMM_BASEURL : SITEURL

export const HEADER = (SITEURL: string, useDevEsi: boolean) =>
    `
    <esi:include src="${headerEsiBaseUrl(SITEURL, useDevEsi)}/header" onerror="continue" />
    <esi:include src="${meganavEsiBaseUrl(
        SITEURL,
        useDevEsi,
    )}/meganavstatic/seo-content/home" onerror="continue" dca="none" />
    `

export const FOOTER = (SITEURL: string, useDevEsi: boolean) =>
    `<esi:include src="${footerEsiBaseUrl(SITEURL, useDevEsi)}/footer" onerror="continue" dca="none" />`

export const VENDORS = env.DEVELOPMENT
    ? `
            <script nomodule src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/core-js/3.18.3/core.min.js"></script>
            <script crossorigin src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.development.js"></script>
            <script crossorigin src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.development.js"></script>
        `
    : `
        <script nomodule src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/core-js/3.18.3/core.min.js"></script>
        <script src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.production.min.js"></script>
        <script src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.production.min.js" ></script>
        `

// Need to load IE polyfills before React
export const PRELOAD = (SITEURL: string, useDevEsi: boolean, theme: ThemeColor) =>
    `
            <link href="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""}${env.REACT_APP_BLOB_STORAGE_PATH}/plp${
        runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""
    }/css/2.${version}.chunk.css" rel="stylesheet">
            <esi:include src="${
                headerEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_HEADER_ASSETS_PATH
            }/dependencies/preloadvendor" onerror="continue" />
            <link rel="preload" as="script" href="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/plp${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""}/js/2.${version}.chunk.js" />
            <link rel="preload" as="script" href="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/plp${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""}/js/main.${version}.chunk.js" />
            <esi:include src="${
                productSummaryEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_PROD_SUMM_ASSETS_PATH
            }/dependencies/preload" onerror="continue" dca="none" />
           
            <esi:include src="${
                footerEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_FOOTER_ASSETS_PATH
            }/dependencies/preload" onerror="continue" dca="none" />
            ${env.DEVELOPMENT ? '<noscript id="jss-insertion-point"></noscript>' : ""}
            <style>#plp-entrypoint{font-family: ${theme.font.primary.regular.family}, ${
        theme.font.default
    };}</style>`

export const THEME = (theme: ThemeColor, versionTheme: string) => `
    <script id="themeColours">
        window.themeColours = window.themeColours || {};
        window.themeColours${`["${versionTheme}"]`} = ${JSON.stringify(theme)}
    </script>
`

export const ESI_MUI_CSS = (SITEURL: string, useDevEsi: boolean) => `
                <esi:include src="${
                    headerEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_HEADER_ASSETS_PATH
                }/baselinecss/materialui" onerror="continue" />
                <esi:include src="${
                    productSummaryEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_PROD_SUMM_ASSETS_PATH
                }/baselinecss/materialui" onerror="continue" dca="none" />
                <esi:include src="${
                    footerEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_FOOTER_ASSETS_PATH
                }/baselinecss/materialui" onerror="continue" dca="none" />
`

export const ESI_CUSTOM_CSS = (SITEURL: string, useDevEsi: boolean) => `
                <esi:include src="${
                    headerEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_HEADER_ASSETS_PATH
                }/baselinecss/custom" onerror="continue" />
                <esi:include src="${
                    productSummaryEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_PROD_SUMM_ASSETS_PATH
                }/baselinecss/custom" onerror="continue" dca="none" />
                <esi:include src="${
                    footerEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_FOOTER_ASSETS_PATH
                }/baselinecss/custom" onerror="continue" dca="none" />
        `

export const BUNDLE = `
    <script src="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""}${env.REACT_APP_BLOB_STORAGE_PATH}/plp${
    runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""
}/js/2.${version}.chunk.js" ></script>
    <script src="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""}${env.REACT_APP_BLOB_STORAGE_PATH}/plp${
    runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""
}/js/main.${version}.chunk.js" ></script>
`

export const PRODUCT_SUMMARY_BUNDLES = (SITEURL: string, useDevEsi: boolean) => `
            <esi:include src="${
                productSummaryEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_PROD_SUMM_ASSETS_PATH
            }/dependencies/bundle" onerror="continue" dca="none" />
            `

export const HEADER_BUNDLES = (SITEURL: string, useDevEsi: boolean) => `
            <esi:include src="${
                headerEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_HEADER_ASSETS_PATH
            }/dependencies/bundlevendor" onerror="continue" />
            `
export const FOOTER_BUNDLES = (SITEURL: string, useDevEsi: boolean) => `
            <esi:include src="${
                footerEsiBaseUrl(SITEURL, useDevEsi) + env.REACT_APP_FOOTER_ASSETS_PATH
            }/dependencies/bundle" onerror="continue" dca="none" />
            `

export const FAV_ICON_PATH = (cdnBaseUrl: string, realm: string) => `${cdnBaseUrl}/icons/favicon/${realm}.ico`
