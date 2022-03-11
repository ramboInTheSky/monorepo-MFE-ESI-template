const INTERNAL = Object.freeze({
    PRODUCTION: process.env.NODE_ENV === "production",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    DEV_URL_OVERRIDE: process.env.DEV_URL_OVERRIDE || "",
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
    REACT_APP_ENABLE_CYPRESS_SETTINGS: process.env.REACT_APP_ENABLE_CYPRESS_SETTINGS || false,
})

const ENV_VARS = Object.freeze({
    REACT_APP_BLOB_STORAGE_SSR_BASEURL: process.env.REACT_APP_BLOB_STORAGE_SSR_BASEURL || "http://localhost:3001",
    PORT: process.env.PORT || 3001,
    REACT_APP_CDN_BASEURL: process.env.REACT_APP_CDN_BASEURL
        ? process.env.REACT_APP_CDN_BASEURL
        : "https://xcdn.amido.com/content",
    REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL
        ? process.env.REACT_APP_API_BASEURL
        : "http://sandbox.eun.deploy.systems.next/api/product-summary",
    POD_NAME: process.env.POD_NAME,
    REACT_APP_SERVE_PATH_PREFIX: process.env.REACT_APP_SERVE_PATH_PREFIX || "",
    ASSETS_PATH: process.env.ASSETS_PATH || "/productsummarystatic",
    LOG_LEVEL: process.env.LOG_LEVEL,
    FNC_NAME: process.env.FNC_NAME,
    REACT_APP_APPINSIGHTS_KEY: process.env.REACT_APP_APPINSIGHTS_KEY,
    REACT_APP_USE_TIME_MACHINE_COOKIE: process.env.REACT_APP_USE_TIME_MACHINE_COOKIE || "false",
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
    USE_LOCAL_STATIC_CONTENT: process.env.USE_LOCAL_STATIC_CONTENT || "true",
})

const VARS = {...INTERNAL, ...ENV_VARS}

export default VARS
