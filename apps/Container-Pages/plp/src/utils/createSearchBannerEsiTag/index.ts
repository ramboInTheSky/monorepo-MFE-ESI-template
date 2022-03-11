import env from "../../config/env"
import {SearchApiRequestTypes} from "../../config/constants"

const {REACT_APP_APP_URL, REACT_APP_SERVE_PATH_PREFIX} = env

const searchBannerEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    REACT_APP_APP_URL && useDevEsi ? REACT_APP_APP_URL + REACT_APP_SERVE_PATH_PREFIX : SITEURL

export default function createSearchBannerEsiTag(
    siteUrl: string,
    useDevEsi: boolean,
    url: string,
    requestType: SearchApiRequestTypes,
) {
    let formattedUrl = ""

    if (requestType === SearchApiRequestTypes.Category) {
        // Remove querystring
        formattedUrl = url.replace(/(\?.*)|(#.*)/g, "")
    } else {
        // Remove p= in querystring
        formattedUrl = removeParamFromUrl(url, "p")
    }
    
    const encodedUrl = encodeURIComponent(formattedUrl.replace(siteUrl, ""))
    return `<esi:include src="${searchBannerEsiBaseUrl(
        siteUrl,
        useDevEsi,
    )}/search-banners/${encodedUrl}" onerror="continue" dca="none"/>`
}

function removeParamFromUrl(url, param) {
    const [path, queryParams] = url.split("?")
    let preservedQueryParams = ""

    if (queryParams) {
        preservedQueryParams = queryParams
            .split("&")
            .filter(queryParam => !(queryParam === param || queryParam.startsWith(`${param}=`)))
            .join("&")
    }

    return `${path}${preservedQueryParams && `?${preservedQueryParams}`}`
}
