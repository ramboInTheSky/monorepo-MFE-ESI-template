const INTERNAL = Object.freeze({
    PRODUCTION: process.env.NODE_ENV === "production",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    DEV_URL_OVERRIDE: process.env.DEV_URL_OVERRIDE || "",
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_PLATMOD_CDN_BASEURL: process.env.REACT_APP_CDN_BASEURL
        ? `${process.env.REACT_APP_CDN_BASEURL}/platmod`
        : "https://xcdn.amido.com/content/platmod",
})

const ENV_VARS = Object.freeze({
    PORT: process.env.PORT || 3007,
    REACT_APP_CDN_BASEURL: process.env.REACT_APP_CDN_BASEURL
        ? process.env.REACT_APP_CDN_BASEURL
        : "https://xcdn.amido.com/content",
    REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL
        ? process.env.REACT_APP_API_BASEURL
        : "http://sandbox.eun.deploy.systems.next/api/review-stars",
    POD_NAME: process.env.POD_NAME,
    REACT_APP_SERVE_PATH_PREFIX: process.env.REACT_APP_SERVE_PATH_PREFIX || "",
    ASSETS_PATH: process.env.ASSETS_PATH || "/reviewstarsstatic",
    LOG_LEVEL: process.env.LOG_LEVEL,
    FNC_NAME: process.env.FNC_NAME,
    REACT_APP_APPINSIGHTS_KEY: process.env.REACT_APP_APPINSIGHTS_KEY,
})

const VARS = {...INTERNAL, ...ENV_VARS}

export default VARS
