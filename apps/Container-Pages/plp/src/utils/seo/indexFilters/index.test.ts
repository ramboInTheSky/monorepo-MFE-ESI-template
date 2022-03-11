import {indexFilters} from "."

describe("Given I have filters with duplicated keys", () => {
    it("should return a value of no index", () => {
        const filter = "/category-jeans-category-shorts"
        expect(indexFilters(filter)).toEqual(false)
    })
    it("should return a value of no index with multiple duplicates on a long filter", () => {
        const filter = "/colour-blue-size-4short-size-6-size-6long-sizetype-curve"
        expect(indexFilters(filter)).toEqual(false)
    })
})
describe("Given I have filters with duplicated keys but they are gender", () => {
    it("should return a value of no index", () => {
        const filter = "/gender-men-gender-women"
        expect(indexFilters(filter)).toEqual(true)
    })
})
describe("Given I have filters with no duplicated keys", () => {
    const filter = "/category-jeans-gender-men-size-6"
    it("should return a value allowed to index", () => {
        expect(indexFilters(filter)).toEqual(true)
    })
})
describe("Given I have no filters", () => {
    const filter = ""
    it("should return a value of no index", () => {
        expect(indexFilters(filter)).toEqual(true)
    })
})
