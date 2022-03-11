import logger from "@monorepo/core-logger"
import getFacetSearchResults from "."
import {SearchApiRequestTypes} from "../../config/constants"

const error = new Error("Oops...")
jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("../../api/getProductsFragmentByPage", () => ({
    getProductsFragmentByPage: jest.fn(params => {
        if (params.url === "ERROR") {
            throw new Error("Oops...")
        }
        return {} as any
    }),
}))
jest.mock("../../utils/productsFragment", () => ({
    mapProductsFragmentToItems: jest.fn(() => ({
        searchStateData: {
            totalResults: 123,
            facets: {},
            filtersSort: [],
            filters: {},
        },
    })),
}))

describe("Given a getFacetSearchResults", () => {
    const lazyloadItemIndexFrom = 3
    const bloomreachCookiesInitialVal = {
        brUid2: "testBRUID2",
        brMtSearch: "testBRMTSeach",
    }
    const bloomreachPersonalizationEnabled = true

    describe("When the api returns a response", () => {
        let response
        beforeAll(async () => {
            response = await getFacetSearchResults(
                "www.test.com",
                "www.test.com",
                {},
                null,
                SearchApiRequestTypes.Category,
                lazyloadItemIndexFrom,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            )
        })

        it("should return the correct totalResults", () => {
            expect(response).toEqual({totalResults: 123, facets: {}, filtersSort: [], filters: {}})
        })
    })

    describe("Given a getFacetSearchResults, when the API errors", () => {
        const {location} = window

        beforeEach((): void => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            delete window.location
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            window.location = {href: jest.fn()}
        })

        afterEach(() => {
            window.location = location
        })

        it("should log the error", async () => {
            try {
                await getFacetSearchResults(
                    "ERROR",
                    "www.test.com",
                    {},
                    null,
                    SearchApiRequestTypes.Category,
                    lazyloadItemIndexFrom,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                )
            } catch (e) {} // eslint-disable-line

            // eslint-disable-next-line
            expect(logger.error).toHaveBeenCalledWith(error, "search-for-selected-assets-error")
        })

        it("should rethrow the error", () => {
            const promise = getFacetSearchResults(
                "ERROR",
                "www.test.com",
                {},
                null,
                SearchApiRequestTypes.Category,
                lazyloadItemIndexFrom,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            )
            // eslint-disable-next-line
            expect(promise).rejects.toEqual(error)
        })

        it("should have called window.location.href", async () => {
            try {
                await getFacetSearchResults(
                    "ERROR",
                    "www.test.com",
                    {},
                    null,
                    SearchApiRequestTypes.Category,
                    lazyloadItemIndexFrom,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                )
            } catch (e) {} // eslint-disable-line
            expect(window.location.href).toEqual("www.test.com/error")
        })
    })
})
