import alphabeticaliseCategoryFilters from "../seo/alphabeticaliseCategoryFilters"
import indexFilters from "../seo/indexFilters"
import {CategoryUrlSegments} from "../seo/getCategorySearchUrlSegment"
import {SEARCH_CATEGORY_SEGMENT} from "../../config/constants"
import {SearchApiResponse} from "../../models/searchApi"

export const getSEOFiltersHTML = (data: SearchApiResponse, originalUrl: string, urlSegments: CategoryUrlSegments) => {
    const getMainSection = filter =>
        filter?.facets?.length > 0 ? `<ul>${filter.facets.map(facet => getListItem(facet)).join("")}</ul>` : ""

    const getListItem = value => {
        const vHyphened = value.replace(/:/g, "-").replace(/\s/g, "")
        const alphabeticalisedFilters = alphabeticaliseCategoryFilters(`${urlSegments.filter}-${vHyphened}`)
        const noIndex =
            originalUrl.includes(vHyphened) || !indexFilters(alphabeticalisedFilters.sortedFilters) ? `/noindex` : ``
        const filterName = value.split(":")[1]
        const capitalisedFilterName = filterName.charAt(0).toUpperCase() + filterName.slice(1)
        return `<li><a href="/${SEARCH_CATEGORY_SEGMENT}/${urlSegments.category.replace(/-0/g, "")}/${
            alphabeticalisedFilters.sortedFilters
        }${noIndex}" >${capitalisedFilterName}</a></li>`
    }

    let HTMLResponse = `<noscript id="embeddedFiltersContent">`
    let navHTML = "<nav>"
    if (data.items.length > 0 && originalUrl.includes(`/${SEARCH_CATEGORY_SEGMENT}`)) {
        const keys = Object.keys(data.filters)
        if (keys.length > 0) {
            keys.forEach(key => {
                navHTML += getMainSection(data.filters[key])
            })
        }
        navHTML += `</nav>`
    }
    const KilobytesFromNFR = 200 * 1024
    const size = Math.floor(navHTML.length / 1024)
    if (navHTML.length >= KilobytesFromNFR) {
        navHTML = ""
    }
    HTMLResponse += `${navHTML}<p>filters:${Object.keys(data.facets).length} size:${size} KB</p></noscript>`
    return HTMLResponse
}
