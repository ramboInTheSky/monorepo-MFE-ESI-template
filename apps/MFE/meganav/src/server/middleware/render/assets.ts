import {FONTS, ThemeColor} from "@monorepo/themes"
import {env as runtimeEnv} from "process"
import {version} from "../../../../package.json"
import env from "../../../config/env"
import {BFFLogger} from "../../core/BFFLogger"

const {REACT_APP_BLOB_STORAGE_PATH, DEVELOPMENT} = env

const fontPreloadBuilder = (theme: ThemeColor) => {
    const stringBuilder =
        (filename: string) =>
        (formats: string[]): string => {
            return formats
                .map(
                    format =>
                        `<link rel="preload" as="font" href="${REACT_APP_BLOB_STORAGE_PATH}/fonts/${filename}.${format}" type="font/${format}" crossorigin="anonymous"/>`,
                )
                .join("\n")
        }
    const primaryFontBuilder = Object.keys(theme.font.primary)
        .map(
            type =>
                theme.font.primary[type].filename &&
                stringBuilder(theme.font.primary[type].filename)(theme.font.primary[type].formats),
        )
        .join("\n")

    const secondaryFontBuilder = Object.keys(theme.font.secondary)
        .map(
            type =>
                theme.font.secondary[type].filename &&
                stringBuilder(theme.font.secondary[type].filename)(theme.font.secondary[type].formats),
        )
        .join("\n")

    return primaryFontBuilder + secondaryFontBuilder
}

export const PRELOAD = (theme: ThemeColor, versionTheme: string, SITEURL: string) => {
    let stringifiedTheme
    const url = new URL(SITEURL)
    const siteurl = `${url.protocol}//${url.host}`

    try {
        stringifiedTheme = JSON.stringify(theme)
    } catch (err) {
        BFFLogger.error(err)
    }
    return `
        <link rel="preload" as="script" href="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/meganav/js/2.${version}.chunk.js" />
        <link rel="preload" as="script" href="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/meganav/js/main.${version}.chunk.js" />
        <script name="themeColours">
            window.themeColours = window.themeColours || {}; 
            window.themeColours${`["${versionTheme}"]`} = ${stringifiedTheme}
        </script>
        <style>#meganav-entrypoint{font-family: ${theme.font.primary.regular.family}, ${
        theme.font.default
    }; }</style>
    `
}

export const PRELOAD_VENDOR = (theme: ThemeColor, versionTheme: string, SITEURL: string) => `
    ${fontPreloadBuilder(theme)}
    <link rel="preload" as="script" href="${REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.${
    DEVELOPMENT ? "development" : "production.min"
}.js" />
            <link rel="preload" as="script" href="${REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.${
    DEVELOPMENT ? "development" : "production.min"
}.js" />
    ${PRELOAD(theme, versionTheme, SITEURL)}
    ${FONTS(theme, `${REACT_APP_BLOB_STORAGE_PATH}/fonts`, "#meganav-entrypoint")}
    `

export const PRELOAD_JSS = (theme: ThemeColor, versionTheme: string, SITEURL: string) => `
    ${PRELOAD(theme, versionTheme, SITEURL)}
    <noscript id="jss-insertion-point"></noscript>
    `

export const PRELOAD_JSS_VENDOR = (theme: ThemeColor, versionTheme: string, SITEURL: string) => `
    ${PRELOAD_VENDOR(theme, versionTheme, SITEURL)}
    <noscript id="jss-insertion-point"></noscript>
    `

export const BUNDLE = (SITEURL: string) => {
    const url = new URL(SITEURL)
    const siteurl = `${url.protocol}//${url.host}`
    return `
    <script src="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/meganav/js/2.${version}.chunk.js" ></script>
    <script src="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/meganav/js/main.${version}.chunk.js" ></script>
    `
}

export const BUNDLE_VENDOR = (SITEURL: string) => `
    <script nomodule src="${REACT_APP_BLOB_STORAGE_PATH}/vendors/core-js/2.6.11/core.min.js"></script>
    <script src="${REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.${
    DEVELOPMENT ? "development" : "production.min"
}.js"></script>
    <script src="${REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.${
    DEVELOPMENT ? "development" : "production.min"
}.js"></script>
    ${BUNDLE(SITEURL)}
    `
