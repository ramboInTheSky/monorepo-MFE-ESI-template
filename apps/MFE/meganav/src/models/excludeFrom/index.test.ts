import {ExcludeFrom} from "."

describe("Model: exclude from", () => {
    const testExcludeFrom: ExcludeFrom = ["NarrowView", "WideView"]
    it("should match the ExcludeFrom", () => {
        expect(testExcludeFrom).toMatchSnapshot()
    })
})
