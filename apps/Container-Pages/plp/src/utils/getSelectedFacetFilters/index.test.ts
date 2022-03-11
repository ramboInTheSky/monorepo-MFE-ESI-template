import {getSelectedFacetFilters} from "."
import {mockState} from "../../../__mocks__/mockStore"

describe("Given a getSelectedFacetFilters() function", () => {
    it("if a non-price filter is sent a string containing the facet is returned", () => {
        const tabbedFiltersMock = {...mockState.tabbedFilters}
        tabbedFiltersMock.historicFacetFilter = {Test1: ["opt1"]}

        expect(
            getSelectedFacetFilters({
                historicFacetFilter: tabbedFiltersMock.historicFacetFilter,
                filter: mockState.tabbedFilters.filters.Test1,
                locale: "gb",
                facets: mockState.tabbedFilters.facets,
                realm: "amido",
            }),
        ).toEqual("opt1")
    })

    it("if a price filter is sent a string containing the currently selected Min and Max is returned", () => {
        const tabbedFiltersMock = {...mockState.tabbedFilters}
        tabbedFiltersMock.historicFacetFilter = {}

        expect(
            getSelectedFacetFilters({
                historicFacetFilter: tabbedFiltersMock.historicFacetFilter,
                filter: mockState.tabbedFilters.filters.Price,
                locale: "gb",
                facets: mockState.tabbedFilters.facets,
                realm: "amido",
            }),
        ).toEqual("£30 - £70")
    })

    it("If the historic facet filter contains an facet filter combo that doesn't exist it returns an empty string", () => {
        const tabbedFiltersMock = {...mockState.tabbedFilters}
        tabbedFiltersMock.historicFacetFilter = {Test4: ["opt1"]}

        expect(
            getSelectedFacetFilters({
                historicFacetFilter: tabbedFiltersMock.historicFacetFilter,
                filter: mockState.tabbedFilters.filters.Test2,
                locale: "gb",
                facets: mockState.tabbedFilters.facets,
                realm: "amido",
            }),
        ).toEqual("")
    })
})
