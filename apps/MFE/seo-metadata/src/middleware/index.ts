import express from "express"
import withHeadingRouter from "./apis/heading"
import withMetadataRouter from "./apis/metadata"

const router = express.Router()

withHeadingRouter(router)
withMetadataRouter(router)

export default router
