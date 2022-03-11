import isMadeToMeasure from "."

describe("given a isMadeToMeasure util", () => {
    it("should return true if productType is `product`", () => {
        const res = isMadeToMeasure("product")
        expect(res).toBe(false)
    })
    
    it("should return false if productType is `suit`", () => {
        const res = isMadeToMeasure("madeToMeasure")
        expect(res).toBe(true)
    })
})