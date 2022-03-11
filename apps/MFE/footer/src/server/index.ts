/* eslint-disable @typescript-eslint/no-var-requires */
/* istanbul ignore file */
import path from "path"
import express, {Express} from "express"
import {SettingsSDK} from "@monorepo/settings-sdk"
import NodeCache from "node-cache"
import {setup, defaultClient} from "applicationinsights"
import {helmetGuard, correlationMiddleware, httpLogger, siteurlMiddleware, textMiddleware} from "@monorepo/middlewares"
import htmlMiddleware from "./middleware/render/html"
import renderMiddleware from "./middleware/render/render"
import staticContentMiddleware from "./middleware/staticContent"
import themeMiddleware from "./middleware/theme"
import containerMiddleware from "./middleware/container"
import CacheControlMiddleware, {StaticAssetsCacheControlMiddleware} from "./middleware/cache-control"
import AppInsightsMiddleware from "./middleware/appInsights"
import apis from "./apis"
import env from "../config/env"
import cssMiddleware from "./middleware/render/css"
import {PRELOAD, BUNDLE_VENDOR, PRELOAD_JSS_VENDOR, BUNDLE, PRELOAD_VENDOR} from "./middleware/render/assets"
import {SettingsSdkKeys} from "../models/settings"
import BFFLogger from "./core/BFFLogger"

const appRoutes = `${env.REACT_APP_ENTRYPOINT}`
const cache = new NodeCache()
const publicPath = path.join(__dirname, "/public")
const app: any = express()

app.use(correlationMiddleware)

app.use(siteurlMiddleware(env.ASSETS_PATH, env.DEV_URL_OVERRIDE))

if (env.REACT_APP_APPINSIGHTS_KEY) {
    setup(env.REACT_APP_APPINSIGHTS_KEY).start()
    app.use(AppInsightsMiddleware(defaultClient))
}

app.use(httpLogger(env.DEVELOPMENT))

app.use(helmetGuard)

app.get("/", (_req, res) => {
    res.status(200).send("UP")
})

app.use(
    `${env.REACT_APP_BLOB_STORAGE_PATH}/footer`,
    StaticAssetsCacheControlMiddleware,
    express.static(`${publicPath}/static`),
)
app.use(staticContentMiddleware)
app.use(env.ASSETS_PATH, StaticAssetsCacheControlMiddleware, express.static(publicPath))
app.use(
    `${env.REACT_APP_BLOB_STORAGE_PATH}`,
    StaticAssetsCacheControlMiddleware,
    express.static(`${publicPath}/static-content`),
)

app.use("/footercontainer", containerMiddleware)

app.use(SettingsSDK("MONOREPO.FOOTER.FRONTEND", "./featuresettings.json"))

app.use(textMiddleware(publicPath, SettingsSdkKeys, cache, BFFLogger))
app.use(themeMiddleware(cache))


app.get(`${env.ASSETS_PATH}/dependencies/:type`, CacheControlMiddleware, (_req, res) => {
    const versionTheme = res.locals.configuration[SettingsSdkKeys.themeVersion]?.Value
    const SITEURL = _req.siteUrl.url
    try {
        const {theme} = _req as any
        if (_req.params.type === "preloadjssvendor") {
            res.status(200).send(PRELOAD_JSS_VENDOR(theme, versionTheme))
        } else if (_req.params.type === "preloadvendor") {
            res.status(200).send(PRELOAD_VENDOR(theme, versionTheme))
        } else if (_req.params.type === "preload") {
            res.status(200).send(PRELOAD(theme, versionTheme))
        } else if (_req.params.type === "bundlevendor") {
            res.status(200).send(BUNDLE_VENDOR(SITEURL))
        } else {
            res.status(200).send(BUNDLE(SITEURL))
        }
    } catch (err) {
        BFFLogger.error(err)
    }
})

app.use(apis)

app.get(`${env.ASSETS_PATH}/baselinecss/:type`, CacheControlMiddleware, cssMiddleware)

app.get(`${appRoutes}/health`, (_req, res) => {
    // I have no dependencies to check health upon
    res.status(200).send("Healthy")
})

app.use(`${appRoutes}/flush`, (_req, res) => {
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
