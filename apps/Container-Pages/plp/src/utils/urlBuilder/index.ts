import {SearchApiRequestTypes} from "../../config/constants"
import {FilterPriceApiResponse} from "../../models/Filter"
import {FacetsState, FacetState} from "../../models/FacetsState"

// URL PARTS
const SORT_URL_PART = "isort"
const FILTER_URL_PART = "af"
const PRICE_FILTER_URL_PART = "range"
const SHOP_URL_PART = "shop"
const REMOVABLE_CATEGORY_PART = "-0"

export const build = (
    previousUrl: string,
    sortValue: string,
    type: SearchApiRequestTypes,
    facets?: FacetsState,
    priceFilter?: FilterPriceApiResponse,
): string => {
    const uri = new URL(previousUrl)
    const formattedUri =
        type === SearchApiRequestTypes.Keyword
            ? buildKeywordUrl(uri, sortValue, facets, priceFilter)
            : buildCategoryUrl(uri, sortValue, facets, priceFilter)

    return decodeQueryParam(formattedUri.toString())
}

function decodeQueryParam(p) {
    return decodeURIComponent(p.replace(/\+/g, " "))
}

const buildKeywordUrl = (
    uri: URL,
    sortValue: string,
    facets?: FacetsState,
    priceFilter?: FilterPriceApiResponse,
): URL => {
    const {searchParams} = uri
    searchParams.delete(FILTER_URL_PART)
    searchParams.delete(PRICE_FILTER_URL_PART)
    searchParams.delete(SORT_URL_PART)

    // Add URL filter part
    const queryParams = buildUrlFilterParams(formatKeywordFilterParam, facets)
    if (queryParams) {
        searchParams.append(FILTER_URL_PART, queryParams)
    }

    // Add URL sort part
    if (sortValue) {
        searchParams.append(SORT_URL_PART, sortValue)
    }

    // Add URL price filter part
    if (priceFilter && shouldDisplayPriceFilter(priceFilter)) {
        searchParams.append(
            PRICE_FILTER_URL_PART,
            `price[${convertPrice(priceFilter.selectedMin)},${convertPrice(priceFilter.selectedMax)}]`,
        )
    }
    // eslint-disable-next-line no-param-reassign
    uri.search = searchParams.toString()

    return uri
}

const buildCategoryUrl = (
    uri: URL,
    sortValue: string,
    facets?: FacetsState,
    priceFilter?: FilterPriceApiResponse,
): URL => {
    let queryParams = buildUrlFilterParams(formatCategoryFilterParam, facets)
    queryParams +=
        priceFilter && shouldDisplayPriceFilter(priceFilter)
            ? `${queryParams ? "-" : ""}minprice-${convertPrice(priceFilter.selectedMin)}-maxprice-${convertPrice(
                  priceFilter.selectedMax,
              )}`
            : ""
    // Sort value needs to come at the end of the query string
    queryParams += `${queryParams ? "-" : ""}${SORT_URL_PART}-${sortValue}`
    const parts = uri.pathname.split("/")
    const pathIndex = parts.findIndex(part => part.toLowerCase() === SHOP_URL_PART)
    if (pathIndex >= 0) {
        parts[pathIndex + 1] = parts[pathIndex + 1].replace(REMOVABLE_CATEGORY_PART, "")
        parts[pathIndex + 2] = queryParams
    }
    // eslint-disable-next-line no-param-reassign
    uri.pathname = parts.join("/")
    return uri
}

const buildUrlFilterParams = (
    formatFilterParam: (q: string, f: [string, FacetState]) => string,
    facets?: FacetsState,
): string => {
    let queryString = ""
    if (facets) {
        queryString = Object.entries(facets)
            .filter(f => f[1].s === true)
            .sort((a, b) => {
                if (a < b) {
                    return -1
                }
                if (a > b) {
                    return 1
                }
                return 0
            })
            .reduce(formatFilterParam, "")
    }
    return queryString
}

const formatCategoryFilterParam = (queryString: string, filter: [string, FacetState]) =>
    `${queryString}${queryString ? "-" : ""}${filter[1].v.replace(":", "-")}`
const formatKeywordFilterParam = (queryString: string, filter: [string, FacetState]) =>
    `${queryString}${queryString ? " " : ""}${filter[1].v}`

const convertPrice = (price: number) => {
    return price * 100
}

const shouldDisplayPriceFilter = (price?: FilterPriceApiResponse) => {
    if (!price) return false
    return price.selectedMin !== price.min || price.max !== price.selectedMax
}

export default build

export const getPageOneUri = (historyUrl: string) => {
    const uri = new URL(historyUrl)
    const {searchParams} = uri
    searchParams.set("p", "1")
    uri.search = searchParams.toString()
    uri.hash = ""

    return decodeQueryParam(uri.toString())
}

export const getScrollPosition = (historyUrl: string): number => {
    const fragment = new URL(historyUrl).hash
    const scrollPosition = parseInt(fragment.replace(/[^0-9]/g, ""), 10)
    return Number.isNaN(scrollPosition) ? 0 : scrollPosition
}
