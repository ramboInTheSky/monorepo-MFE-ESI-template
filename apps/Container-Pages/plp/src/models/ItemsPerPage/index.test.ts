import {ItemsPerPage} from "."

describe("Model - ItemsPerPage: ", () => {
    const mockTestState: ItemsPerPage = {
        initial: {
            mobile: 4,
            tablet: 4,
            desktop: 6,
        },
        subsequent: {
            mobile: 5,
            tablet: 5,
            desktop: 7,
        },
    }
    it("should match the ItemsPerPage", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
