import isNumeric from "."

describe("isNumeric", () => {
    it("returns true when given number as string", () => {
        const numberString = "44"
        const result = isNumeric(numberString)

        expect(result).toBe(true)
    })

    it("returns false when given non-number string", () => {
        const nonNumber = "Amido"
        const result = isNumeric(nonNumber)

        expect(result).toBe(false)
    })

    it("returns true when given number type", () => {
        const number = 16
        const result = isNumeric(number)

        expect(result).toBe(true)
    })
})
