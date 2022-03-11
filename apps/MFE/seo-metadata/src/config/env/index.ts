const INTERNAL = Object.freeze({
    PRODUCTION: process.env.NODE_ENV === "production",
    DEVELOPMENT: process.env.NODE_ENV === "development",
    NODE_ENV: process.env.NODE_ENV,
})

const ENV_VARS = Object.freeze({
    PORT: process.env.PORT || 3000,
    REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL
        ? process.env.REACT_APP_API_BASEURL
        : "http://origin-sx-eun.deploy.systems.next",
    LOG_LEVEL: process.env.LOG_LEVEL,
    REACT_APP_APPINSIGHTS_KEY: process.env.REACT_APP_APPINSIGHTS_KEY,
    ENVIRONMENT: process.env.ENVIRONMENT || "dev",
})

const VARS = {...INTERNAL, ...ENV_VARS}

export default VARS
