/* istanbul ignore file */
import path from "path"
import express from "express"
import NodeCache from "node-cache"
import {setup, defaultClient} from "applicationinsights"
import {SettingsSDK} from "@monorepo/settings-sdk"
import {
    helmetGuard,
    correlationMiddleware,
    siteurlMiddleware,
    timeMachineMiddleware,
    textMiddleware,
} from "@monorepo/middlewares"
import themeMiddleware from "./middleware/theme"
import staticContentMiddleware from "./middleware/staticContent"
import CacheControlMiddleware, {StaticAssetsCacheControlMiddleware} from "./middleware/cache-control"
import htmlMiddleware from "./middleware/render/html"
import renderMiddleware from "./middleware/render/render"
import {PRELOAD, PRELOAD_VENDOR, BUNDLE, BUNDLE_VENDOR} from "./middleware/render/assets"
import apis from "./apis"
import AppInsightsMiddleware from "./middleware/appInsights"
import cssMiddleware from "./middleware/render/css"
import containerMiddleware from "./middleware/container"
import CacheTagMiddleware from "./middleware/cache-tag"
import env from "../config/env"
import BFFLogger from "./core/BFFLogger"
import {SettingsSdkKeys} from "../config/settings"

const appRouteWithType = `${env.REACT_APP_SERVE_PATH_PREFIX}/product-summary/:type/:itemNumber`
const appRoute = `${env.REACT_APP_SERVE_PATH_PREFIX}/product-summary/:itemNumber`
const cache = new NodeCache()
const publicPath = path.join(__dirname, "/public")
const app: any = express()

app.use(correlationMiddleware)

if (env.REACT_APP_USE_TIME_MACHINE_COOKIE === "true") {
    app.use(timeMachineMiddleware)
}

if (env.REACT_APP_APPINSIGHTS_KEY) {
    setup(env.REACT_APP_APPINSIGHTS_KEY).start()
    app.use(AppInsightsMiddleware(defaultClient))
}

app.use(siteurlMiddleware(env.ASSETS_PATH, env.DEV_URL_OVERRIDE))
app.use(helmetGuard)

app.get("/", (_req, res) => {
    res.sendStatus(200).end()
})

app.use(
    `${env.REACT_APP_BLOB_STORAGE_PATH}`,
    StaticAssetsCacheControlMiddleware,
    express.static(`${publicPath}/static-content`),
)

app.use(
    `${env.REACT_APP_BLOB_STORAGE_PATH}/productsummary`,
    StaticAssetsCacheControlMiddleware,
    express.static(`${publicPath}/static`),
)

app.use(staticContentMiddleware)
app.use(env.ASSETS_PATH, StaticAssetsCacheControlMiddleware, express.static(publicPath))

app.get("/productsummarycontainer/:itemNumber", containerMiddleware)
app.get("/productsummarycontainer/:type/:itemNumber", containerMiddleware)

if (env.REACT_APP_ENABLE_CYPRESS_SETTINGS) {
    app.use(
        SettingsSDK("MONOREPO.PRODUCTSUMMARY.FRONTEND", "./__mocks__/featuresettings.json"),
        (_req, _res, _next) => {
            // eslint-disable-next-line no-console
            console.info(`
                *************
                Feature Setting: Cypress Mode - ./__mocks__/featuresettings.json
                Please set the countries required for writing cypress tests
                *************`)

            _next()
        },
    )
} else {
    app.use(SettingsSDK("MONOREPO.PRODUCTSUMMARY.FRONTEND", "./featuresettings.json"))
}
app.use(textMiddleware(publicPath, SettingsSdkKeys, cache, BFFLogger))
app.use(themeMiddleware(cache))
app.get(`${env.ASSETS_PATH}/dependencies/:type`, CacheControlMiddleware, CacheTagMiddleware, (_req, res) => {
    const versionTheme = _req.themeVersion
    try {
        const theme: string = JSON.stringify(_req.theme)
        if (_req.params.type === "preload") {
            res.status(200).send(PRELOAD(theme, versionTheme))
        } else if (_req.params.type === "preloadvendor") {
            res.status(200).send(PRELOAD_VENDOR(theme, versionTheme))
        } else if (_req.params.type === "bundlevendor") {
            res.status(200).send(BUNDLE_VENDOR())
        } else {
            res.status(200).send(BUNDLE())
        }
    } catch (err) {
        BFFLogger.error(err)
    }
})

app.get(`${env.ASSETS_PATH}/baselinecss/:type`, CacheControlMiddleware, CacheTagMiddleware, cssMiddleware)

app.get("/product-summary/health", (_req, res) => {
    // I have no dependencies to check health upon
    res.status(200).send("Healthy")
})

app.use("/product-summary/flush", (_req, res) => {
    try {
        cache.flushAll()
        res.status(200).end()
    } catch {
        res.status(500).end()
    }
})

app.use(
    appRouteWithType,
    htmlMiddleware,
    renderMiddleware,
    CacheTagMiddleware,
    CacheControlMiddleware,
    (_req, _res) => {
        _res.status(200).send((_res as any).html)
    },
)

app.use(appRoute, htmlMiddleware, renderMiddleware, CacheTagMiddleware, CacheControlMiddleware, (_req, _res) => {
    _res.status(200).send((_res as any).html)
})

app.use(apis)

export default app
