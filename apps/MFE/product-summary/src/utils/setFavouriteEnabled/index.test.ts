import setFavouriteEnabled from "."

describe("given a setFavouriteEnabled util", () => {
    it("should return true if productType is `product` and isPersonalised is true", () => {
        const res = setFavouriteEnabled("product", true)
        expect(res).toBe(true)
    })

    it("should return true if productType is `product` and isPersonalised is false", () => {
        const res = setFavouriteEnabled("product", false)
        expect(res).toBe(false)
    })

    it("should return false if productType is `suit` and isPersonalised is true", () => {
        const res = setFavouriteEnabled("suit", true)
        expect(res).toBe(false)
    })

    it("should return false if productType is `suit` and isPersonalised is false", () => {
        const res = setFavouriteEnabled("suit", false)
        expect(res).toBe(false)
    })
})
