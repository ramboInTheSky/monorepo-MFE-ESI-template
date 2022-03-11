/* istanbul ignore file */
import path from "path"
import express from "express"
import NodeCache from "node-cache"
import cookieParser from "cookie-parser"
import {setup, defaultClient} from "applicationinsights"
import {SettingsSDK} from "@monorepo/settings-sdk"
import {
    helmetGuard,
    correlationMiddleware,
    siteurlMiddleware,
    timeMachineMiddleware,
    textMiddleware,
} from "@monorepo/middlewares"
import {SettingsSdkKeys} from "models/settings"
import themeMiddleware from "./middleware/theme"
import seoRedirectMiddlware from "./middleware/seoRedirect"
import CacheControlMiddleware, {StaticAssetsCacheControlMiddleware} from "./middleware/cache-control"
import CacheTagMiddleware from "./middleware/cache-tag"
import htmlMiddleware from "./middleware/render/html"
import renderMiddleware from "./middleware/render/render"
import AppInsightsMiddleware from "./middleware/appInsights"
import staticContentMiddleware from "./middleware/staticContent"
import apis from "./apis"
import env from "../config/env"
import {route as searchBannerAPIRoute, getSearchBannerHandler} from "./apis/searchBanner"
import BFFLogger from "./core/BFFLogger"

const appRoutes = [`${env.REACT_APP_SERVE_PATH_PREFIX}/search`, `${env.REACT_APP_SERVE_PATH_PREFIX}/shop/*`]
const cache = new NodeCache()
const publicPath = path.join(__dirname, "/public")
const app = express()

if (env.REACT_APP_APPINSIGHTS_KEY) {
    try {
        setup(env.REACT_APP_APPINSIGHTS_KEY).start()
        defaultClient.config.samplingPercentage = 33
    } catch {
        // eslint-disable-next-line no-console
        console.error("Impossible to initialise AppInsights")
    }
}

app.use(correlationMiddleware)

if (env.REACT_APP_USE_TIME_MACHINE_COOKIE === "true") {
    app.use(timeMachineMiddleware)
}

app.use(AppInsightsMiddleware(defaultClient))

app.use(siteurlMiddleware(env.ASSETS_PATH, env.REACT_APP_APP_URL))
app.use(helmetGuard)

app.get(`${env.REACT_APP_SERVE_PATH_PREFIX}/`, (_req, res) => {
    res.sendStatus(200).end()
})

app.use(env.ASSETS_PATH, StaticAssetsCacheControlMiddleware, express.static(publicPath) as any)

app.use(staticContentMiddleware)

if (env.REACT_APP_ENABLE_CYPRESS_SETTINGS) {
    app.use(
        SettingsSDK("MONOREPO.PLP.FRONTEND.CYPRESS.SETTINGS", "./dev_search_server/featuresettings.json"),
        (_req, _res, _next) => {
            // eslint-disable-next-line no-console
            console.info(`
                *************
                Feature Setting: Cypress Mode - ./dev_search_server/featuresettings.json
                Please set the countries required for writing cypress tests
                *************`)

            _next()
        },
    )
} else {
    app.use(SettingsSDK("MONOREPO.PLP.FRONTEND", "./featuresettings.json"))
}

app.use(textMiddleware(publicPath, SettingsSdkKeys, cache, BFFLogger))

app.use(appRoutes, themeMiddleware(cache))

app.use(`${env.REACT_APP_SERVE_PATH_PREFIX}${searchBannerAPIRoute}`, getSearchBannerHandler(cache))

app.use(apis, CacheControlMiddleware)

app.get(
    [`${env.REACT_APP_SERVE_PATH_PREFIX}/shop/health`, `${env.REACT_APP_SERVE_PATH_PREFIX}/search/health`],
    (_req, res) => {
        // I have no dependencies to check health upon
        res.status(200).send("Healthy")
    },
)

app.use(
    [`${env.REACT_APP_SERVE_PATH_PREFIX}/shop/flush`, `${env.REACT_APP_SERVE_PATH_PREFIX}/search/flush`],
    (_req, res) => {
        try {
            cache.flushAll()
            res.status(200).send("App Cache Purged")
        } catch {
            res.status(500).end()
        }
    },
)

app.use(cookieParser())
app.use(
    appRoutes,
    seoRedirectMiddlware,
    htmlMiddleware(),
    renderMiddleware,
    CacheTagMiddleware,
    CacheControlMiddleware,
    (_req, _res) => {
        _res.status(200).send((_res as any).html)
    },
)
export default app
