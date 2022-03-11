import removeCurrencyAndSpaces from "."

describe("Given a removeCurrencyAndSpaces util", () => {
    describe("when called with currency symbol and spaces", () => {
        it("should remove currency and spaces", () => {
            expect(removeCurrencyAndSpaces("$36 - $90")).toEqual("36-90")
        })
        it("should should remove currency symbol and spaces", () => {
            const res = removeCurrencyAndSpaces("£ 12.34")
            expect(res).toBe("12.34")
        })
    })
    describe("when called with currency letters and hypen", () => {
        it("should should remove currency letters and hypens", () => {
            const res = removeCurrencyAndSpaces("AED63 - AED72")
            expect(res).toBe("63-72")
        })
    })
    describe("when called with only letters", () => {
        it("should should return empty string", () => {
            const res = removeCurrencyAndSpaces("AED")
            expect(res).toBe("")
        })
    })
})
