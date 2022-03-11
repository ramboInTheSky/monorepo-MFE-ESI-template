import {version} from "../../../../package.json"
import env from "../../../config/env"

const {DEVELOPMENT, REACT_APP_PLATMOD_CDN_BASEURL} = env

export const PRELOAD = (APP_URL, theme: string, versionTheme: string) => `
  <link rel="preload" as="script" href="${APP_URL}/static/js/2.${version}.chunk.js" />
  <link rel="preload" as="script" href="${APP_URL}/static/js/main.${version}.chunk.js" />
  <link rel="preload" as="script" href="${APP_URL}/static/js/runtime~main.${version}.js" />

  <script name="themeColours">
    window.themeColours = window.themeColours || {};
    window.themeColours${`["${versionTheme}"]`} = ${theme}

  </script>
`

export const PRELOAD_VENDOR = (APP_URL, theme: string, versionTheme) => `
        <link rel="preload" as="script" href="${REACT_APP_PLATMOD_CDN_BASEURL}/vendors/react/16.13.1/umd/react.${
    DEVELOPMENT ? "development" : "production.min"
}.js" />
        <link rel="preload" as="script" href="${REACT_APP_PLATMOD_CDN_BASEURL}/vendors/react/16.13.1/umd/react-dom.${
    DEVELOPMENT ? "development" : "production.min"
}.js" />
        ${PRELOAD(APP_URL, theme, versionTheme)}
    `

export const BUNDLE = (APP_URL: string) => `
  <script src="${APP_URL}/static/js/2.${version}.chunk.js" ></script>
  <script src="${APP_URL}/static/js/main.${version}.chunk.js" ></script>
  <script src="${APP_URL}/static/js/runtime~main.${version}.js" ></script>
`

export const BUNDLE_VENDOR = APP_URL => `
        <script nomodule src="${REACT_APP_PLATMOD_CDN_BASEURL}/vendors/core-js/2.6.11/core.min.js"></script>
        <script src="${REACT_APP_PLATMOD_CDN_BASEURL}/vendors/react/16.13.1/umd/react.${
    DEVELOPMENT ? "development" : "production.min"
}.js"></script>
        <script src="${REACT_APP_PLATMOD_CDN_BASEURL}/vendors/react/16.13.1/umd/react-dom.${
    DEVELOPMENT ? "development" : "production.min"
}.js"></script>
        ${BUNDLE(APP_URL)}
    `
