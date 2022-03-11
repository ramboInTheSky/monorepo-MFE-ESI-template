import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../../env"

const {REACT_APP_API_BASEURL_PRODUCT_SUMMARY, REACT_APP_SERVE_PATH_PREFIX} = env

export class SearchApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL_PRODUCT_SUMMARY}`
    version = "v1"
    endpoints = {
        getProductSummary: {
            routeDefinition: `${REACT_APP_SERVE_PATH_PREFIX}/products/:itemNumber`,
            getLocalURL: (itemNumber: string) => `${REACT_APP_SERVE_PATH_PREFIX}/products/${itemNumber}`,
            getRemoteURL: (itemNumber: string) => `/products/${itemNumber}`,
            method: HTTPMethod.get,
        },
    }
}

const searchApi = new SearchApi()
export default (endpoint: keyof typeof searchApi.endpoints) => buildExport(searchApi, endpoint)
