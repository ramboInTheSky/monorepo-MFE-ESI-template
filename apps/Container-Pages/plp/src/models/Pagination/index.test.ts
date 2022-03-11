import {Pagination} from "."

describe("Model - Pagination: ", () => {
    it("should match the Pagination", () => {
        expect(new Pagination()).toMatchSnapshot()
    })
})
