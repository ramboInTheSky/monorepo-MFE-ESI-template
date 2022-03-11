/* istanbul ignore file */
/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path"
import express from "express"
import NodeCache from "node-cache"
import {setup, defaultClient} from "applicationinsights"
import {SettingsSDK} from "@monorepo/settings-sdk"
import {helmetGuard, correlationMiddleware, httpLogger, siteurlMiddleware, textMiddleware} from "@monorepo/middlewares"
import htmlMiddleware from "./middleware/render/html"
import renderMiddleware from "./middleware/render/render"
import cssMiddleware from "./middleware/render/css"
import themeMiddleware from "./middleware/theme"
import CacheControlMiddleware, {StaticAssetsCacheControlMiddleware} from "./middleware/cache-control"
import AppInsightsMiddleware from "./middleware/appInsights"
import containerMiddleware from "./middleware/container"
import staticContentMiddleware from "./middleware/staticContent"
import apis from "./apis"
import stubs from "./client-side-stubs"
import env from "../config/env"
import {PRELOAD, PRELOAD_VENDOR, BUNDLE_VENDOR, BUNDLE} from "./middleware/render/assets"
import BFFLogger from "./core/BFFLogger"
import {DEV_ESI_HEADER} from "../config/constants"
import getGoogleAnalyticsConfig from "../utils/getGoogleAnalyticsConfig"
import getMonetateConfig from "../utils/getMonetateConfig"
import getUCMConfig from "../utils/getUCMConfig"
import getABPlatformConfig from "../utils/getABPlatformConfig"
import {SettingsSdkKeys} from "../models/settings"
import {styleMiddleware} from "./middleware/styles"

const publicPath = path.join(__dirname, "/public")
const app: any = express()
const cache = new NodeCache()
const appRoutes = `${env.REACT_APP_SERVE_PATH_PREFIX}/header`

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

app.use(stubs)

app.use(staticContentMiddleware)

app.use(env.ASSETS_PATH, StaticAssetsCacheControlMiddleware, express.static(publicPath))

app.use(`${env.REACT_APP_SERVE_PATH_PREFIX}/headercontainer`, containerMiddleware)

app.use(SettingsSDK("MONOREPO.HEADER.FRONTEND", "./featuresettings.json"))

app.use("/headercontainer", containerMiddleware)

app.use(textMiddleware(publicPath, SettingsSdkKeys, cache, BFFLogger))
app.use(styleMiddleware(cache))
app.use(themeMiddleware(cache))

app.get(`${env.ASSETS_PATH}/dependencies/:type`, CacheControlMiddleware, (req, res) => {
    const useDevEsi = !!req.headers[DEV_ESI_HEADER]
    const versionTheme = req.themeVersion
    const realm = req.headers["x-monorepo-realm"] as string
    const SITEURL = req.siteUrl.url
    const config = res.locals.configuration
    const gaConfig = getGoogleAnalyticsConfig(config)
    const monetateConfig = getMonetateConfig(config)
    const ucmConfig = getUCMConfig(config)
    const enableABPlatformTesting = getABPlatformConfig(config, SITEURL)
    const enableQueueIt = config[SettingsSdkKeys.enableQueueIt]?.Value
    const bookmarkTitle = config[SettingsSdkKeys.bookmarkTitle]

    const analyticsData = {
        siteLayout: req.headers["x-monorepo-viewport-size"],
        siteCountry: req.headers["x-monorepo-territory"],
        siteLanguage: req.headers["x-monorepo-language"],
        softwareVersion: undefined,
    } as any
    try {
        const {theme} = req

        if (req.params.type === "preloadvendor") {
            res.status(200).send(
                PRELOAD_VENDOR(
                    SITEURL,
                    theme,
                    versionTheme,
                    useDevEsi,
                    monetateConfig.enableMonetateSDK,
                    monetateConfig.accountMonetateSDK,
                    gaConfig.useGoogleAnalytics,
                    gaConfig.account,
                    gaConfig.environmentKey,
                    analyticsData,
                    enableQueueIt,
                    realm,
                    bookmarkTitle,
                    ucmConfig.enableucmSDK,
                    ucmConfig.dataDomainScriptGuid,
                    ucmConfig.autoLanguageDetection,
                    enableABPlatformTesting.abPlatformTesting,
                    enableABPlatformTesting.config,
                ),
            )
        } else if (req.params.type === "preload") {
            res.status(200).send(
                PRELOAD(
                    SITEURL,
                    theme,
                    versionTheme,
                    useDevEsi,
                    monetateConfig.enableMonetateSDK,
                    monetateConfig.accountMonetateSDK,
                    gaConfig.useGoogleAnalytics,
                    gaConfig.account,
                    gaConfig.environmentKey,
                    analyticsData,
                    enableQueueIt,
                    realm,
                    bookmarkTitle,
                    ucmConfig.enableucmSDK,
                    ucmConfig.dataDomainScriptGuid,
                    ucmConfig.autoLanguageDetection,
                    enableABPlatformTesting.abPlatformTesting,
                    enableABPlatformTesting.config,
                ),
            )
        } else if (req.params.type === "bundlevendor") {
            res.status(200).send(BUNDLE_VENDOR(SITEURL, useDevEsi))
        } else {
            res.status(200).send(BUNDLE(SITEURL, useDevEsi))
        }
    } catch (err) {
        BFFLogger.error(err)
    }
})

app.use(apis)

app.get(`${env.ASSETS_PATH}/baselinecss/:type`, CacheControlMiddleware, cssMiddleware)

app.get(`${env.REACT_APP_SERVE_PATH_PREFIX}/header/health`, (_req, res) => {
    // I have no dependencies to check health upon
    res.status(200).send("Healthy")
})

app.use(`${env.REACT_APP_SERVE_PATH_PREFIX}/header/flush`, (_req, res) => {
    try {
        cache.flushAll()
        res.status(200).end()
    } catch {
        res.status(500).end()
    }
})

app.use(appRoutes, htmlMiddleware())
app.use(appRoutes, renderMiddleware, CacheControlMiddleware, (_req, _res) => {
    _res.status(200).send(_res.html)
})

export default app
