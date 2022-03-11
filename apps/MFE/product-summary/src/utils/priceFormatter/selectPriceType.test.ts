import {selectPriceType} from "./selectPriceType"
 
describe("selectPriceType", () => {
    describe("when called with sale price and normal price", () => {
        it("Should return the sale price", () => {   
            const salePrice = "16.00"
            const normalPrice = "45.00"

            expect(selectPriceType(normalPrice, salePrice)).toEqual(salePrice)
        }) 
    })

    describe("when called with normal price only", () => {
        it("Should return the sale price", () => {   
            const normalPrice = "26.00"

            expect(selectPriceType(normalPrice)).toEqual(normalPrice)
        }) 
    })
})