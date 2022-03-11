import {State} from "."
import {mockState} from "../../../__mocks__/mockStore"

describe("Model - State: ", () => {
    const mockTestState: State = mockState
    it("should match the State", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
