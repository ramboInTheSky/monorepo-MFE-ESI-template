import express from "express"
import withPrimaryNavRouter from "./appdata"
import withSecondaryNavRouter from "./secondary-meganav"
import withSeoDataRouter from "./seo"

const router = express.Router()

withPrimaryNavRouter(router)
withSecondaryNavRouter(router)
withSeoDataRouter(router)

export default router
