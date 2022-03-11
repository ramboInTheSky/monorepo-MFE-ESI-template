import getGenderFromUrl from "."
import {SearchApiRequestTypes} from "../../config/constants"

describe("Utils: getGenderFromUrl() - ", () => {
    describe("When I have completed a category search with gender value", () => {
        it("should return single gender correctly", () => {
            expect(getGenderFromUrl("/shop/gender-women-category-dresses-0", SearchApiRequestTypes.Category)).toEqual([
                "women",
            ])
        })
    })

    describe("When I have completed a category search with multiple gender value", () => {
        it("should return multiple genders correctly", () => {
            expect(
                getGenderFromUrl("/shop/gender-women-gender-boys-category-dresses-0", SearchApiRequestTypes.Category),
            ).toEqual(["women", "boys"])
        })
    })

    describe("When the URL is not a gender", () => {
        it("should return null", () => {
            expect(getGenderFromUrl("/shop/test-url?w=red", SearchApiRequestTypes.Keyword)).toEqual(null)
        })
    })

    it("When trailing '/' it should return the gender correctly", () => {
        expect(
            getGenderFromUrl("/shop/gender-women-gender-boys-category-dresses-0/test", SearchApiRequestTypes.Category),
        ).toEqual(["women", "boys"])
    })

    it("When no gender it should return null", () => {
        expect(getGenderFromUrl("/shop/category-dresses", SearchApiRequestTypes.Category)).toEqual(null)
    })

    it("When gender value is empty it should return null", () => {
        expect(getGenderFromUrl("/shop/gender-", SearchApiRequestTypes.Category)).toEqual(null)
    })
})
