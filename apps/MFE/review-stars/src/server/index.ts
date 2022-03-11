/* istanbul ignore file */
import path from "path"
import express from "express"
import NodeCache from "node-cache"
import {setup, defaultClient} from "applicationinsights"
import {SettingsSDK} from "@monorepo/settings-sdk"
import {helmetGuard, correlationMiddleware, httpLogger, siteurlMiddleware} from "@monorepo/middlewares"
import themeMiddleware from "./middleware/theme"
import CacheControlMiddleware from "./middleware/cache-control"
import htmlMiddleware from "./middleware/render/html"
import renderMiddleware from "./middleware/render/render"
import {PRELOAD, PRELOAD_VENDOR, BUNDLE, BUNDLE_VENDOR} from "./middleware/render/assets"
import apis from "./apis"
import AppInsightsMiddleware from "./middleware/appInsights"
import cssMiddleware from "./middleware/render/css"
import containerMiddleware from "./middleware/container"
import env from "../config/env"
import BFFLogger from "./core/BFFLogger"

const appRoutes = `${env.REACT_APP_SERVE_PATH_PREFIX}/review-stars/:itemNumber`
const cache = new NodeCache()
const publicPath = path.join(__dirname, "/public")
const app = express()

app.use(correlationMiddleware)

if (env.REACT_APP_APPINSIGHTS_KEY) {
    setup(env.REACT_APP_APPINSIGHTS_KEY).start()
    app.use(AppInsightsMiddleware(defaultClient))
}

app.use(siteurlMiddleware(env.ASSETS_PATH, env.DEV_URL_OVERRIDE))
app.use(httpLogger(env.DEVELOPMENT))
app.use(helmetGuard)

app.get("/", (_req, res) => {
    res.sendStatus(200).end()
})

app.use(env.ASSETS_PATH, express.static(publicPath))
app.get("/reviewstarscontainer/:itemNumber", containerMiddleware)

app.use(SettingsSDK("MONOREPO.REVIEWSTARS.FRONTEND", "./featuresettings.json"))

app.use(themeMiddleware(cache))

app.get(`${env.ASSETS_PATH}/dependencies/:type`, (_req, res) => {
    const versionTheme = (_req as any).themeVersion
    const APP_URL = `${(_req as any).siteUrl.url}${(_req as any).siteUrl.token}`
    try {
        const theme: string = JSON.stringify((_req as any).theme)
        if (_req.params.type === "preload") {
            res.status(200).send(PRELOAD(APP_URL, theme, versionTheme))
        } else if (_req.params.type === "preloadvendor") {
            res.status(200).send(PRELOAD_VENDOR(APP_URL, theme, versionTheme))
        } else if (_req.params.type === "bundlevendor") {
            res.status(200).send(BUNDLE_VENDOR(APP_URL))
        } else {
            res.status(200).send(BUNDLE(APP_URL))
        }
    } catch (err) {
        BFFLogger.error(err)
    }
})

app.use(apis)

app.get(`${env.ASSETS_PATH}/baselinecss/:type`, CacheControlMiddleware, cssMiddleware)

app.get("/review-stars/health", (_req, res) => {
    // I have no dependencies to check health upon
    res.status(200).send("Healthy")
})

app.use("/review-stars/flush", (_req, res) => {
    try {
        cache.flushAll()
        res.status(200).end()
    } catch {
        res.status(500).end()
    }
})

app.use(appRoutes, htmlMiddleware())
app.use(appRoutes, renderMiddleware, CacheControlMiddleware, (_req, _res) => {
    _res.status(200).send((_res as any).html)
})

export default app
