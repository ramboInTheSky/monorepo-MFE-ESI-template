import {mapStateToProps, mergeProps} from "./connect"
import {mockState, mockText} from "../../../../../__mocks__/mockStore"
import {getAutoCompleteThunk} from "../../../../ducks/autocomplete"

jest.mock("../../../../ducks/autocomplete", () => {
    return {
        BR_UID_2: "",
        getAutoCompleteThunk: jest.fn(),
    }
})

describe("Features/enriched/AutoComplete - Given connect - mapStateToProps()", () => {
    describe("with the current states", () => {
        const {parameters, suggestions, isLoading, numFound} = mockState.autocomplete
        const cookie = mockState.request?.headers?.cookie
        const expected = {
            typedCharacters: mockState.search.typedCharacters,
            isLoading,
            parameters,
            cookie,
            suggestions,
            numFound,
            text: mockText.autoComplete
        }
        it("should return isLoading from the mockState", () => {
            expect(mapStateToProps(mockState)).toEqual(expected)
        })
    })
    it("should container required handlers", () => {
        const {parameters} = mockState.autocomplete
        const cookie = "Mock_COOKIE"
        const dispatch = jest.fn()
        const term = "dungarees"
        const got = mergeProps({parameters, cookie}, {dispatch}, {})
        expect(got.getAutoCompleteThunk).toBeTruthy()

        got.getAutoCompleteThunk(term)
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(getAutoCompleteThunk).toHaveBeenCalledWith("dungarees", "abc", "next", undefined, {}, true)
    })
})
