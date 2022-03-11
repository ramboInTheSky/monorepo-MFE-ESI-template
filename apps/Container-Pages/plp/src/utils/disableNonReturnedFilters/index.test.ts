import {disableNonReturnedFilters} from "."
import {FilterType} from "../../config/constants"

describe("Given a disableNonReturnedFilters() function", () => {
    it("when sending a list of new filters where there is a missing facet it adds it", () => {
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

        const mockNewFilters = {
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
                disabled: true,
            },
        }
        const incomingListMock = ["Test1"]
        const oldListMock = ["Test1", "Test2"]

        const expectedFiltersSortList = ["Test1", "Test2"]
        const expectedFilterList = {
            Test1: {
                name: "Test1",
                facets: ["opt1", "opt3"],
                displayName: "Test 1",
                type: "feat" as FilterType,
                isFilterOpen: true,
                isViewMoreOpen: true,
                disabled: false,
            },
            Test2: {
                name: "Test2 with options",
                facets: ["opt2"],
                displayName: "Test 2",
                type: "filter" as FilterType,
                isFilterOpen: false,
                isViewMoreOpen: false,
                disabled: true,
            },
        }

        expect(
            disableNonReturnedFilters({
                oldFilters: mockOldFilters,
                newFilters: mockNewFilters,
                oldFiltersSort: oldListMock,
                newFiltersSort: incomingListMock,
            }),
        ).toEqual({filtersSort: expectedFiltersSortList, filters: expectedFilterList})
    })

    it("when sending a list of new facets where there is no missing facets it returns correct data", () => {
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
                facets: [],
                displayName: "Test 2",
                type: "filter" as FilterType,
                isFilterOpen: false,
                isViewMoreOpen: false,
            },
        }

        const mockNewFilters = {
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
                facets: [],
                displayName: "Test 2",
                type: "filter" as FilterType,
                isFilterOpen: false,
                isViewMoreOpen: false,
                disabled: true,
            },
        }
        const incomingListMock = ["Test1"]
        const oldListMock = ["Test1"]

        const expectedFiltersSortList = ["Test1"]
        const expectedFilterList = {
            Test1: {
                name: "Test1",
                facets: ["opt1", "opt3"],
                displayName: "Test 1",
                type: "feat" as FilterType,
                isFilterOpen: true,
                isViewMoreOpen: true,
                disabled: false,
            },
            Test2: {
                name: "Test2 with options",
                facets: [],
                displayName: "Test 2",
                type: "filter" as FilterType,
                isFilterOpen: false,
                isViewMoreOpen: false,
                disabled: true,
            },
        }

        expect(
            disableNonReturnedFilters({
                oldFilters: mockOldFilters,
                newFilters: mockNewFilters,
                oldFiltersSort: oldListMock,
                newFiltersSort: incomingListMock,
            }),
        ).toEqual({filtersSort: expectedFiltersSortList, filters: expectedFilterList})
    })
})
