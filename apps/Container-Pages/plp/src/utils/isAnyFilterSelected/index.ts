import {isPriceFilter} from "../../models/Filter/typeGuards"
import {Filter} from "../../models/Filter"
import {isFilteredPriceFn} from "../getFilterFacets"

export function getIsAnyFilterSelected(historicFacetFilter: Record<string, string[]>, filter?: Filter) {
    if (filter && isPriceFilter(filter) && isFilteredPriceFn(filter)) {
        return true
    }

    return Object.values(historicFacetFilter).some(list => Boolean(list?.length))
}
