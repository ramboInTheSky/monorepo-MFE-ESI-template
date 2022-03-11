import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import { SEARCH_CATEGORY_SEGMENT } from "../../constants"
import env from "../../env"

const {REACT_APP_API_BASEURL_SEARCH, ASSETS_PATH} = env
export class ProductsApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL_SEARCH}`
    version = "v1"
    endpoints = {
        getProducts: {
            routeDefinition: `${env.REACT_APP_SERVE_PATH_PREFIX}/products`,
            getLocalURL: () => `${env.REACT_APP_SERVE_PATH_PREFIX}/products`,
            getRemoteURL: () => `/item-numbers`,
            method: HTTPMethod.get,
        },
        getProductsFragment: {
            routeDefinition: `${env.REACT_APP_SERVE_PATH_PREFIX}/products-fragment`,
            getLocalURL: () => `${env.REACT_APP_SERVE_PATH_PREFIX}/products-fragment`,
            getRemoteURL: () => `/item-numbers`,
            method: HTTPMethod.get,
        },
        getSeoData: {
            routeDefinition: `${ASSETS_PATH}/seo-filters/${SEARCH_CATEGORY_SEGMENT}/:page/:filters?`,
            getLocalURL: () => "",
            getRemoteURL: () => `/item-numbers`,
            method: HTTPMethod.get,
        },
    }
}

const searchApi = new ProductsApi()
export default (endpoint: keyof typeof searchApi.endpoints) => buildExport(searchApi, endpoint)
