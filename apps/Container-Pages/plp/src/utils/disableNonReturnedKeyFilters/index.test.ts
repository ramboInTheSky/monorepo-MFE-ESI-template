import {disableNonReturnedKeyFilters} from "."
import {FilterType} from "../../config/constants"

describe("Given a disableNonReturnedKeyFilters() function", () => {
    it("will disable a facet if it is not in the incomingFacet list", () => {
        const mockOldFacets = {
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
            opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
        }
        const mockIncomingFacets = {
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
        }
        const mockOldFilters = {
            Test1: {
                name: "Test1",
                facets: ["opt1", "opt3"],
                displayName: "Test 1",
                type: "feat" as FilterType,
                isFilterOpen: true,
                isViewMoreOpen: true,
            },
            Test2: {
                name: "Test2 with options",
                facets: ["opt2"],
                displayName: "Test 2",
                type: "filter" as FilterType,
                isFilterOpen: false,
                isViewMoreOpen: false,
            },
        }

        const mockFacetsResult = {
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
            opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: true},
        }

        expect(
            disableNonReturnedKeyFilters({
                oldFacets: mockOldFacets,
                newFacets: mockIncomingFacets,
                oldFilters: mockOldFilters,
                newFilters: {},
            }),
        ).toEqual({
            facets: mockFacetsResult,
            filters: {
                Test1: {
                    name: "Test1",
                    facets: ["opt1", "opt3"],
                    displayName: "Test 1",
                    type: "feat" as FilterType,
                    isFilterOpen: true,
                    isViewMoreOpen: true,
                },
            },
        })
    })

    it("will return the incoming facets if there are no feat filters", () => {
        const mockOldFacets = {
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
            opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
        }
        const mockIncomingFacets = {
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
        }
        const mockOldFilters = {
            Test1: {
                name: "Test1",
                facets: ["opt1", "opt3"],
                displayName: "Test 1",
                type: "filter" as FilterType,
                isFilterOpen: true,
                isViewMoreOpen: true,
            },
            Test2: {
                name: "Test2 with options",
                facets: ["opt2"],
                displayName: "Test 2",
                type: "filter" as FilterType,
                isFilterOpen: false,
                isViewMoreOpen: false,
            },
        }

        const mockFacetsResult = {
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
        }

        expect(
            disableNonReturnedKeyFilters({
                oldFacets: mockOldFacets,
                newFacets: mockIncomingFacets,
                oldFilters: mockOldFilters,
                newFilters: {},
            }),
        ).toEqual({
            filters: {},
            facets: mockFacetsResult,
        })
    })
})
