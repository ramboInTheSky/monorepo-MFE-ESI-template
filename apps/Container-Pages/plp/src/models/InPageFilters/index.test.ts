import {InPageFilters} from "."

describe("Model - InPageFilters: ", () => {
    const mockTestState: InPageFilters = {
        enabled: {
            breakpoint: "sm",
        },
        disabled: {
            breakpoint: "sm",
        },
    }
    it("should match the InPageFilters", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
