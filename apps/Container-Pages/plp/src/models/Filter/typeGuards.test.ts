import {isApiFilterFacet, isApiPriceFilter, isFilterFacet, isPriceFilter} from "./typeGuards"

describe("Given a isApiPriceFilter", () => {
    it("When type is price, it should return true", () => {
        expect(isApiPriceFilter({type: "price"} as any)).toEqual(true)
    })

    it("When type is filter, it should return false", () => {
        expect(isApiPriceFilter({type: "filter"} as any)).toEqual(false)
    })
})

describe("Given a isApiFilterFacet", () => {
    it("When type is price, it should return false", () => {
        expect(isApiFilterFacet({type: "price"} as any)).toEqual(false)
    })

    it("When type is filter, it should return true", () => {
        expect(isApiFilterFacet({type: "filter"} as any)).toEqual(true)
    })
})

describe("Given a isPriceFilter", () => {
    it("When type is price, it should return true", () => {
        expect(isPriceFilter({type: "price"} as any)).toEqual(true)
    })

    it("When type is filter, it should return false", () => {
        expect(isPriceFilter({type: "filter"} as any)).toEqual(false)
    })
})

describe("Given a isFilterFacet", () => {
    it("When type is price, it should return false", () => {
        expect(isFilterFacet({type: "price"} as any)).toEqual(false)
    })

    it("When type is filter, it should return true", () => {
        expect(isFilterFacet({type: "filter"} as any)).toEqual(true)
    })
})
