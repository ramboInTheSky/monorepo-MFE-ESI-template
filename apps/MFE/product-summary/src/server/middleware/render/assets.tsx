import {env as runtimeEnv} from "process"
import {version} from "../../../../package.json"
import env from "../../../config/env"

const {DEVELOPMENT, REACT_APP_BLOB_STORAGE_PATH} = env

export const PRELOAD = (theme: string, versionTheme: string) => `
  <link rel="preload" as="script" href="${
      runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""
  }${REACT_APP_BLOB_STORAGE_PATH}/productsummary/js/2.${version}.chunk.js" />
  <link rel="preload" as="script" href="${
      runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""
  }${REACT_APP_BLOB_STORAGE_PATH}/productsummary/js/main.${version}.chunk.js" />
  <link rel="preload" as="script" href="${
      runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""
  }${REACT_APP_BLOB_STORAGE_PATH}/productsummary/js/runtime~main.${version}.js" />
  <style>.prod-summary-star-rating--hidden div{display: none;}</style>
  <script name="themeColours">
    window.themeColours = window.themeColours || {};
    window.themeColours${`["${versionTheme}"]`} = ${theme}
  </script>
`

export const PRELOAD_VENDOR = (theme: string, versionTheme) => `
        <link rel="preload" as="script" href="${REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.${
    DEVELOPMENT ? "development" : "production.min"
}.js" />
        <link rel="preload" as="script" href="${REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.${
    DEVELOPMENT ? "development" : "production.min"
}.js" />
        ${PRELOAD(theme, versionTheme)}
    `

export const BUNDLE = () => `
  <script src="${
      runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""
  }${REACT_APP_BLOB_STORAGE_PATH}/productsummary/js/2.${version}.chunk.js" ></script>
  <script src="${
      runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""
  }${REACT_APP_BLOB_STORAGE_PATH}/productsummary/js/main.${version}.chunk.js" ></script>
  <script src="${
      runtimeEnv.REACT_APP_BLOB_STORAGE_OVERRIDE ?? ""
  }${REACT_APP_BLOB_STORAGE_PATH}/productsummary/js/runtime~main.${version}.js" ></script>
`

export const BUNDLE_VENDOR = () => `
        <script nomodule src="${REACT_APP_BLOB_STORAGE_PATH}/vendors/core-js/2.6.11/core.min.js"></script>
        <script src="${REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react.${
    DEVELOPMENT ? "development" : "production.min"
}.js"></script>
        <script src="${REACT_APP_BLOB_STORAGE_PATH}/vendors/react/16.13.1/umd/react-dom.${
    DEVELOPMENT ? "development" : "production.min"
}.js"></script>
        ${BUNDLE()}
    `
