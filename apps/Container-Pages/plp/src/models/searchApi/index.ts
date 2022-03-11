import {SearchApiRequestTypes} from "../../config/constants"
import {Facets} from "../Facet"
import {SearchCategory} from "../SearchCategory"
import {FilterApiResponse, Filters} from "../Filter"
import {ProductItem} from "../Product"
import {Pagination} from "../Pagination"
import {Sorting} from "../Sorting"

export class KeywordRedirect {
    redirectedUrl = ""
    redirectedQuery = ""
    originalQuery = ""
}

export class ExternalSearchApiResponse {
    totalResults!: number
    redirect: any
    filters: FilterApiResponse[] | null = null
    items: ProductItem[] = []
    pagination: Pagination = new Pagination()
    keywordRedirect: KeywordRedirect = new KeywordRedirect()
    sorting: Sorting = new Sorting()
    title = ""
    autoCorrectQuery = ""    
    relaxedQuery = ""
    includedComponents?: string[] = []
    searchCategory?: SearchCategory = {id: "", name: ""}
}

export class ExternalSearchApiRedirectResponse {
    redirectUrl!: string
}

export type ExternalGenericSearchApiResponse = ExternalSearchApiResponse | ExternalSearchApiRedirectResponse

export class ExternalSearchApiRequest {
    criteria = ""
    segment = ""
    start = 0
    pagesize = 0
    contextid = ""
    type: SearchApiRequestTypes = SearchApiRequestTypes.Category
    fields: string | null = null
}

export class SearchApiRequest extends ExternalSearchApiRequest {
    searchTerm = ""
}

export class SearchApiResponse {
    totalResults!: number
    facets: Facets = new Facets()
    filtersSort: string[] = []
    filters: Filters = new Filters()
    items: ProductItem[] = []
    sorting: Sorting = new Sorting()
    title = ""
    autoCorrectQuery: string | null = "" 
    relaxedQuery = ""
    includedComponents: string[] = []
    searchCategory: SearchCategory = {id: "", name: ""}
}

export class RedirectResponse {
    statusCode!: number
    url!: string
}

export type GenericSearchResponse = SearchApiResponse | RedirectResponse
