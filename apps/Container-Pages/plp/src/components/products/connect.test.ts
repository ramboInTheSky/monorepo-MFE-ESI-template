// These mocks should be imported before the modules they are mocking
import {
    createMockStateForSearch,
    mockSelectHasNextPage,
    mockSelectHasPreviousPage,
    mockSelectFetchTriggerOffset,
    mockSelectSubsequentItemsPerPage,
} from "../../ducks/search/__mocks__"

import connect from "./connect"
import {renderConnect} from "../../../__mocks__/connect"

import {
    fixFacets,
    unfixFacets,
    selectHasNextPage,
    selectHasPreviousPage,
    fetchNextPageItemsThunk,
    fetchPreviousPageItemsThunk,
} from "../../ducks/search"

import {selectFetchTriggerOffset} from "../../ducks/search/utils"
import {mockText} from "../../../__mocks__/mockStore"
import {pushSearchResultsEvent} from "../../utils/pushSearchResultsEvent"

jest.mock("../../utils/pushSearchResultsEvent")

const mockState = createMockStateForSearch({
    items: [1, 2],
    endPage: 8,
    startPage: 5,
    itemsPerPage: 20,
    isFetchingNextPage: "foo",
    isFetchingPreviousPage: "bar",
    itemsPerRow: {
        default: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
        },
        inPageFiltersEnabled: {
            xs: 2,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
        },
    },
    fetchTriggerOffsetRows: {
        xs: 2,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
    },
    currentBreakpoint: "lg",
})

describe("Given connect", () => {
    let props
    beforeAll(() => {
        jest.clearAllMocks()

        mockSelectHasNextPage("one")
        mockSelectHasPreviousPage("two")
        mockSelectFetchTriggerOffset(4)
        mockSelectSubsequentItemsPerPage(24)

        props = renderConnect(connect, mockState)
    })

    it("should correctly map state to props", () => {
        const {search, request} = mockState
        expect(props).toEqual({
            items: search.items,
            endPage: search.endPage,
            startPage: search.startPage,
            requestedPage: request.page,
            isFetchingNextPage: search.isFetchingNextPage,
            isFetchingPreviousPage: search.isFetchingPreviousPage,
            isFetchingPageItems: search.isFetchingPageItems,
            fetchPreviousPage: expect.any(Function),
            fetchNextPage: expect.any(Function),
            unfixFacets: expect.any(Function),
            fixFacets: expect.any(Function),
            hasNextPage: "one",
            hasPreviousPage: "two",
            fetchTriggerOffset: 4,
            itemsPerPage: 24,
            siteUrl: request.siteUrl,
            useDevEsi: false,
            isAutocorrected: false,
            hasSelectedFilters: false,
            text: mockText,
            url: "/",
            searchCategoryId: "",
            searchCategoryName: "",
            pushSearchResultsEvent: expect.any(Function),
        })
    })

    it("should use appropriate selectors", () => {
        expect(selectHasNextPage).toHaveBeenCalledWith(mockState)
        expect(selectHasPreviousPage).toHaveBeenCalledWith(mockState)
        expect(selectFetchTriggerOffset).toHaveBeenCalledWith(mockState)
    })

    it("should correctly map the `fetchNextPage` dispatch prop", () => {
        props.fetchNextPage("foo")
        expect(fetchNextPageItemsThunk).toHaveBeenCalledWith("foo")
    })

    it("should correctly map the `fetchPreviousPage` dispatch prop", () => {
        props.fetchPreviousPage("bar")
        expect(fetchPreviousPageItemsThunk).toHaveBeenCalledWith("bar")
    })

    it("should correctly map the `fixFacets` dispatch props", () => {
        props.fixFacets("foo")
        expect(fixFacets).toHaveBeenCalledWith("foo")
    })

    it("should correctly map the `unfixFacets` dispatch props", () => {
        props.unfixFacets("bar")
        expect(unfixFacets).toHaveBeenCalledWith("bar")
    })

    it("should correctly map the `pushSearchResultsEvent` dispatch props", () => {
        props.pushSearchResultsEvent()
        expect(pushSearchResultsEvent).toHaveBeenCalledWith(expect.any(Object))
    })
})
