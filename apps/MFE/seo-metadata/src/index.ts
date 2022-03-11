import express from "express"
import {setup, defaultClient} from "applicationinsights"
import {correlationMiddleware, helmetGuard} from "@monorepo/middlewares"
import {SettingsSDK} from "@monorepo/settings-sdk"
import endpoints from "./middleware"
import AppInsightsMiddleware from "./middleware/appInsights"
import env from "./config/env"
import checkOverrideSEOEnabled from "./middleware/render/checkOverrideSEOEnabled"
import {CacheControlMiddleware} from "./middleware/cache-control"

const app = express()
const port = 3000

app.use(correlationMiddleware)

app.use(SettingsSDK("MONOREPO.SEOMETADATA.FRONTEND", "./featuresettings.json"))

if (env.REACT_APP_APPINSIGHTS_KEY) {
    setup(env.REACT_APP_APPINSIGHTS_KEY).start()
    app.use(AppInsightsMiddleware(defaultClient))
}

app.use(helmetGuard)

app.use(checkOverrideSEOEnabled, CacheControlMiddleware, endpoints)

app.get("/seo/health", (_req, res) => {
    res.status(200).send("Healthy")
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
