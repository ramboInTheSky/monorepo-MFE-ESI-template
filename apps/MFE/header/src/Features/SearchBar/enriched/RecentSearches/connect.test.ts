import {mapDispatchToProps, mapStateToProps} from "./connect"
import { mockState } from "../../../../../__mocks__/mockStore"

describe("Components/RecentSearches - Given connect - mapStateToProps()", () => {
    it("should return required state from mockState", () => {
        const {text: {recentSearches: {enriched}}} = mockState
        expect(mapStateToProps(mockState)).toEqual({
            text: enriched,
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
