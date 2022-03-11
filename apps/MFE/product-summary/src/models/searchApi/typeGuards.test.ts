import {isApiSuitSummaryData, isApiSofaSummaryData, isSuitSummaryData} from "./typeGuards"

describe("Given a isApiSuitSummaryData", () => {
    it("When type is suit, it should return true", () => {
        expect(isApiSuitSummaryData({type: "suit"} as any)).toEqual(true)
    })

    it("When type is product, it should return false", () => {
        expect(isApiSuitSummaryData({type: "product"} as any)).toEqual(false)
    })

    it("When type is not set, it should return false", () => {
        expect(isApiSuitSummaryData({} as any)).toEqual(false)
    })
})

describe("Given a isApiSofaSummaryData", () => {
    it("When type is sofa, it should return true", () => {
        expect(isApiSofaSummaryData({type: "sofa"} as any)).toEqual(true)
    })

    it("When type is product, it should return false", () => {
        expect(isApiSofaSummaryData({type: "product"} as any)).toEqual(false)
    })

    it("When type is not set, it should return false", () => {
        expect(isApiSofaSummaryData({} as any)).toEqual(false)
    })
})

describe("Given a isSuitSummaryData", () => {
    it("When type is suit, it should return true", () => {
        expect(isSuitSummaryData({type: "suit"} as any)).toEqual(true)
    })

    it("When type is product, it should return false", () => {
        expect(isSuitSummaryData({type: "product"} as any)).toEqual(false)
    })

    it("When type is not set, it should return false", () => {
        expect(isSuitSummaryData({} as any)).toEqual(false)
    })
})
