import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../../env"

const {REACT_APP_API_BASEURL_SEARCH_BANNER} = env
export class SearchBannerApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL_SEARCH_BANNER}`
    version = "v1"
    endpoints = {
        getSearchBanner: {
            routeDefinition: "/search-banners/*",
            getLocalURL: (url: string) => `/search-banners/${url}`,
            getRemoteURL: (url: string) => `/search-banners/${url}`,
            method: HTTPMethod.get,
        },
    }
}

const searchBannerApi = new SearchBannerApi()
export default (endpoint: keyof typeof searchBannerApi.endpoints) => buildExport(searchBannerApi, endpoint)
