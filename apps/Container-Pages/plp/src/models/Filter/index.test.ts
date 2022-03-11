import {Filters, FilterFacet, FilterFacetApiResponse, FilterPrice} from "."
import {FacetApiResponse} from "../Facet"

describe("Model - Filters: ", () => {
    const mockFilters = new Filters()
    mockFilters.Test = new FilterFacet()
    mockFilters.TestPrice = new FilterPrice()
    it("should match the Filters", () => {
        expect(mockFilters).toMatchSnapshot()
    })
})

describe("Model - FilterFacetApiResponse: ", () => {
    const mockFilter = new FilterFacetApiResponse()
    mockFilter.options = [new FacetApiResponse()]
    mockFilter.options = [new FacetApiResponse()]
    it("should match the FilterFacetApiResponse", () => {
        expect(mockFilter).toMatchSnapshot()
    })
})

describe("Model - FilterPriceApiResponse: ", () => {
    const mockFilter = new FilterFacetApiResponse()
    it("should match the FilterPriceApiResponse", () => {
        expect(mockFilter).toMatchSnapshot()
    })
})
