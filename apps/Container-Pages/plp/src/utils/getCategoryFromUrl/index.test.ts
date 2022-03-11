import getCategoryFromUrl, {getCategorySegmentFromUrl} from "."
import {SearchApiRequestTypes} from "../../config/constants"

describe("Utils: getCategoryFromUrl() - ", () => {
    describe("When the URL is a category", () => {
        it("should return the category correctly", () => {
            expect(getCategoryFromUrl("/shop/category-testVal/test", SearchApiRequestTypes.Category)).toEqual("TestVal")
        })

        it("When no trailing '/' it should return the category correctly", () => {
            expect(getCategoryFromUrl("/shop/category-testVal", SearchApiRequestTypes.Category)).toEqual("TestVal")
        })

        it("Should not return any additional search query", () => {
            expect(getCategoryFromUrl("/shop/category-testVal?w=red", SearchApiRequestTypes.Category)).toEqual(
                "TestVal",
            )
        })

        it("When url has -0, category correctly", () => {
            expect(getCategoryFromUrl("/shop/category-testVal-0", SearchApiRequestTypes.Category)).toEqual("TestVal")
        })

        it("Should return an empty string when category not specified in url", () => {
            expect(getCategoryFromUrl("/shop/men", SearchApiRequestTypes.Category)).toEqual("")
        })

        it("Should return Clearance if issale in url is true", () => {
            expect(getCategoryFromUrl("/shop/issale-true", SearchApiRequestTypes.Category)).toEqual("Clearance")
        })
    })

    describe("When the URL is not a category", () => {
        it("should return an empty string", () => {
            expect(getCategoryFromUrl("/shop/test-url?w=red", SearchApiRequestTypes.Keyword)).toEqual("")
        })
    })
})

describe("Give a getCategorySegmentFromUrl", () => {
    describe("When getting the segment from the full url", () => {
        it("should return the expected category segment", () => {
            expect(
                getCategorySegmentFromUrl(
                    "http://www.test.com/shop/gender-men",
                    "http://www.test.com",
                    SearchApiRequestTypes.Category,
                ),
            ).toEqual("gender-men")
        })
        it("should return the expected category segment, when url contains laguage", () => {
            expect(
                getCategorySegmentFromUrl(
                    "http://www.test.com/en/shop/gender-men",
                    "http://www.test.com/en",
                    SearchApiRequestTypes.Category,
                ),
            ).toEqual("gender-men")
        })
        it("should return the expected category segment, when url contains query params", () => {
            expect(
                getCategorySegmentFromUrl(
                    "http://www.test.com/en/shop/gender-men/colour-red",
                    "http://www.test.com/en",
                    SearchApiRequestTypes.Category,
                ),
            ).toEqual("gender-men")
        })
        it("should return the expected category segment, not a category search", () => {
            expect(
                getCategorySegmentFromUrl(
                    "http://www.test.com/en/search?w=red",
                    "http://www.test.com/en",
                    SearchApiRequestTypes.Keyword,
                ),
            ).toEqual("")
        })
    })
})
