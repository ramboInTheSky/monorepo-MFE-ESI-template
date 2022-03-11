import formatter from "."

describe("Given a Product Title Formatter", () => {
    describe("When title is all lowercase", () => {
        it("should format correctly", () => {
            const test = formatter("my lowercase product")
            expect(test).toEqual("My Lowercase Product")
        })
    })

    describe("When title is all uppercase", () => {
        it("should format correctly", () => {
            const test = formatter("MY UPPERCASE PRODUCT")
            expect(test).toEqual("My Uppercase Product")
        })
    })
})
