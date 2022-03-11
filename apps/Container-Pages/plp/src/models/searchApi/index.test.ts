import {FilterFacetApiResponse} from "../Filter"
import {FacetApiResponse} from "../Facet"
import {SearchApiRequest, KeywordRedirect, ExternalSearchApiResponse} from "."
import {ProductItem} from "../Product"

describe("Model - Search Api Response: ", () => {
    it("should match the expected search model structure", () => {
        const testResponse = new ExternalSearchApiResponse()
        testResponse.filters = [new FilterFacetApiResponse()]
        ;(testResponse.filters[0] as FilterFacetApiResponse).options = [new FacetApiResponse()]
        testResponse.items = [new ProductItem()]
        testResponse.keywordRedirect = new KeywordRedirect()
        testResponse.pagination.totalResults = 1
        testResponse.includedComponents = []
        testResponse.searchCategory = {id: "", name: ""}
        expect(testResponse).toMatchSnapshot()
    })
})

describe("Model - Search Api Request: ", () => {
    it("should match the expected search model structure", () => {
        expect(new SearchApiRequest()).toMatchSnapshot()
    })
})
