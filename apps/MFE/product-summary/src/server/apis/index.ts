import express from "express"
import withSearchRouter from "./search"

const router = express.Router()

withSearchRouter(router)

export default router
