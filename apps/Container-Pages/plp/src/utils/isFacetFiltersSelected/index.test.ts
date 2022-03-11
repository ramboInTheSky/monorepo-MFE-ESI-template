import {isFacetFiltersSelected} from "."
import {FilterFacet, FilterPrice} from "../../models/Filter"

const mockPriceFilter = {type: "price", min: 0, selectedMin: 0, selectedMax: 3000, max: 3000} as FilterPrice
const mockFilterFacet = {type: "filter", name: "brand", facets: ["brand one", "brand two"]} as FilterFacet

describe("Given a isFacetFiltersSelected() util", () => {
    it("should be a function", () => {
        expect(isFacetFiltersSelected).toBeInstanceOf(Function)
    })

    describe("When called with a price facet", () => {
        describe("and when min value is changed", () => {
            it("should return true", () => {
                expect(isFacetFiltersSelected({...mockPriceFilter, selectedMin: 100}, {})).toBe(true)
            })
        })

        describe("and when max value is changed", () => {
            it("should return true", () => {
                expect(isFacetFiltersSelected({...mockPriceFilter, selectedMax: 100}, {})).toBe(true)
            })
        })
    })

    describe("When called with a filter facet", () => {
        it("should return true when it has selected filters in the filter state", () => {
            expect(
                isFacetFiltersSelected(mockFilterFacet, {
                    brand: ["brand one"],
                }),
            ).toBe(true)
        })

        it("should return false when it has no selected filters in the filter state", () => {
            expect(isFacetFiltersSelected(mockFilterFacet, {})).toBe(false)
        })
    })
})
