import logger from "@monorepo/core-logger"
import {externalCallAxiosInstance as axios} from "../../utils/axios"

import AutocompleteApiConfig from "../../config/api/autocomplete"

export const getAutocompleteData = async (
    bloomreachBaseUrl: string,
    searchValue: string | number,
    accountId: string,
    domainKey: string,
    authKey: string,
    uid2: string,
): Promise<any> => {
    try {
        const getAutocompleteDataApi = AutocompleteApiConfig("getAutocompleteData")
        const date = new Date().getTime()
        const response = await axios.get(
            `${bloomreachBaseUrl}${getAutocompleteDataApi.localEndpoint(
                searchValue,
                accountId,
                date,
                domainKey,
                authKey,
                uid2,
            )}`,
        )

        return response.data
    } catch (ex) {
        logger.error(ex)
        throw ex
    }
}
