import express from "express"
import withHeaderRouter from "./header"

const router = express.Router()

withHeaderRouter(router)

export default router
