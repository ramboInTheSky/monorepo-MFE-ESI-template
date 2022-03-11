import {getSEOFiltersHTML} from "."
import data from "../../../__mocks__/searchApi.page1.json"
import normaliseDataToState from "../normaliseApiDataToState"
import {CategoryUrlSegments} from "../seo/getCategorySearchUrlSegment"

describe("Given a getSelectedFacetFilters() function", () => {
    let response
    beforeEach(() => {
        response = normaliseDataToState(data as any)
    })
    it("if a non-price filter is sent a string containing the facet is returned", () => {
        const mockUrlSegments: CategoryUrlSegments = {
            category: "gender-women-productaffiliation-coatsandjackets-0",
            filter: "",
            page: "",
        }

        expect(
            getSEOFiltersHTML(
                response,
                "https://localhost:3009/shop/gender-women-productaffiliation-coatsandjackets-0",
                mockUrlSegments,
            ),
        ).toMatchSnapshot()
    })
    it("if a filtered URL sent to collect SEO filters", () => {
        const mockUrlSegments: CategoryUrlSegments = {
            category: "gender-women-productaffiliation-alldenim",
            filter: "category-jeans",
            page: "",
        }
        expect(
            getSEOFiltersHTML(
                response,
                "https://localhost:3009/shop/gender-women-productaffiliation-alldenim/category-jeans",
                mockUrlSegments,
            ),
        ).toMatchSnapshot()
    })
    it("if a filtered URL sent to collect SEO filters and has multiple filters of the same key", () => {
        const mockUrlSegments: CategoryUrlSegments = {
            category: "gender-women-productaffiliation-alldenim",
            filter: "category-jeans",
            page: "",
        }
        expect(
            getSEOFiltersHTML(
                response,
                "https://localhost:3009/shop/gender-women-productaffiliation-alldenim/-category-jackets-category-jeans",
                mockUrlSegments,
            ),
        ).toMatchSnapshot()
    })
})
