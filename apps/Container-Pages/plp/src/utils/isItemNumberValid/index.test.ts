import isItemNumberValid from "."

describe("isItemNumberValid", () => {
    it("returns false when 7 digit number (1234567)", () => {
        const itemNumber = "1234567"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(false)
    })

    it("returns false when 9 digit number (123456789)", () => {
        const itemNumber = "123456789"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(false)
    })

    it("returns false when a random string is provided (amido)", () => {
        const itemNumber = "amido"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(false)
    })

    it("returns false when a random 6 letter string is provided (jackets)", () => {
        const itemNumber = "jackets"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(false)
    })

    it("returns true when a valid item number (333333)", () => {
        const itemNumber = "333333"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(true)
    })

    it("returns true when a valid item number with L in front (L33333)", () => {
        const itemNumber = "L33333"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(true)
    })

    it("returns true when a valid item number with M in front (M33333)", () => {
        const itemNumber = "M33333"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(true)
    })

    it("returns false when an invalid item number with M in front (M3333355)", () => {
        const itemNumber = "M3333355"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(false)
    })

    it("returns true when a valid item number with lowercase l in front (l33333)", () => {
        const itemNumber = "l33333"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(true)
    })

    it("returns true when a valid item number with lowercase m in front (m33333)", () => {
        const itemNumber = "m33333"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(true)
    })

    it("returns false when a valid item number with a / in front (/333333)", () => {
        const itemNumber = "/333333"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(false)
    })

    it("returns true when a valid item number with a - in between (123-456)", () => {
        const itemNumber = "123-456"
        const result = isItemNumberValid(itemNumber)

        expect(result).toBe(true)
    })
})
