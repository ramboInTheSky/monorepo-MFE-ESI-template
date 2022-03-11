import {alphabeticaliseCategoryFilters} from "."

describe("Give a alphabeticaliseCateogryFilters", () => {
    it("should return the same string passed in", () => {
        expect(alphabeticaliseCategoryFilters("brands-amido-colour-red")).toEqual({
            sortedFilters: "brands-amido-colour-red",
            isort: "",
            price: "",
        })
    })
    it("should return the same string passed in price correctly ordered ", () => {
        expect(alphabeticaliseCategoryFilters("brands-amido-colour-red")).toEqual({
            sortedFilters: "brands-amido-colour-red",
            isort: "",
            price: "",
        })
    })
    it("should return the reorder the string passed in but keep price at the end ", () => {
        expect(
            alphabeticaliseCategoryFilters(
                "category-jeans-category-shorts-category-jackets-minprice-5000-maxprice-10000",
            ),
        ).toEqual({
            sortedFilters: "category-jackets-category-jeans-category-shorts",
            isort: "",
            price: "minprice-5000-maxprice-10000",
        })
    })
    it("should return with isort-score element and reordered filter", () => {
        expect(alphabeticaliseCategoryFilters("colour-red-brands-amido-isort-score")).toEqual({
            sortedFilters: "brands-amido-colour-red",
            isort: "isort-score",
            price: "",
        })
    })
    it("should return string without isort-price (if no filters but sort applied", () => {
        expect(alphabeticaliseCategoryFilters("isort-price")).toEqual({
            sortedFilters: "",
            isort: "isort-price",
            price: "",
        })
    })
    it("should return string without isort-price (if no filters but sort applied) when sort is reversed", () => {
        expect(alphabeticaliseCategoryFilters("isort-price%20rev")).toEqual({
            sortedFilters: "",
            isort: "isort-price%20rev",
            price: "",
        })
    })
})
