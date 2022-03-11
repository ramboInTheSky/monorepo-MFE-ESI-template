import {mockState} from "../../../../__mocks__/mockStore"

import {selectHasNextPage, selectHasPreviousPage} from ".."

import {selectFetchTriggerOffset, selectSubsequentItemsPerPage} from "../utils"

jest.mock("../utils", () => ({
    selectFetchTriggerOffset: jest.fn(),
    selectSubsequentItemsPerPage: jest.fn(),
}))
jest.mock("..", () => ({
    fixFacets: jest.fn(() => ({type: "FIX_FACETS"})),
    unfixFacets: jest.fn(() => ({type: "UNFIX_FACETS"})),
    selectItems: jest.fn(),
    selectHasNextPage: jest.fn(),
    selectHasPreviousPage: jest.fn(),
    selectCurrentEndPage: jest.fn(),
    selectCurrentStartPage: jest.fn(),
    selectTotalItemsPerPage: jest.fn(),
    fetchNextPageItemsThunk: jest.fn(() => ({type: "foo"})),
    fetchPreviousPageItemsThunk: jest.fn(() => ({type: "foo"})),
}))

export function mockSelectHasNextPage(result) {
    ;(selectHasNextPage as jest.Mock).mockReturnValue(result)
}

export function mockSelectHasPreviousPage(result) {
    ;(selectHasPreviousPage as jest.Mock).mockReturnValue(result)
}

export function mockSelectFetchTriggerOffset(result) {
    ;(selectFetchTriggerOffset as jest.Mock).mockReturnValue(result)
}
export function mockSelectSubsequentItemsPerPage(result) {
    ;(selectSubsequentItemsPerPage as jest.Mock).mockReturnValue(result)
}

export function createMockStateForSearch(searchState: Record<any, any> = {}) {
    return {
        ...mockState,
        search: {
            ...mockState.search,
            ...searchState,
        },
    }
}
