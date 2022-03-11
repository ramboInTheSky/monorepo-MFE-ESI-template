import filterThroughBrands from "."

const mockBrandFilterData = [
    "brand:test1",
    "brand:test2",
    "brand:test3",
    "brand:test4",
    "brand:test5",
    "brand:test6",
    "brand:amido",
]

const mockBrandFilterDataReduced = ["brand:test1", "brand:test2"]

const mockBrandFilterDataEmpty = []

describe("Given a filterThroughBrands() function", () => {
    it("should return the correct value when a specific item is searched from the top five", () => {
        expect(filterThroughBrands("Test1", mockBrandFilterData)).toEqual({
            filteredBrandsOfTopFive: ["brand:test1"],
            restOfFilteredBrands: [],
        })
    })
    it("should return the correct value when a specific item is searched that is not in the top five", () => {
        expect(filterThroughBrands("Amido", mockBrandFilterData)).toEqual({
            filteredBrandsOfTopFive: [],
            restOfFilteredBrands: ["brand:amido"],
        })
    })

    it("should return the correct value(s) when a more generic term is searched", () => {
        expect(filterThroughBrands("Test", mockBrandFilterData)).toEqual({
            filteredBrandsOfTopFive: ["brand:test1", "brand:test2", "brand:test3", "brand:test4", "brand:test5"],
            restOfFilteredBrands: ["brand:test6"],
        })
    })

    it("should return the correct value(s) when a more generic term is searched in a shorter list", () => {
        expect(filterThroughBrands("Test", mockBrandFilterDataReduced)).toEqual({
            filteredBrandsOfTopFive: ["brand:test1", "brand:test2"],
            restOfFilteredBrands: [],
        })
    })

    it("should return the correct value(s) when a more generic term is searched in an empty list", () => {
        expect(filterThroughBrands("Test", mockBrandFilterDataEmpty)).toEqual({
            filteredBrandsOfTopFive: [],
            restOfFilteredBrands: [],
        })
    })

    it("should return the correct value when filters are undefined", () => {
        expect(filterThroughBrands("Test", (undefined as unknown) as string[])).toEqual({
            filteredBrandsOfTopFive: [],
            restOfFilteredBrands: [],
        })
    })
})
