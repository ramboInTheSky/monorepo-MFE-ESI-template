import {getCategorySearchUrlSegment} from "."
import {SearchApiRequestTypes} from "../../../config/constants"

describe("Give a getCategorySearchUrlSegment", () => {
    describe("When requesting a url fragments segment", () => {
        describe("When getting the segment from the full url", () => {
            it("should return the expected empty filter segment", () => {
                expect(
                    getCategorySearchUrlSegment("/shop/gender-men-category-dresses", SearchApiRequestTypes.Category),
                ).toEqual({category: "gender-men-category-dresses", filter: "", page: ""})
            })
            it("should return the expected filter segment", () => {
                expect(
                    getCategorySearchUrlSegment(
                        "/shop/gender-men/colour-red-brand-amido",
                        SearchApiRequestTypes.Category,
                    ),
                ).toEqual({category: "gender-men", filter: "colour-red-brand-amido", page: ""})
            })
            it("should return the expected filter segment, when url contains laguage", () => {
                expect(
                    getCategorySearchUrlSegment(
                        "/shop/gender-men/colour-red-brand-amido",
                        SearchApiRequestTypes.Category,
                    ),
                ).toEqual({category: "gender-men", filter: "colour-red-brand-amido", page: ""})
            })
            it("should return the empty object, not a category search", () => {
                expect(getCategorySearchUrlSegment("/search?w=red", SearchApiRequestTypes.Keyword)).toEqual({
                    category: "",
                    filter: "",
                    page: "",
                })
            })
            it("should return the expected filter and page segment", () => {
                expect(
                    getCategorySearchUrlSegment(
                        "/shop/gender-women-productaffiliation-alldenim/category-jeans-category-shorts?p=4",
                        SearchApiRequestTypes.Category,
                    ),
                ).toEqual({
                    category: "gender-women-productaffiliation-alldenim",
                    filter: "category-jeans-category-shorts",
                    page: "?p=4",
                })
            })
            it("should return the expected filter and page segment when including price", () => {
                expect(
                    getCategorySearchUrlSegment(
                        "/shop/gender-women-productaffiliation-alldenim/category-jeans-category-shorts-category-jackets-minprice-5000-maxprice-10000-isort-score?p=4",
                        SearchApiRequestTypes.Category,
                    ),
                ).toEqual({
                    category: "gender-women-productaffiliation-alldenim",
                    filter: "category-jeans-category-shorts-category-jackets-minprice-5000-maxprice-10000-isort-score",
                    page: "?p=4",
                })
            })
        })
    })
})
