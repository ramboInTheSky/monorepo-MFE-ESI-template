import logger from "@monorepo/core-logger"
import env from "../../config/env"
import {DEFAULT_PRIMARY_NAV_TYPE} from "../../config/constants"
import {axiosInstance} from "../../utils/axios"
import {PrimaryNav} from "../../models/primary-nav"

const {REACT_APP_BLOB_STORAGE_PATH, REACT_APP_BLOB_STORAGE_SSR_BASEURL} = env

const defaultPrimaryData = async (realm, {version}): Promise<PrimaryNav> => {
    try {
        const url = `${REACT_APP_BLOB_STORAGE_SSR_BASEURL}${REACT_APP_BLOB_STORAGE_PATH}/fallback-api-data/meganav/${version}/${realm}/${DEFAULT_PRIMARY_NAV_TYPE}/fallback.json`
        const defaultDataResponse = await axiosInstance.get(url)

        return defaultDataResponse.data
    } catch (ex) {
        logger.error(ex)
        throw new Error(ex)
    }
}

export {defaultPrimaryData}
