const INTERNAL = Object.freeze({
    PRODUCTION: process.env.NODE_ENV === "production",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    DEV_URL_OVERRIDE: process.env.DEV_URL_OVERRIDE || "",
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
})

const ENV_VARS = Object.freeze({
    REACT_APP_BLOB_STORAGE_SSR_BASEURL: process.env.REACT_APP_BLOB_STORAGE_SSR_BASEURL || "http://localhost:3002",
    PORT: process.env.PORT || 3002,
    REACT_APP_CDN_BASEURL: process.env.REACT_APP_CDN_BASEURL,
    REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL,
    POD_NAME: process.env.POD_NAME,
    LOG_LEVEL: process.env.LOG_LEVEL,
    REACT_APP_APPINSIGHTS_KEY: process.env.REACT_APP_APPINSIGHTS_KEY || "404aa502-76dd-4b93-ae84-46c453774652",
    REACT_APP_ENTRYPOINT: process.env.REACT_APP_ENTRYPOINT || "/footer",
    ASSETS_PATH: process.env.ASSETS_PATH || "/footerstatic",
    USE_LOCAL_STATIC_CONTENT: process.env.USE_LOCAL_STATIC_CONTENT || "true",
})

const VARS = {...INTERNAL, ...ENV_VARS}

export default VARS
