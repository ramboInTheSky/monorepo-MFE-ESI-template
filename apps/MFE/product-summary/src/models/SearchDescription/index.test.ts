import {EnableSearchDescription} from "."

describe("Model - EnableSearchDescription: ", () => {
    const mockTestState: EnableSearchDescription = {
        Value: false,
    }
    it("should match the EnableSearchDescription", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
