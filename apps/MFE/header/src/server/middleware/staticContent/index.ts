/* istanbul ignore file */
import express from "express"
import path from "path"
import {env as runtimeEnv} from "process"
import proxy from "express-http-proxy"
import env from "../../../config/env"

const router: any = express.Router()

const staticContentMiddleware = () => {
    if (env.USE_LOCAL_STATIC_CONTENT === "false") {
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/header${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""}/`,
            express.static(path.join(__dirname, "/public/static")),
        )
    } else {
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}`,
            express.static(path.join(__dirname, "../../../../CDN/static-content")),
        )
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/header${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""}/`,
            express.static(path.join(__dirname, "/public/static")),
        )

        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/meganav/`,
            express.static(path.join(__dirname, "../../meganav/build/public/static")),
        )

        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/gtm-sdk/`,
            express.static(path.join(__dirname, "../../../../../Amido.Ecommerce.GTM.SDK.Tracking/lib")),
        )

        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/monetate-sdk/`,
            express.static(path.join(__dirname, "../../../../../Amido.Ecommerce.Monetate.SDK.Tracking/lib")),
        )
    }
}

staticContentMiddleware()

export default router
