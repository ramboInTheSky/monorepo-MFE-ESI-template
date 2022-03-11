import {getFacetsWithUnselectedOption, getFilteredFacetList, getRefinedFilters, isFilteredPriceFn} from "."
import {mockState} from "../../../__mocks__/mockStore"
import {FacetsState} from "../../models/FacetsState"
import {FilterFacet, FilterPrice, Filters} from "../../models/Filter"

describe("Given a isFilteredPriceFn", () => {
    describe("When calling isFilteredPriceFn with no changes to pricing", () => {
        const priceData: FilterPrice = {
            name: "Price",
            displayName: "Price",
            type: "price",
            currencyCode: "GBP",
            min: 0,
            max: 100,
            selectedMin: 0,
            selectedMax: 100,
            isFilterOpen: false,
        }
        it("should return false", () => {
            expect(isFilteredPriceFn(priceData)).toEqual(false)
        })
    })
    describe("When calling isFilteredPriceFn with selectedMin changed from 0 to 20", () => {
        const priceData: FilterPrice = {
            name: "Price",
            displayName: "Price",
            type: "price",
            currencyCode: "GBP",
            min: 0,
            max: 100,
            selectedMin: 20,
            selectedMax: 100,
            isFilterOpen: false,
        }
        it("should return true", () => {
            expect(isFilteredPriceFn(priceData)).toEqual(true)
        })
    })
})

describe("Given a getFilteredFacetList", () => {
    describe("When calling getFilteredFacetList with no selected items", () => {
        const filters: FilterFacet = {
            name: "Test1",
            facets: ["opt1", "opt2"],
            displayName: "Test 1",
            type: "feat",
            isFilterOpen: true,
            isViewMoreOpen: true,
        }
        const facets: FacetsState = {
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: [], d: false},
        }

        it("should empty array", () => {
            expect(getFilteredFacetList(filters, facets)).toEqual([])
        })
    })
    describe("When calling getFilteredFacetList with selectedMin changed from 0 to 20", () => {
        const filters: FilterFacet = {
            name: "Test1",
            facets: ["opt1", "opt2"],
            displayName: "Test 1",
            type: "feat",
            isFilterOpen: true,
            isViewMoreOpen: true,
        }
        const facets: FacetsState = {
            opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: [], d: false},
        }

        it("should return array of string ['opt1']", () => {
            expect(getFilteredFacetList(filters, facets)).toEqual(["opt1"])
        })
    })
})

describe("Given a getRefinedFilters", () => {
    describe("When calling getRefinedFilters with different filter types", () => {
        let filtersSort = ["Test3"]
        const mockTestFilters: Filters = mockState.search.filters
        let mockSingleOptionFacetLists: string[] = mockState.search.singleOptionFacetList
        it("should not exclude the price facet", () => {
            expect(getRefinedFilters(filtersSort, mockTestFilters, mockSingleOptionFacetLists, [])).toEqual(["Test3"])
        })

        it("should ignore the items from the consolidated list", () => {
            filtersSort = ["Test2", "Test3"]
            expect(getRefinedFilters(filtersSort, mockTestFilters, mockSingleOptionFacetLists, ["Test2"])).toEqual([
                "Test3",
            ])
        })

        it("should not ignore the items from the exclude list", () => {
            filtersSort = ["Test1", "Test3"]
            mockSingleOptionFacetLists = ["Test1"]
            expect(getRefinedFilters(filtersSort, mockTestFilters, mockSingleOptionFacetLists, [])).toEqual([
                "Test1",
                "Test3",
            ])
        })
    })
})

describe("Given a getFacetsWithUnselectedOption", () => {
    describe("When calling getFacetsWithUnselectedOption with different facet types", () => {
        const filter: FilterFacet = {
            name: "Test1",
            facets: ["opt1", "opt2"],
            displayName: "Test 1",
            type: "feat",
            isFilterOpen: true,
            isViewMoreOpen: true,
        }
        const facets: FacetsState = {
            opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: [], d: false},
        }
        it("should return false for non single facets", () => {
            expect(getFacetsWithUnselectedOption(filter, facets)).toEqual(false)
        })

        it("should return true for non single selected facets", () => {
            const mockFilter = {...filter, facets: ["opt1"]}
            const mockfacets = {
                opt1: {n: "opt1", c: 1, v: "opt1", s: false, incompatibleWith: [], d: false},
            }
            expect(getFacetsWithUnselectedOption(mockFilter, mockfacets)).toEqual(true)
        })
    })
})
