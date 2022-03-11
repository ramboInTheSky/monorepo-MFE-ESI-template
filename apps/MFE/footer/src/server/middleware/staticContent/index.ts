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
            `${env.REACT_APP_BLOB_STORAGE_PATH}/footer${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""}/`,
            express.static(path.join(__dirname, "/public/static")),
        )
    } else {
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}`,
            express.static(path.join(__dirname, "../../../../CDN/static-content")),
        )
    }
}

staticContentMiddleware()

export default router
