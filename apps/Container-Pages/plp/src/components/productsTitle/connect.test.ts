import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import {SearchApiRequestTypes} from "../../config/constants"
import {selectSelectedFilterNames} from "../../utils/selectSelectedFilterNames"

jest.mock("../../utils/selectSelectedFilterNames")

function mockScenario({selectedFilterNames = ["foo"]} = {}) {
    ;(selectSelectedFilterNames as jest.Mock).mockReturnValue(selectedFilterNames)
}

describe("Given connect - mapStateToProps()", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    describe("By default", () => {
        beforeEach(() => {
            mockScenario({selectedFilterNames: []})
        })
        it("should project state and only return items", () => {
            const state = {
                ...mockState,
                search: {...mockState.search, title: "Dresses", totalResults: 120, autoCorrectQuery: null},
                request: {...mockState.request, type: SearchApiRequestTypes.Category, searchTerm: "Foo"},
            }
            expect(mapStateToProps(state)).toEqual({
                type: SearchApiRequestTypes.Category,
                title: "Dresses",
                relaxedQuery: "",
                totalResults: 120,
                originalSearchTerm: "Foo",
                isAutocorrected: false,
                hasSelectedFilters: false,
                searchBannerHtml: null,
                overrideHeading: false,
                text: mockText
            })
        })
    })

    describe("When the search has been auto corrected", () => {
        beforeEach(() => {
            mockScenario({selectedFilterNames: []})
        })
        it("should flag as auto corrected in props", () => {
            const state = {
                ...mockState,
                search: {...mockState.search, autoCorrectQuery: "foo"},
            }
            expect(mapStateToProps(state)).toEqual(
                expect.objectContaining({
                    isAutocorrected: true,
                }),
            )
        })
    })

    describe("WHen the search includes filters", () => {
        beforeEach(() => {
            mockScenario({selectedFilterNames: ["foo", "bar"]})
        })
        it("should flag as having filters in props", () => {
            expect(mapStateToProps(mockState)).toEqual(
                expect.objectContaining({
                    hasSelectedFilters: true,
                }),
            )
        })
    })
})
