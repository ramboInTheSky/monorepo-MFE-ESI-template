import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import {SummaryType} from "models/searchApi"
import env from "../../env"

const {REACT_APP_API_BASEURL} = env

export class SearchApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL}`
    version = "v1"
    endpoints = {
        getTypeSummary: {
            routeDefinition: "/:type/:itemNumber",
            getLocalURL: (itemNumber: string, type: SummaryType) => `/${type}/${itemNumber}`,
            getRemoteURL: (itemNumber: string, type: SummaryType) => `/${type}s/${itemNumber}`,
            method: HTTPMethod.get,
        },
    }
}

const searchApi = new SearchApi()
export default (endpoint: keyof typeof searchApi.endpoints) => buildExport(searchApi, endpoint)
