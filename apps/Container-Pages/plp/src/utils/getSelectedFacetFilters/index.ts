import {formatPrice} from "@monorepo/utils"
import {FacetsState} from "../../models/FacetsState"

import {Filter} from "../../models/Filter"
import {isPriceFilter} from "../../models/Filter/typeGuards"
import {isFilteredPriceFn} from "../getFilterFacets"

interface Params {
    historicFacetFilter: Record<string, string[]>
    filter: Filter
    locale: string
    realm: string
    facets: FacetsState
}

export const getSelectedFacetFilters = ({historicFacetFilter, filter, locale, facets, realm}: Params): string => {
    if (isPriceFilter(filter) && isFilteredPriceFn(filter)) {
        return formatPrice(filter.selectedMin, filter.selectedMax, filter.currencyCode, locale, realm)
    }

    let stringToReturn: string[] = []

    Object.entries(historicFacetFilter).forEach(([key, values]) => {
        if (filter.name === key) {
            stringToReturn = values.map(value => facets[value].n)
        }
    })

    return stringToReturn.join(", ")
}
