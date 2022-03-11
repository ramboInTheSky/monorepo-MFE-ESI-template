import {normalize, schema} from "normalizr"
import {ExternalSearchApiResponse, SearchApiResponse} from "../../models/searchApi"
import {Facets} from "../../models/Facet"
import {isApiPriceFilter} from "../../models/Filter/typeGuards"
import {FilterApiResponse, Filters} from "../../models/Filter"

const normaliseDataToState = (data: ExternalSearchApiResponse): SearchApiResponse => {
    const facets = new schema.Entity("facets", {}, {idAttribute: "v"})
    const filters = new schema.Entity(
        "filters",
        {
            facets: [facets],
        },
        {
            idAttribute: "name",
            processStrategy: (value: FilterApiResponse) => {
                if (isApiPriceFilter(value)) {
                    return {
                        name: value.name,
                        displayName: value.displayName,
                        type: value.type,
                        isFilterOpen: false,
                        min: value.min,
                        max: value.max,
                        selectedMin: value.selectedMin,
                        selectedMax: value.selectedMax,
                        currencyCode: value.currencyCode,
                    }
                }
                return {
                    name: value.name,
                    displayName: value.displayName,
                    type: value.type,
                    isFilterOpen: false,
                    isViewMoreOpen: false,
                    facets: value.options,
                }
            },
        },
    )

    const normalizedData = data.filters ? normalize(data.filters, [filters]) : null

    return {
        totalResults: data.totalResults,
        facets: (normalizedData?.entities.facets as any) ?? new Facets(),
        filtersSort: normalizedData?.result,
        filters: (normalizedData?.entities.filters as Filters | undefined) ?? new Filters(),
        items: data.items,
        sorting: data.sorting,
        title: data.title,
        relaxedQuery: data.relaxedQuery ? data.relaxedQuery : "",
        autoCorrectQuery: data.autoCorrectQuery,
        includedComponents: data.includedComponents ? data.includedComponents : [],
        searchCategory: data.searchCategory ? data.searchCategory : {id: "", name: ""}
    }
}

export default normaliseDataToState
