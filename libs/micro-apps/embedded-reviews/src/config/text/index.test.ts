import text from "."

describe("Given the text dictionary", () => {
    it("should not have changed unexpectedly", () => {
        expect(text).toMatchSnapshot()
    })
})