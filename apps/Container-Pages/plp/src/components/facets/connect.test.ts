import {mapStateToProps, mergeProps} from "./connect"
import {setFilter, setViewMoreIsOpenThunk} from "../../ducks/search"
import {setViewAllOpen} from "../../ducks/viewAllModal"
import {ViewLinkOptions} from "../../config/constants"

import TrackIsViewMoreTriggeredFilter from "../../events/trackEvent/events/trackIsViewMoreTriggeredFilter"
import TrackIsViewLessTriggeredFilter from "../../events/trackEvent/events/trackIsViewLessTriggeredFilter"

jest.mock("../../ducks/search", () => ({
    setViewMoreIsOpenThunk: jest.fn(),
    setFilter: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackIsViewMoreTriggeredFilter", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackIsViewLessTriggeredFilter", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../ducks/viewAllModal", () => ({
    setViewAllOpen: jest.fn(),
}))

const mockFacets = ["1"]

const mockFacetsViewMore = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

const mockFacetsViewAll = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
]

describe("Given connect - mapStateToProps()", () => {
    it("when 1 filter, it should project state and return no filter buttons", () => {
        const mockState = {
            search: {
                filters: {
                    test: {
                        facets: mockFacets,
                        isViewMoreOpen: false,
                    },
                },
            },
        }
        expect(mapStateToProps(mockState as any, {facetName: "test"})).toEqual({
            viewLink: ViewLinkOptions.none,
            firstFilters: mockFacets,
            lastFilters: [],
            isViewMoreOpen: false,
        })
    })
    it("when 8 filters, it should project state and return no filter buttons", () => {
        const mockState = {
            search: {
                filters: {
                    test: {
                        facets: mockFacetsViewMore.slice(0, 8),
                        isViewMoreOpen: false,
                    },
                },
            },
        }
        expect(mapStateToProps(mockState as any, {facetName: "test"})).toEqual({
            viewLink: ViewLinkOptions.none,
            firstFilters: mockFacetsViewMore.slice(0, 8),
            lastFilters: [],
            isViewMoreOpen: false,
        })
    })
    it("when 9 filters, it should project state and return View More buttons", () => {
        const mockState = {
            search: {
                filters: {
                    test: {
                        facets: mockFacetsViewMore,
                        isViewMoreOpen: true,
                    },
                },
            },
        }
        expect(mapStateToProps(mockState as any, {facetName: "test"})).toEqual({
            viewLink: ViewLinkOptions.viewMore,
            firstFilters: mockFacetsViewMore.slice(0, 8),
            lastFilters: mockFacetsViewMore.slice(8, 9),
            isViewMoreOpen: true,
        })
    })

    it("when 19 filters, it should project state and return View More buttons", () => {
        const mockState = {
            search: {
                filters: {
                    test: {
                        facets: mockFacetsViewAll.slice(0, 19),
                        isViewMoreOpen: true,
                    },
                },
            },
        }
        expect(mapStateToProps(mockState as any, {facetName: "test"})).toEqual({
            viewLink: ViewLinkOptions.viewMore,
            firstFilters: mockFacetsViewAll.slice(0, 8),
            lastFilters: mockFacetsViewAll.slice(8, 19),
            isViewMoreOpen: true,
        })
    })
    it("when 20 filters, it should project state and return View All buttons", () => {
        const mockState = {
            search: {
                filters: {
                    test: {
                        facets: mockFacetsViewAll,
                        isViewMoreOpen: true,
                    },
                },
            },
        }
        expect(mapStateToProps(mockState as any, {facetName: "test"})).toEqual({
            viewLink: ViewLinkOptions.viewAll,
            firstFilters: mockFacetsViewAll.slice(0, 8),
            lastFilters: mockFacetsViewAll.slice(8, 20),
            isViewMoreOpen: true,
        })
    })
    it("when more than 8 filters, and at least one is selected it should project state, return View All buttons and max 30 on-page filters ", () => {
        const mockState = {
            search: {
                filters: {
                    test: {
                        facets: mockFacetsViewAll,
                        isViewMoreOpen: true,
                    },
                },
                facets: {
                    "1": {
                        n: "1",
                        v: "1",
                        c: 78,
                    },
                    "2": {
                        n: "2",
                        v: "2",
                        c: 16,
                    },
                    "3": {
                        n: "Coats",
                        v: "3",
                        c: 36,
                    },
                    "4": {
                        n: "4",
                        v: "4",
                        c: 33,
                    },
                    "5": {
                        n: "5",
                        v: "5",
                        c: 7,
                    },
                    "6": {
                        n: "6",
                        v: "6",
                        c: 2,
                    },
                    "7": {
                        n: "7",
                        v: "7",
                        c: 66,
                    },
                    "8": {
                        n: "8",
                        v: "8",
                        c: 66,
                    },
                    "9": {
                        n: "9",
                        v: "9",
                        c: 66,
                    },
                    "10": {
                        n: "10",
                        v: "10",
                        c: 66,
                        s: true,
                    },
                },
            },
        }
        expect(mapStateToProps(mockState as any, {facetName: "test"})).toEqual({
            viewLink: ViewLinkOptions.viewAll,
            firstFilters: mockFacetsViewAll.slice(0, 30),
            lastFilters: mockFacetsViewAll.slice(8, 20),
            isViewMoreOpen: true,
            facets: {
                "1": {
                    c: 78,
                    n: "1",
                    v: "1",
                },
                "10": {
                    c: 66,
                    n: "10",
                    s: true,
                    v: "10",
                },
                "2": {
                    c: 16,
                    n: "2",
                    v: "2",
                },
                "3": {
                    c: 36,
                    n: "Coats",
                    v: "3",
                },
                "4": {
                    c: 33,
                    n: "4",
                    v: "4",
                },
                "5": {
                    c: 7,
                    n: "5",
                    v: "5",
                },
                "6": {
                    c: 2,
                    n: "6",
                    v: "6",
                },
                "7": {
                    c: 66,
                    n: "7",
                    v: "7",
                },
                "8": {
                    c: 66,
                    n: "8",
                    v: "8",
                },
                "9": {
                    c: 66,
                    n: "9",
                    v: "9",
                },
            },
            isFetchingPageItems: undefined,
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {isViewMoreOpen: true}
const mockMappedStateIsViewMoreOpenFalse = {isViewMoreOpen: false}
const ownProps = {facetName: "Size"}
const mockEvent = {preventDefault: jest.fn()}
describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeEach(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, ownProps)
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...ownProps,
            toggleViewMore: expect.any(Function),
            openViewAllModal: expect.any(Function),
            handleSetFilter: expect.any(Function),
        })
    })
    it("should create a toggleViewMore function and call TrackIsViewLessTriggeredFilter", () => {
        actualMergeProps.toggleViewMore(mockEvent)
        expect(setViewMoreIsOpenThunk).toHaveBeenCalledWith(false, "Size")
        expect(TrackIsViewLessTriggeredFilter).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalled()
    })
    it("should create a openViewAllModal function", () => {
        actualMergeProps.openViewAllModal(mockEvent)
        expect(setViewAllOpen).toHaveBeenCalledWith("Size")
        expect(mockDispatch).toHaveBeenCalled()
    })
    it("should create a handleSetFilter function", () => {
        actualMergeProps.handleSetFilter("test-option")
        expect(setFilter).toHaveBeenCalledWith("test-option")
        expect(mockDispatch).toHaveBeenCalled()
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
})

describe("given connect - mergeProps when isOpenViewMore is true", () => {
    let actualMergeProps
    beforeEach(() => {
        actualMergeProps = mergeProps(mockMappedStateIsViewMoreOpenFalse, {dispatch: mockDispatch} as any, ownProps)
    })
    it("should create a toggleViewMore function and call TrackIsViewMoreTriggeredFilter", () => {
        actualMergeProps.toggleViewMore(mockEvent)
        expect(setViewMoreIsOpenThunk).toHaveBeenCalledWith(true, "Size")
        expect(TrackIsViewMoreTriggeredFilter).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalled()
    })
})
