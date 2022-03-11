import {isPriceFilter} from "../../models/Filter/typeGuards"
import {Filter} from "../../models/Filter"
import {isFilteredPriceFn} from "../getFilterFacets"

export function isFacetFiltersSelected(filter: Filter, historicFacetFilter: Record<string, string[]>) {
    if (isPriceFilter(filter)) {
        return isFilteredPriceFn(filter)
    }

    return Boolean(historicFacetFilter[filter.name]?.length)
}
