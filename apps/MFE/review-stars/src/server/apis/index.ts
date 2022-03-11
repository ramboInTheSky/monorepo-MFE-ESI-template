import express from "express"
import withSearchRouter from "./reviewStars"

const router = express.Router()

withSearchRouter(router)

export default router
