import express from "express"
import withFooterRouter from "./footer"

const router = express.Router()

withFooterRouter(router)

export default router
