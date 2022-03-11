import {mapDispatchToProps, mapStateToProps} from "./connect"
import { mockState } from "../../../../../__mocks__/mockStore"

describe("Components/RecentSearches - Given connect - mapStateToProps()", () => {
    describe("with the current states", () => {
        const { text: {recentSearches: {simple}} } = mockState
        const expected = {
            text: simple
        }
        it("should return text from the mockState", () => {
            expect(mapStateToProps(mockState)).toEqual(expected)
        })
    })

    it("should container required handlers", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        expect(got.clear).toBeTruthy()

        got.clear()
        expect(dispatch).toHaveBeenCalledTimes(1)
    })
})
