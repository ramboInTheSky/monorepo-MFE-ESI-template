import logger from "@monorepo/core-logger"
import {axiosInstance as axios} from "../../utils/axios"
import GeolocationApiConfig from "../../config/api/countryRedirect"
import {GeolocationModel} from "../../models/geolocation"

export const getGeolocation = async (baseUrl: string, ipAddress: string | null): Promise<GeolocationModel | null> => {
    try {
        const getGeolocationDataApi = GeolocationApiConfig("getGeolocationData")
        const response = await axios({
            method: getGeolocationDataApi.method,
            url: `${baseUrl}${getGeolocationDataApi.localEndpoint(ipAddress)}`,
        })
        return response.data
    } catch (ex) {
        logger.error(ex)
        throw ex
    }
}

interface UpdateSessionData {
    Version: number
    PopupDisplayed: boolean
    ShowPopup: boolean
    ISOCode: null | string
    CountryName: null | string
    RedirectUrl: null | string
    Attempt: number
}

export const updateSession = async (baseUrl: string, data: UpdateSessionData): Promise<void> => {
    try {
        const getGeolocationDataApi = GeolocationApiConfig("sessionUpdate")
        await axios({
            method: getGeolocationDataApi.method,
            url: `${baseUrl}${getGeolocationDataApi.localEndpoint()}`,
            data,
        })
    } catch (ex) {
        logger.error(ex)
        throw ex
    }
}

export default getGeolocation
