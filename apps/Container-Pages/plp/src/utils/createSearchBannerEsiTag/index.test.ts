import createSearchBannerEsiTag from "."
import {SearchApiRequestTypes} from "../../config/constants"

const REACT_APP_API_BASEURL_SEARCH_BANNER = "www.test.com"

jest.mock("../../config/env", () => ({
    REACT_APP_APP_URL: "www.test.com",
    REACT_APP_SERVE_PATH_PREFIX: "",
}))

describe(`Given a ${createSearchBannerEsiTag.name}`, () => {
    describe("When supplied with search banner params and search-banner is available", () => {
        it("should return an ESI tag", () => {
            const tag = createSearchBannerEsiTag(
                REACT_APP_API_BASEURL_SEARCH_BANNER,
                true,
                `${REACT_APP_API_BASEURL_SEARCH_BANNER}/shop/women`,
                SearchApiRequestTypes.Category,
            )
            expect(tag).toBe(
                `<esi:include src="${REACT_APP_API_BASEURL_SEARCH_BANNER}/search-banners/%2Fshop%2Fwomen" onerror="continue" dca="none"/>`,
            )
        })

        it("When not using the devEsi solution it should return an ESI tag", () => {
            const tag = createSearchBannerEsiTag(
                "www.test.com",
                true,
                "www.test.com/shop/women",
                SearchApiRequestTypes.Category,
            )
            expect(tag).toBe(
                `<esi:include src="www.test.com/search-banners/%2Fshop%2Fwomen" onerror="continue" dca="none"/>`,
            )
        })
    })

    describe("When search type is category search with a query string", () => {
        it("should return ESI tag without query string", () => {
            const tag = createSearchBannerEsiTag(
                REACT_APP_API_BASEURL_SEARCH_BANNER,
                true,
                `${REACT_APP_API_BASEURL_SEARCH_BANNER}/shop/women?p=1#900`,
                SearchApiRequestTypes.Category,
            )
            expect(tag).toBe(
                `<esi:include src="${REACT_APP_API_BASEURL_SEARCH_BANNER}/search-banners/%2Fshop%2Fwomen" onerror="continue" dca="none"/>`,
            )
        })
    })

    describe("When search type is keyword search with a paging parameter", () => {
        it("should return ESI tag without page", () => {
            const tag = createSearchBannerEsiTag(
                REACT_APP_API_BASEURL_SEARCH_BANNER,
                true,
                `${REACT_APP_API_BASEURL_SEARCH_BANNER}/search?w=women&p=2#1000`,
                SearchApiRequestTypes.Keyword,
            )
            expect(tag).toBe(
                `<esi:include src="${REACT_APP_API_BASEURL_SEARCH_BANNER}/search-banners/%2Fsearch%3Fw%3Dwomen" onerror="continue" dca="none"/>`,
            )
        })
    })

    describe("When search type is keyword search with a paging parameter and other filters", () => {
        it("should return ESI tag without page", () => {
            const tag = createSearchBannerEsiTag(
                REACT_APP_API_BASEURL_SEARCH_BANNER,
                true,
                `${REACT_APP_API_BASEURL_SEARCH_BANNER}/search?w=women&p=1&af=brand:amido&isort=score#0`,
                SearchApiRequestTypes.Keyword,
            )
            expect(tag).toBe(
                `<esi:include src="${REACT_APP_API_BASEURL_SEARCH_BANNER}/search-banners/%2Fsearch%3Fw%3Dwomen%26af%3Dbrand%3Anext%26isort%3Dscore%230" onerror="continue" dca="none"/>`,
            )
        })
    })
})
