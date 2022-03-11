const INTERNAL = Object.freeze({
    PRODUCTION: process.env.NODE_ENV === "production",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    DEV_URL_OVERRIDE: process.env.DEV_URL_OVERRIDE || "",
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
    USEDEVESI: process.env.USEDEVESI,
})

const ENV_VARS = Object.freeze({
    REACT_APP_BLOB_STORAGE_SSR_BASEURL: process.env.REACT_APP_BLOB_STORAGE_SSR_BASEURL || "http://localhost:3004",
    PORT: process.env.PORT || 3004,
    REACT_APP_CDN_BASEURL: process.env.REACT_APP_CDN_BASEURL
        ? process.env.REACT_APP_CDN_BASEURL
        : "https://xcdn.amido.com/content",
    REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL
        ? process.env.REACT_APP_API_BASEURL
        : "http://sandbox.eun.deploy.systems.next/api/header",
    POD_NAME: process.env.POD_NAME,
    REACT_APP_SERVE_PATH_PREFIX: process.env.REACT_APP_SERVE_PATH_PREFIX || "",
    ASSETS_PATH: process.env.ASSETS_PATH || "/headerstatic",
    LOG_LEVEL: process.env.LOG_LEVEL,
    FNC_NAME: process.env.FNC_NAME,
    REACT_APP_APPINSIGHTS_KEY: process.env.REACT_APP_APPINSIGHTS_KEY,
    BLOOMREACH_BASE_URL: process.env.BLOOMREACH_BASE_URL || "https://brm-suggest-0.brsrvr.com/api/v1/suggest/",
    REACT_APP_MEGANAV_BASEURL:
        process.env.REACT_APP_MEGANAV_BASEURL ||
        (INTERNAL.DEVELOPMENT || INTERNAL.USEDEVESI ? "http://localhost:3005" : ""),
    REACT_APP_MEGANAV_ASSETS_PATH: process.env.REACT_APP_MEGANAV_ASSETS_PATH || "/meganavstatic",
    GEOLOCATION_BASEURL:
        process.env.REACT_APP_GEOLOCATION_BASEURL || "https://services-uat.test.ecomm.systems.next/geolocation",
    ENVIRONMENT: process.env.ENVIRONMENT || "dev",
    REACT_APP_USE_TIME_MACHINE_COOKIE: process.env.REACT_APP_USE_TIME_MACHINE_COOKIE || "false",
    USE_LOCAL_STATIC_CONTENT: process.env.USE_LOCAL_STATIC_CONTENT || "true",
})

const VARS = {...INTERNAL, ...ENV_VARS}

export default VARS
