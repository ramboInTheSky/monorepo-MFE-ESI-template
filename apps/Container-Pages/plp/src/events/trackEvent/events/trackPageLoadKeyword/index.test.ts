/* eslint-disable @typescript-eslint/camelcase */
import {handleSearchPageLoad} from "."
import {publishTrackEvent} from "../.."
import {GTM_SEARCH_RESULTS} from "../../../../config/constants"

jest.mock("../../../../events/trackEvent", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    publishTrackEvent: jest.fn(),
}))

describe("Given a handleSearchPageLoad", () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })
    describe("When all parameters are supplied", () => {
        it("should push the parameters to dataLayer", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "red",
                    selected_sort: "price",
                    selected_filter: "gender: women productaffiliation: shirtsandblouses",
                    total_number_of_items: "40963",
                    current_page_number: "1",
                    department: "search",
                    category: "red",
                    br_search_term: "red",
                },
            }

            handleSearchPageLoad({
                searchKeyword: "red",
                selectedFilters: "gender: women productaffiliation: shirtsandblouses",
                selectedSort: "price",
                totalResults: 40963,
                currentPage: 1,
            })
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })

    describe("When not all parameters are supplied", () => {
        it("should push the parameters with default values to dataLayer", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "red",
                    selected_sort: "score",
                    selected_filter: "",
                    total_number_of_items: "",
                    current_page_number: "",
                    department: "search",
                    category: "red",
                    br_search_term: "red",
                },
            }

            handleSearchPageLoad({
                searchKeyword: "red",
                selectedFilters: "",
                selectedSort: "",
                totalResults: undefined,
                currentPage: undefined,
            })
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })

    describe("When optional parameters are supplied", () => {
        it("should push the parameters to dataLayer", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "rd",
                    selected_sort: "score",
                    selected_filter: "gender: women productaffiliation: shirtsandblouses",
                    total_number_of_items: "40963",
                    current_page_number: "1",
                    br_search_term: "rd",
                    department: "search",
                    category: "rd",
                    refined_search_keyword: "red",
                },
            }

            handleSearchPageLoad({
                searchKeyword: "rd",
                selectedFilters: "gender: women productaffiliation: shirtsandblouses",
                selectedSort: "score",
                totalResults: 40963,
                currentPage: 1,
                autoCorrectQuery: "red",
            })
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })

    describe("When all parameters are supplied2", () => {
        it("should push the parameters to dataLayer", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "red",
                    selected_sort: "price rev",
                    selected_filter: "gender: women productaffiliation: shirtsandblouses",
                    total_number_of_items: "40963",
                    current_page_number: "1",
                    department: "search",
                    category: "red",
                    br_search_term: "red",
                },
            }

            handleSearchPageLoad({
                searchKeyword: "red",
                selectedFilters: "gender: women productaffiliation: shirtsandblouses",
                selectedSort: "price%20rev",
                totalResults: 40963,
                currentPage: 1,
            })
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })
})
