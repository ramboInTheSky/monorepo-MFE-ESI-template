import express from "express"
import withSearchRouter from "./search"
import withProductsFragmentRouter from "./productsFragment"

const router = express.Router()

withSearchRouter(router)
withProductsFragmentRouter(router)

export default router
