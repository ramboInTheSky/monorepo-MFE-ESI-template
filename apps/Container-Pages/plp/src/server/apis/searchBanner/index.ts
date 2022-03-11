import {AxiosResponse} from "axios"
import {minify} from "html-minifier"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import BFFLogger from "../../core/BFFLogger"
import Api from "../../../config/api/searchBanner"
import axios from "../../core/xhr"
import {
    CACHE_HEADERS_EDGE_CACHE_TAG,
    SEARCH_BANNER_HEADER,
    SEARCH_BANNER_HEADER_DEFAULT,
    CACHE_HEADERS_CACHE_CONTROL,
    CACHE_HEADERS_LAST_MODIFIED,
    SEARCH_BANNER_CACHE_TAG,
} from "../../../config/constants"
import {getSearchBannerUrl} from "../../../utils/searchBanner"
import env from "../../../config/env"
import {SettingsSdkKeys} from "../../../models/settings"
import createApiHeaders from "../../../utils/createApiRequestHeaders"
import {urlSanitiser} from "../../../utils/httpUrlTrimmer"

export const getSearchBanner = Api("getSearchBanner")

export class SearchBanner {
    content?: string
    styleSheet?: string
}

const responseTemplate = (css, template) => `<style>${css}</style>${template}`
export const responseHeaders = (backendResponse: AxiosResponse, res) => {
    const apiCacheTags = backendResponse?.headers[CACHE_HEADERS_EDGE_CACHE_TAG]
        ? `${backendResponse.headers[CACHE_HEADERS_EDGE_CACHE_TAG]}, `
        : ""
    const headers = {
        [CACHE_HEADERS_CACHE_CONTROL]:
            backendResponse?.headers[CACHE_HEADERS_CACHE_CONTROL] ??
            res?.locals?.configuration?.[SettingsSdkKeys.SearchCacheControl]?.Value,
        [CACHE_HEADERS_EDGE_CACHE_TAG]: `${apiCacheTags}${env.ENVIRONMENT_NAME}-${SEARCH_BANNER_CACHE_TAG}`,
    }
    if (backendResponse?.headers[CACHE_HEADERS_LAST_MODIFIED]) {
        headers[CACHE_HEADERS_LAST_MODIFIED] = backendResponse.headers[CACHE_HEADERS_LAST_MODIFIED]
    }
    return headers
}

export const getSearchBannerCss = async (req: any, _res: any, cache: any, styleSheet: any) => {
    try {
        const ttl = _res.locals.configuration
            ? _res.locals.configuration[SettingsSdkKeys.SearchBannersAppCache]?.Value
            : 0

        let cssUrl = env.DEVELOPMENT ? req.siteUrl.url : env.REACT_APP_BLOB_STORAGE_SSR_BASEURL
        cssUrl += `${env.REACT_APP_BLOB_STORAGE_PATH}/css/${styleSheet}`

        let searchBannerCss = cache.get(cssUrl)
        if (!searchBannerCss) {
            const {data} = await axios.get(cssUrl)
            searchBannerCss = data
            cache.set(cssUrl, searchBannerCss, ttl)
        }
        return searchBannerCss
    } catch (err) {
        BFFLogger.error(new Error(err))
        return null
    }
}

const noContentResponse = (res: any) => {
    res.type("html")
    res.status(200)
    res.set({"Content-Length": "0"})
    res.send()
}

export const getSearchBannerHandler = (cache: any) => async (req: any, res: any) => {
    try {
        const apiUrlSettings = getSettingsHeadersAsObject(req.headers)

        const headers = createApiHeaders(req.headers)

        headers[SEARCH_BANNER_HEADER] = SEARCH_BANNER_HEADER_DEFAULT

        const response = await axios({
            method: getSearchBanner.method,
            url: urlSanitiser(getSearchBannerUrl(apiUrlSettings, req.originalUrl)),
            headers,
            validateStatus: status => {
                return status < 500 // Resolve only if the status code is less than 500 as we expect a lot of 404 responses
            },
        })
        const apiData: SearchBanner = response.data

        if (response.status < 300 && apiData && apiData.content && apiData.styleSheet) {
            // replace SiteUrl macros in returned HTML content
            apiData.content = apiData.content.replace(/{{SiteUrl}}/g, req.siteUrl.url)
            res.set(responseHeaders(response, res))
            const searchBannerCss = await getSearchBannerCss(req, res, cache, apiData.styleSheet)

            if (searchBannerCss) {
                const minifyOptions = {
                    removeComments: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    minifyJS: true,
                    minifyCSS: true,
                }
                res.send(minify(responseTemplate(searchBannerCss, apiData.content), minifyOptions))
            } else {
                noContentResponse(res)
            }
        } else {
            noContentResponse(res)
        }
    } catch (err) {
        BFFLogger.error(err)
        noContentResponse(res)
    }
}

export const route = getSearchBanner.routeDefinition
