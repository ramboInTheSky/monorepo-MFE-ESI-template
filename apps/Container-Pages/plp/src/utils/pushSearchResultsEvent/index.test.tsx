import {mockState} from "../../../__mocks__/mockStore"
import {pushSearchResultsEvent} from "."
import {handleCategoryPageLoad} from "../../events/trackEvent/events/trackPageLoadCategory"
import {handleSearchPageLoad} from "../../events/trackEvent/events/trackPageLoadKeyword"
import {SearchApiRequestTypes} from "../../config/constants"

jest.mock("../../events/trackEvent/events/trackPageLoadCategory", () => ({
    __esModule: true,
    handleCategoryPageLoad: jest.fn(),
}))
jest.mock("../../events/trackEvent/events/trackPageLoadKeyword", () => ({
    __esModule: true,
    handleSearchPageLoad: jest.fn(),
}))

const mockStore = {
    ...mockState,
    search: {
        ...mockState.search,
        facets: {
            ...mockState.search.facets,
            "option-test": {n: "opt1", c: 1, v: "opt-test", incompatibleWith: [], d: false, s: true},
            "option-test-2": {n: "opt1", c: 1, v: "opt-test2", incompatibleWith: [], d: false, s: true},
        },
    },
}

const mockKeywordStore = {
    ...mockStore,
    request: {
        ...mockStore.request,
        type: SearchApiRequestTypes.Keyword,
    },
}

const mockScenarioNoState = {
    ...mockState,
    search: {
        ...mockState.search,
        items: [],
        filters: [],
    },
}

describe("Given a pushSearchResultsEvent()", () => {
    it("should not call handle load event if the state is empty", () => {
        pushSearchResultsEvent(mockScenarioNoState as any)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleCategoryPageLoad).not.toHaveBeenCalled()
        expect(handleSearchPageLoad).not.toHaveBeenCalled()
    })

    it("should trigger 'handleCategoryPageLoad' event with the right parameters", () => {
        pushSearchResultsEvent(mockStore as any)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleCategoryPageLoad).toHaveBeenCalledWith({
            autoCorrectQuery: null,
            category: null,
            currentPage: 6,
            gender: null,
            searchKeyword: null,
            selectedFilters: "opt-test opt-test2",
            selectedSort: "score",
            totalResults: 1234,
            searchCategory: {id: "", name: ""},
            type: "Category",
        })
    })

    it("should trigger 'handleSearchPageLoad' event with the right parameters", () => {
        pushSearchResultsEvent(mockKeywordStore as any)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(handleSearchPageLoad).toHaveBeenCalledWith({
            autoCorrectQuery: null,
            category: null,
            currentPage: 6,
            gender: null,
            searchKeyword: null,
            selectedFilters: "opt-test opt-test2",
            selectedSort: "score",
            totalResults: 1234,
            searchCategory: {id: "", name: ""},
            type: "Keyword",
        })
    })
})
