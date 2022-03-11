import logger from "@monorepo/core-logger"
import env from "../../config/env"
import {DEFAULT_HEADER_FILE_NAME} from "../../config/constants"
import {axiosInstance} from "../../utils/axios"

const {REACT_APP_BLOB_STORAGE_PATH, REACT_APP_BLOB_STORAGE_SSR_BASEURL} = env

const defaultHeaderData = (realm, defaultHeaderVersion) =>
    axiosInstance
        .get(
            `${REACT_APP_BLOB_STORAGE_SSR_BASEURL}${REACT_APP_BLOB_STORAGE_PATH}/fallback-api-data/header/${defaultHeaderVersion}/${realm}/${DEFAULT_HEADER_FILE_NAME}`,
        )
        .then(response => response.data)
        .catch(err => {
            logger.error(err)
            throw new Error(err)
        })

export default defaultHeaderData
