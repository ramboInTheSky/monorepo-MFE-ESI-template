import {mapStateToProps, mergeProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"
import {createRecentQuery} from "../../ducks/recents"
import {search} from "../../ducks/search"

jest.mock("../../ducks/recents", () => {
    return {
        createRecentQuery: jest.fn(),
    }
})
jest.mock("../../ducks/search", () => {
    return {
        search: jest.fn(),
    }
})

describe("Components/AutoComplete - Given connect - mapStateToProps()", () => {
    describe("with the current states", () => {
        const {suggestions} = mockState.autocomplete
        const {siteUrl} = mockState.request
        const {typedCharacters} = mockState.search
        const expected = {
            suggestions,
            term: typedCharacters,
            siteUrl,
        }
        it("should return suggestions,term,showPanel, and numFound from the mockState", () => {
            expect(mapStateToProps(mockState)).toEqual(expected)
        })
    })
    it("should dispatch when handleSuggestionClick is called", () => {
        const dispatch = jest.fn()
        const suggestion = "dungarees"
        const siteUrl = "http://test.com"
        const got = mergeProps({siteUrl}, {dispatch}, {})
        expect(got.handleSuggestionClick).toBeTruthy()

        got.handleSuggestionClick(suggestion)
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(createRecentQuery).toHaveBeenCalled()
        expect(createRecentQuery).toHaveBeenCalledWith(suggestion)

        expect(search).toHaveBeenCalled()
        expect(search).toHaveBeenCalledWith(siteUrl, suggestion)
    })
})
