import {FONTS, ThemeColor} from "@monorepo/themes"
import {env as runtimeEnv} from "process"
import {version} from "../../../../package.json"
import env from "../../../config/env"
import {BFFLogger} from "../../core/BFFLogger"

const fontPreloadBuilder =
    (fontFamily: string) =>
    (...formats: string[]): string => {
        return formats
            .map(
                format =>
                    // TACTICAL SOLUTION to allow for Fonts to be downloaded from the same place as MVC whilst we don't have a blob-storage
                    // `<link rel="preload" as="font" href="${env.REACT_APP_CDN_BASEURL}/Fonts/${fontFamily}.${format}" type="font/${format}" /> `,
                    `<link rel="preload" as="font" href="${env.REACT_APP_BLOB_STORAGE_PATH}/fonts/${fontFamily}.${format}" type="font/${format}" crossorigin="anonymous" /> `,
            )
            .join(" ")
    }

export const PRELOAD = (theme: ThemeColor, versionTheme: string) => {
    let stringifiedTheme
    try {
        stringifiedTheme = JSON.stringify(theme)
    } catch (err) {
        stringifiedTheme = ""
        BFFLogger.error(err)
    }
    return `
    <script name="themeColours">
    window.themeColours = window.themeColours || {}; 
      window.themeColours${`["${versionTheme}"]`} = ${stringifiedTheme}
    </script>
    <style>#platform_modernisation_footer{font-family: ${theme.font.primary.regular.family}, ${
        theme.font.default
    }; margin-top: 10px;}</style>
`
}

export const PRELOAD_VENDOR = (theme: ThemeColor, versionTheme: string) => `
  ${fontPreloadBuilder("AzoSans-Regular-webfont")("woff")}
  ${fontPreloadBuilder("AzoSans-Medium-webfont")("woff")}
  <link rel="preload" as="script" href="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.${
    env.DEVELOPMENT ? "development" : "production.min"
}.js" />
  <link rel="preload" as="script" href="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.${
    env.DEVELOPMENT ? "development" : "production.min"
}.js" />
  ${PRELOAD(theme, versionTheme)}
  ${FONTS(theme, `${env.REACT_APP_BLOB_STORAGE_PATH}/fonts`, "#platform_modernisation_footer")}
`

export const PRELOAD_JSS_VENDOR = (theme: ThemeColor, versionTheme: string) => `
  ${PRELOAD_VENDOR(theme, versionTheme)}
  <noscript id="jss-insertion-point"></noscript>
`

export const BUNDLE = (SITEURL: string) => {
    const url = new URL(SITEURL)
    const siteurl = `${url.protocol}//${url.host}`
    return `
  <script async src="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/footer/js/2.${version}.chunk.js" ></script>
  <script async src="${runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE || siteurl}${
        env.REACT_APP_BLOB_STORAGE_PATH
    }/footer/js/main.${version}.chunk.js" ></script>
`
}

export const BUNDLE_VENDOR = (SITEURL: string) => `
  <script nomodule src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/core-js/2.6.11/core.min.js"></script>
  <script src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.production.min.js"></script>
  <script src="${env.REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.production.min.js" ></script>
  ${BUNDLE(SITEURL)}
`
