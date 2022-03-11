import connect, {mapDispatchToProps} from "./connect"
import {renderConnect, createMockStateForTabbedFilters} from "../../../__mocks__/connect"
import {isFilteredPriceFn} from "../../utils/getFilterFacets"
import {mockText} from "../../../__mocks__/mockStore"
import TrackFilterClearAll from "../../events/trackEvent/events/trackFilterClearAll"
import {setTabbedFiltersOpenAction, syncTabbedFiltersFromSearch} from "../../ducks/tabbedFilters"

jest.mock("../../utils/getFilterFacets", () => ({
    getFilteredFacetList: jest.fn(() => [""]),
    isFilteredPriceFn: jest.fn(() => true),
}))

jest.mock("../../events/trackEvent/events/trackFilterClearAll", () => jest.fn())

jest.mock("../../ducks/tabbedFilters", () => ({
    setTabbedFiltersOpenAction: jest.fn(),
    syncTabbedFiltersFromSearch: jest.fn(),
}))

const mockState = createMockStateForTabbedFilters({
    filters: {
        feat: {
            name: "feat",
            displayName: "Feat",
            type: "feat",
            isFilterOpen: false,
            isViewMoreOpen: false,
            facets: ["feat:newin", "feat:backinstock", "feat:available"],
        },
        price: {
            name: "price",
            displayName: "price",
            type: "price",
            isFilterOpen: false,
            isViewMoreOpen: false,
            facets: ["feat:newin", "feat:backinstock", "feat:available"],
        },
        filter1: {
            name: "filter1",
            displayName: "filter1",
            type: "filter",
            isFilterOpen: false,
            isViewMoreOpen: false,
            facets: ["feat:newin", "feat:backinstock", "feat:available"],
        },
    },
    filtersSort: ["feat", "price", "filter1"],
    isOpen: true,
    text: mockText,
})

describe("Given a showFilters connect", () => {
    let props

    beforeAll(() => {
        props = renderConnect(connect, mockState)
    })

    it("should map state to props correctly", () => {
        expect(props).toEqual(
            expect.objectContaining({
                filters: {
                    feat: {
                        name: "feat",
                        displayName: "Feat",
                        type: "feat",
                        isFilterOpen: false,
                        isViewMoreOpen: false,
                        facets: ["feat:newin", "feat:backinstock", "feat:available"],
                    },
                    price: {
                        name: "price",
                        displayName: "price",
                        type: "price",
                        isFilterOpen: false,
                        isViewMoreOpen: false,
                        facets: ["feat:newin", "feat:backinstock", "feat:available"],
                    },
                    filter1: {
                        name: "filter1",
                        displayName: "filter1",
                        type: "filter",
                        isFilterOpen: false,
                        isViewMoreOpen: false,
                        facets: ["feat:newin", "feat:backinstock", "feat:available"],
                    },
                },
                filtersSort: ["feat", "price", "filter1"],
                isOpen: true,
                isAnyFilterSelected: true,
                hasSelectedFacet: false,
            }),
        )
    })

    it("should call isFilteredPriceFn", () => {
        const mockPriceOnlyState = createMockStateForTabbedFilters({
            filters: {
                price: {
                    name: "price",
                    displayName: "price",
                    type: "price",
                    isFilterOpen: false,
                    isViewMoreOpen: false,
                    selectedMin: 10,
                    min: 0,
                    facets: ["feat:newin", "feat:backinstock", "feat:available"],
                },
            },
            filtersSort: ["feat", "price", "filter1"],
        })

        props = renderConnect(connect, mockPriceOnlyState)
        expect(isFilteredPriceFn).toHaveBeenCalled()
    })

    it("When no filters are selected, it should expected model", () => {
        const mockNoFiltersState = createMockStateForTabbedFilters({
            filters: {
                price: {
                    name: "price",
                    displayName: "price",
                    type: "xxxx",
                    isFilterOpen: false,
                    isViewMoreOpen: false,
                    facets: ["feat:newin", "feat:backinstock", "feat:available"],
                },
            },
            filtersSort: ["feat", "price", "filter1"],
        })

        props = renderConnect(connect, mockNoFiltersState)
        expect(props).toEqual(
            expect.objectContaining({
                filters: {
                    price: {
                        name: "price",
                        displayName: "price",
                        type: "xxxx",
                        isFilterOpen: false,
                        isViewMoreOpen: false,
                        facets: ["feat:newin", "feat:backinstock", "feat:available"],
                    },
                },
                filtersSort: ["feat", "price", "filter1"],
                isOpen: false,
                isAnyFilterSelected: false,
                hasSelectedFacet: false,
            }),
        )
    })
})

describe("Given connect - mapDispatchToProps()", () => {
    let dispatch
    beforeAll(() => {
        dispatch = jest.fn()
    })

    it("should add state functions", () => {
        expect(mapDispatchToProps(dispatch)).toEqual({
            clearAll: expect.any(Function),
            syncTabbedFilters: expect.any(Function),
            closeTabbedFilters: expect.any(Function),
        })
    })

    it("should create a clearAll function", () => {        
        mapDispatchToProps(dispatch).clearAll()
        expect(TrackFilterClearAll).toHaveBeenCalled()
    })

    it("should create a syncTabbedFilters function", () => {        
        mapDispatchToProps(dispatch).syncTabbedFilters(true)
        expect(syncTabbedFiltersFromSearch).toHaveBeenCalledWith(true)
    })
    it("should create a closeTabbedFilters function", () => {        
        mapDispatchToProps(dispatch).closeTabbedFilters(true)
        expect(setTabbedFiltersOpenAction).toHaveBeenCalledWith(true)
    })
})
