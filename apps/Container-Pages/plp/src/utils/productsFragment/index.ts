import {SearchApiResponse} from "../../models/searchApi"
import {ProductItem} from "../../models/Product"
import createProductSummaryEsiTag from "../createProductSummaryEsiTag"
import {SearchState} from "../../models/SearchState"
import {LAZYLOADING_TYPE, NEXT_PAGE, PREV_PAGE, FILTERING} from "../../models/Lazyload"
import {ESISeparator} from "../../config/constants"

/**
 * Creates a products fragment string that can be later converted into an
 * array of product items using the `mapProductsFragmentToItems()` function
 * @param items
 */
export const createProductsFragment = (items: ProductItem[], siteUrl: string, useDevEsi: boolean) => {
    return items.reduce((acc: string, item) => {
        const {itemNumber, newIn, type} = item
        const esiTag = createProductSummaryEsiTag(itemNumber, newIn, siteUrl, useDevEsi, type)
        return `${acc}<==>${itemNumber}<=>${newIn}<=>${esiTag}`
    }, "")
}

export const appendFilterData = (fragments: string, filters: SearchApiResponse) => {
    return `${JSON.stringify(filters)}${ESISeparator.ProductFragment}${fragments}`
}

export interface MapProductsFragmentToItemsResponse {
    items: MapProductsFragmentToItemsResponseItems[]
    searchStateData: SearchState | null
    searchBannerHtml: string | null
}
interface MapProductsFragmentToItemsResponseItems {
    itemNumber: string
    newIn: boolean
    html: string
}
/**
 * Converts a products fragment string to an array of product items
 * @param fragment
 */
export const mapProductsFragmentToItems = (
    apiResponse: string,
    lazyloadItemIndexFrom: number,
    lazyloadType: LAZYLOADING_TYPE = "no-lazyload",
): MapProductsFragmentToItemsResponse => {
    let filters: string | null = null
    let fragments: string | null = null
    let searchBanner: string | null = "<div></div>"
    let other: string
        // eslint-disable-next-line prefer-const
    ;[other, searchBanner] = apiResponse.split(ESISeparator.SearchBanner)
    if (!searchBanner) {
        searchBanner = "<div></div>"
    }
    if (apiResponse.includes(ESISeparator.ProductFragment)) {
        ;[filters, fragments] = other.split(ESISeparator.ProductFragment)
    } else {
        fragments = apiResponse
    }

    const searchStateData = filters ? (JSON.parse(filters) as SearchState) : null

    return {
        items: fragments
            .split("<==>")
            .filter(item => !!item)
            .map((item, key) => {
                const parts = item.split("<=>")
                let html = parts[2]
                const fragmentKey = key + 1
                if (
                    ((lazyloadType === NEXT_PAGE || lazyloadType === FILTERING) &&
                        fragmentKey > lazyloadItemIndexFrom) ||
                    (lazyloadType === PREV_PAGE && fragmentKey < lazyloadItemIndexFrom)
                ) {
                    html = replaceHTMLProductImagesLazyloadState(parts[2])
                }

                return {
                    itemNumber: parts[0],
                    newIn: parts[1] === "true",
                    html,
                }
            }),
        searchStateData,
        searchBannerHtml: searchBanner,
    }
}

const replaceHTMLProductImagesLazyloadState = productSummaryHTML => {
    const regex = /"productImages":false/g
    return productSummaryHTML.replace(regex, `"productImages":true`)
}
