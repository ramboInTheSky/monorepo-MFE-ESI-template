/* eslint-disable @typescript-eslint/camelcase */
import * as WindowUtils from "../../../../utils/window"
import {handleCategoryPageLoad} from "."
import {publishTrackEvent} from "../.."
import {GTM_SEARCH_RESULTS} from "../../../../config/constants"

function mockScenario(withNoStorageValue = false, localstorageData = {path: "", dept: "test"}) {
    const mock = jest.spyOn(WindowUtils, "getWindow").mockReturnValue({
        localStorage: {
            getItem: jest.fn(() => (withNoStorageValue ? null : JSON.stringify(localstorageData))),
        },
    } as any)
    return {
        mockRestore: () => mock.mockRestore(),
    }
}

jest.mock("../../../../events/trackEvent", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    publishTrackEvent: jest.fn(),
}))

describe("Given a handleSearchPageLoad", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("When all parameters are supplied and localstorage dept is empty", () => {
        it("should push the parameters to dataLayer", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "red",
                    selected_sort: "price",
                    selected_filter: "gender: women productaffiliation: shirtsandblouses",
                    total_number_of_items: "40963",
                    current_page_number: "1",
                    department: "female",
                    category: "womens",
                },
            }

            const {mockRestore} = mockScenario(false, {path: "", dept: ""})

            handleCategoryPageLoad({
                category: "womens",
                selectedFilters: "gender: women productaffiliation: shirtsandblouses",
                searchKeyword: "red",
                selectedSort: "price",
                totalResults: 40963,
                currentPage: 1,
                gender: ["female"],
            })
            mockRestore()
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
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
                    department: "test",
                    category: "womens",
                },
            }

            const {mockRestore} = mockScenario()

            handleCategoryPageLoad({
                category: "womens",
                selectedFilters: "gender: women productaffiliation: shirtsandblouses",
                searchKeyword: "red",
                selectedSort: "price",
                totalResults: 40963,
                currentPage: 1,
                gender: ["female"],
            })
            mockRestore()
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })

    describe("When not all parameters are supplied", () => {
        it("should push the parameters with default values to dataLayer", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "*",
                    selected_sort: "score",
                    selected_filter: "",
                    total_number_of_items: "",
                    current_page_number: "",
                    department: "test",
                    category: "womens",
                },
            }

            const {mockRestore} = mockScenario()

            handleCategoryPageLoad({
                category: "womens",
                selectedFilters: "",
                searchKeyword: "",
                selectedSort: "",
                totalResults: undefined,
                currentPage: undefined,
                gender: ["female"],
            })
            mockRestore()
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })

    describe("When localStorage does not contain for department", () => {
        it("should push the parameters with default values to dataLayer", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "*",
                    selected_sort: "score",
                    selected_filter: "",
                    total_number_of_items: "",
                    current_page_number: "",
                    department: "female",
                    category: "womens",
                },
            }

            const {mockRestore} = mockScenario(true)

            handleCategoryPageLoad({
                category: "womens",
                selectedFilters: "",
                searchKeyword: "",
                selectedSort: "score",
                totalResults: undefined,
                currentPage: undefined,
                gender: ["female"],
            })
            mockRestore()
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })

    describe("When localStorage does not contain for department and gender isn't returned from state", () => {
        it("should push the parameters with default values to dataLayer", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "*",
                    selected_sort: "score",
                    selected_filter: "",
                    total_number_of_items: "",
                    current_page_number: "",
                    department: "",
                    category: "womens",
                },
            }

            const {mockRestore} = mockScenario(true)

            handleCategoryPageLoad({
                category: "womens",
                selectedFilters: "",
                searchKeyword: "",
                selectedSort: "score",
                totalResults: undefined,
                currentPage: undefined,
            })
            mockRestore()
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })

    describe("When all parameters are supplied and selected_filter parameter is url encoded", () => {
        it("should url decode the selected_filter parameter", () => {
            const expectedEventName = GTM_SEARCH_RESULTS
            const expectedEventData = {
                searchResults: {
                    search_keyword: "red",
                    selected_sort: "price rev",
                    selected_filter: "gender: women productaffiliation: shirtsandblouses",
                    total_number_of_items: "40963",
                    current_page_number: "1",
                    department: "female",
                    category: "womens",
                },
            }

            const {mockRestore} = mockScenario(false, {path: "", dept: ""})

            handleCategoryPageLoad({
                category: "womens",
                selectedFilters: "gender: women productaffiliation: shirtsandblouses",
                searchKeyword: "red",
                selectedSort: "price%20rev",
                totalResults: 40963,
                currentPage: 1,
                gender: ["female"],
            })
            mockRestore()
            expect(publishTrackEvent).toHaveBeenCalledWith(expectedEventName, expectedEventData)
        })
    })
})
