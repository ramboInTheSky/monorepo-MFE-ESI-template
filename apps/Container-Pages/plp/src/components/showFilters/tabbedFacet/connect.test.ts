import connect from "./connect"
import {renderConnect, createMockStateForTabbedFilters} from "../../../../__mocks__/connect"
import {isFacetFiltersSelected} from "../../../utils/isFacetFiltersSelected"
import {setSelectedFilterThunk} from "../../../ducks/tabbedFilters"
import TrackFilterExpanded from "../../../events/trackEvent/events/trackFilterExpanded"

jest.mock("../../../events/trackEvent/events/trackFilterExpanded", () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: jest.fn(() => {}),
}))

const mockState = createMockStateForTabbedFilters({
    filters: {
        feat: {
            name: "feat",
            displayName: "Feat",
            type: "feat",
            isFacetOpen: false,
            isViewMoreOpen: false,
            facets: ["feat:newin", "feat:backinstock", "feat:available"],
        },
        price: {
            name: "price",
            displayName: "price",
            type: "price",
            isFacetOpen: false,
            isViewMoreOpen: false,
            facets: ["feat:newin", "feat:backinstock", "feat:available"],
        },
        facetOne: {
            name: "facetOne",
            displayName: "facetOne",
            type: "filter",
            isFacetOpen: false,
            isViewMoreOpen: false,
            facets: ["facetOne:filterOne", "facetOne:filterTwo", "facetOne:filterThree"],
        },
    },
    selectedFilter: "facetOne",
})

jest.mock("../../../utils/isFacetFiltersSelected", () => ({
    isFacetFiltersSelected: jest.fn(() => true),
}))
jest.mock("../../../utils/getSelectedFacetFilters", () => ({
    getSelectedFacetFilters: jest.fn(() => "Dolce & Gabbana, Gucci"),
}))
jest.mock("../../../ducks/tabbedFilters", () => ({
    setSelectedFilterThunk: jest.fn(() => ({type: "test"})),
}))

describe("Given a tabbedFacet connect", () => {
    let props

    beforeAll(() => {
        props = renderConnect(connect, mockState, {facetName: "facetOne", isFirstFacet: true})
    })

    it("should check if filter has selected filters", () => {
        expect(isFacetFiltersSelected).toHaveBeenCalledWith(
            mockState.tabbedFilters.filters.facetOne,
            mockState.tabbedFilters.historicFacetFilter,
        )
    })

    it("should map state to props correctly", () => {
        expect(props).toEqual(
            expect.objectContaining({
                isFocused: true,
                hasSelectedFilters: true,
                hideTopBorder: true,
                hasSelectedFacet: true,
            }),
        )
    })

    describe("When prop 'setSelectedFacet' is called", () => {
        it("should set selected facet", () => {
            props.setSelectedFacet()
            expect(setSelectedFilterThunk).toHaveBeenCalledWith("facetOne")
            expect(TrackFilterExpanded).toHaveBeenLastCalledWith("facetOne")
        })
    })

    describe("When there are selected filters and no selected facet but panel is open", () => {
        it("should map state to props correctly", () => {
            expect(
                renderConnect(
                    connect,
                    {...mockState, tabbedFilters: {...mockState.tabbedFilters, isOpen: true, selectedFilter: null}},
                    {facetName: "facetOne", isFirstFacet: true},
                ),
            ).toEqual(
                expect.objectContaining({
                    hasSelectedFilters: true,
                    hasSelectedFacet: false,
                    selectedFacetFilters: "Dolce & Gabbana, Gucci",
                }),
            )
        })
    })
})
