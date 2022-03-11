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
            `${env.REACT_APP_BLOB_STORAGE_PATH}/plp${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""}/`,
            express.static(path.join(__dirname, "/public/static")),
        )
        router.get(`${env.REACT_APP_BLOB_STORAGE_PATH}/*`, proxy("https://sx-test.amido.com/static-content"))
    } else {
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}`,
            express.static(path.join(__dirname, "../../../../CDN/static-content")),
        )
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/header/`,
            express.static(path.join(__dirname, "../../../../apps/MFE/header/build/public/static")),
        )
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/meganav/`,
            express.static(path.join(__dirname, "../../../../apps/MFE/meganav/build/public/static")),
        )
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/gtm-sdk/`,
            express.static(path.join(__dirname, "../../Amido.Ecommerce.GTM.SDK.Tracking/lib")),
        )

        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/monetate-sdk/`,
            express.static(path.join(__dirname, "../../Amido.Ecommerce.Monetate.SDK.Tracking/lib")),
        )
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/css/`,
            express.static(
                path.join(__dirname, "../../Amido.Ecommerce.SearchBanners.PublishContent/static-content/css"),
            ),
        )
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/productsummary/`,
            express.static(path.join(__dirname, "../../apps/MFE/product-summary/build/public/static")),
        )
        router.use(
            `${env.REACT_APP_BLOB_STORAGE_PATH}/plp${runtimeEnv.REACT_APP_SERVE_PATH_PREFIX ?? ""}/`,
            express.static(path.join(__dirname, "/public/static")),
        )
    }
}

staticContentMiddleware()

export default router
