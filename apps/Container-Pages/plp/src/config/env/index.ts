const getLocalURL = localPort =>
    INTERNAL.REACT_APP_LOCAL || INTERNAL.DEVELOPMENT ? `http://localhost:${localPort}` : ""

const INTERNAL = Object.freeze({
    PRODUCTION: process.env.NODE_ENV === "production",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    REACT_APP_LOCAL: process.env.REACT_APP_LOCAL,
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
    REACT_APP_INCLUDE_VENDORS: process.env.REACT_APP_INCLUDE_VENDORS || false,
    REACT_APP_ENABLE_CYPRESS_SETTINGS: process.env.REACT_APP_ENABLE_CYPRESS_SETTINGS || false,
})

const ENV_VARS = Object.freeze({
    REACT_APP_BLOB_STORAGE_SSR_BASEURL: process.env.REACT_APP_BLOB_STORAGE_SSR_BASEURL || "http://localhost:3000",
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_CDN_BASEURL: process.env.REACT_APP_CDN_BASEURL || "https://xcdn.amido.com/content",
    REACT_APP_API_BASEURL_SEARCH: process.env.REACT_APP_API_BASEURL_SEARCH || "https://sx-test.amido.com/api/search",
    REACT_APP_API_BASEURL_PRODUCT_SUMMARY:
        process.env.REACT_APP_API_BASEURL_PRODUCT_SUMMARY || "https://sx-test.amido.com/api/product-summary",
    REACT_APP_API_BASEURL_SEARCH_BANNER: process.env.REACT_APP_API_BASEURL_SEARCH_BANNER || getLocalURL(3339),

    POD_NAME: process.env.POD_NAME,
    REACT_APP_SERVE_PATH_PREFIX: process.env.REACT_APP_SERVE_PATH_PREFIX || "",
    REACT_APP_APP_URL:
        process.env.REACT_APP_APP_URL ||
        (INTERNAL.REACT_APP_LOCAL || INTERNAL.DEVELOPMENT ? "http://localhost:3009" : ""),
    REACT_APP_HEADER_BASEURL: process.env.REACT_APP_HEADER_BASEURL || getLocalURL(3004),
    REACT_APP_HEADER_ASSETS_PATH: process.env.REACT_APP_HEADER_ASSETS_PATH || "/headerstatic",

    REACT_APP_MEGANAV_BASEURL: process.env.REACT_APP_MEGANAV_BASEURL || getLocalURL(3005),

    REACT_APP_FOOTER_BASEURL: process.env.REACT_APP_FOOTER_BASEURL || getLocalURL(3002),
    REACT_APP_FOOTER_ASSETS_PATH: process.env.REACT_APP_FOOTER_ASSETS_PATH || "/footerstatic",

    REACT_APP_PROD_SUMM_BASEURL: process.env.REACT_APP_PROD_SUMM_BASEURL || getLocalURL(3001),
    REACT_APP_PROD_SUMM_ASSETS_PATH: process.env.REACT_APP_PROD_SUMM_ASSETS_PATH || "/productsummarystatic",

    REACT_APP_USE_TIME_MACHINE_COOKIE: process.env.REACT_APP_USE_TIME_MACHINE_COOKIE || "false",

    ASSETS_PATH: process.env.ASSETS_PATH || "/plpstatic",
    LOG_LEVEL: process.env.LOG_LEVEL,
    FNC_NAME: process.env.FNC_NAME,
    REACT_APP_APPINSIGHTS_KEY: process.env.REACT_APP_APPINSIGHTS_KEY,
    ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
    USE_LOCAL_STATIC_CONTENT: process.env.USE_LOCAL_STATIC_CONTENT || "true",
})

const VARS = {...INTERNAL, ...ENV_VARS}

export default VARS
