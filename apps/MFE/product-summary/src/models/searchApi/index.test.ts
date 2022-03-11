import {ProductSummaryApiContract, ColourwayApiContract} from "./product"

describe("Model - ProductSummary: ", () => {
    it("should match the expected ProductSummary model structure", () => {
        const testResponse = new ProductSummaryApiContract()
        testResponse.currencyCode = "GBP"
        testResponse.itemNumber = "1234"
        testResponse.title = "title"
        const testColourway = new ColourwayApiContract()
        testColourway.itemNumber = "1111"
        testColourway.itemPrice = {
            maxPrice: 10,
            minPrice: 10,
            saleMaxPrice: 1,
            saleMinPrice: 2,
            wasMaxPrice: 10,
            wasMinPrice: 10,
        }
        testColourway.colour = "1111"
        testColourway.fits = ["Regular"]
        testColourway.url = "www.test.com"
        testColourway.title = "white"
        testResponse.colourways = [testColourway]
        expect(testResponse).toMatchSnapshot()
    })
})
