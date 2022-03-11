import textAlignment from "."

describe("Model - textAlignment: ", () => {
    it("should match the textAlignment", () => {
        expect(textAlignment).toMatchSnapshot()
    })
})
