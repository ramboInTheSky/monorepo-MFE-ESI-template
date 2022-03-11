import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import {axiosInstance as axios} from "../../utils/axios"
import CountriesApiConfig from "../../config/api/countries"
import {Country as CountryType} from "../../models/countryselector"

export const getCountriesList = async (
    baseUrl: string,
    _headers: IncomingHttpHeaders,
    countrySelectorEndpoint: string,
): Promise<CountryType[]> => {
    try {
        const getCountriesListDataApi = CountriesApiConfig("getCountriesListData")
        const response = await axios({
            method: getCountriesListDataApi.method,
            url: `${baseUrl}${countrySelectorEndpoint}`,
        })
        return response.data
    } catch (ex) {
        logger.error(ex)
        throw ex
    }
}

export default getCountriesList
