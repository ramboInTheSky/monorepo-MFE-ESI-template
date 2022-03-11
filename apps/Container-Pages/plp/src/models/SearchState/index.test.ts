import {SearchState} from "."
import {mockState} from "../../../__mocks__/mockStore"

describe("Model - SearchState: ", () => {
    const mockTestState: SearchState = mockState.search
    it("should match the SearchState", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
