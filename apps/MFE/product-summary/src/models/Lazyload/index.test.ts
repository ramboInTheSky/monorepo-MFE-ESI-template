import {LazyloadState} from "."

describe("Model - LazyloadState: ", () => {
    const mockTestState: LazyloadState = {
        colourchips: true,
        productImages: true,
        fitIcons: false
    }
    it("should match the LazyloadState", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
