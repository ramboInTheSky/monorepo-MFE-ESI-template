import {getHistoricFacetFilter} from "."
import {mockState} from "../../../__mocks__/mockStore"

describe("Given a getHistoricFacetFilter() function", () => {
    it("returns a new historic facet filter if there are none already there", () => {
        const tabbedFiltersMock = {...mockState.tabbedFilters}

        expect(getHistoricFacetFilter({parent: "Test1", child: "opt1", state: tabbedFiltersMock})).toEqual({
            Test1: ["opt1"],
        })
    })

    it("updates the historic facet filter with the child filter if it didn't exist in the historic facet filter", () => {
        const tabbedFiltersMock = {...mockState.tabbedFilters}
        tabbedFiltersMock.historicFacetFilter = {Test1: ["opt1"]}

        expect(getHistoricFacetFilter({parent: "Test1", child: "opt2", state: tabbedFiltersMock})).toEqual({
            Test1: ["opt1", "opt2"],
        })
    })

    it("removes the filter from the historic facet filter if selected again", () => {
        const tabbedFiltersMock = {...mockState.tabbedFilters}
        tabbedFiltersMock.historicFacetFilter = {Test1: ["opt1"]}
        tabbedFiltersMock.filters.Test1 = {
            name: "Test1",
            facets: ["opt1"],
            displayName: "Test 1",
            type: "feat",
            isFilterOpen: true,
            isViewMoreOpen: true,
        }

        expect(getHistoricFacetFilter({parent: "Test1", child: "opt1", state: tabbedFiltersMock})).toEqual({
            Test1: [],
        })
    })
})
