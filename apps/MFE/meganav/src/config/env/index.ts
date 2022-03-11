const INTERNAL = Object.freeze({
    PRODUCTION: process.env.NODE_ENV === "production",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    REACT_APP_DEV_URL_OVERRIDE: process.env.REACT_APP_DEV_URL_OVERRIDE || "",
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
})

const ENV_VARS = Object.freeze({
    REACT_APP_BLOB_STORAGE_SSR_BASEURL: process.env.REACT_APP_BLOB_STORAGE_SSR_BASEURL || "http://localhost:3005",
    PORT: process.env.PORT || 3005,
    REACT_APP_CDN_BASEURL: process.env.REACT_APP_CDN_BASEURL
        ? process.env.REACT_APP_CDN_BASEURL
        : "https://xcdn.amido.com/content",
    REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL
        ? process.env.REACT_APP_API_BASEURL
        : "http://sandbox.eun.deploy.systems.next/api/meganav",
    POD_NAME: process.env.POD_NAME,
    LOG_LEVEL: process.env.LOG_LEVEL,
    REACT_APP_APPINSIGHTS_KEY: process.env.REACT_APP_APPINSIGHTS_KEY,
    REACT_APP_SERVE_PATH_PREFIX: process.env.REACT_APP_SERVE_PATH_PREFIX || "",
    REACT_APP_USE_TIME_MACHINE_COOKIE: process.env.REACT_APP_USE_TIME_MACHINE_COOKIE || "false",
    ASSETS_PATH: process.env.ASSETS_PATH || "/meganavstatic",
    USE_LOCAL_STATIC_CONTENT: process.env.USE_LOCAL_STATIC_CONTENT || "true",
})

const VARS = {...INTERNAL, ...ENV_VARS}

export default VARS
