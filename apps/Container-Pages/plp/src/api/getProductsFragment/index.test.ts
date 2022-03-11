import Logger from "@monorepo/core-logger"
import axios from "../../utils/axios"
import ProductsApi from "../../config/api/products"
import {getProductsFragment, buildParams} from "."
import {SearchApiRequestTypes, TOKEN_CANCELLATION_FLAG} from "../../config/constants"
import {ExternalSearchApiResponse} from "../../models/searchApi"

import {IS_BROWSER} from "../../utils/window"

const productsApi = ProductsApi("getProductsFragment")

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("../../utils/httpUrlTrimmer", () => ({
    __esModule: true,
    httpUrlTrimmer: jest.fn(() => "test.com"),
    urlSanitiser: jest.fn(url => url),
}))
jest.mock("../../utils/window", () => ({
    IS_BROWSER: jest.fn(),
}))
jest.mock("../../utils/axios", () => ({
    __esModule: true,
    default: jest.fn(),
}))

function mockSuccessfulAxiosResponse(resolvedValue: any = []) {
    ;((axios as unknown) as jest.Mock).mockResolvedValue({data: resolvedValue})
}

function mockFailingAxiosResponse(rejectedValue) {
    ;((axios as unknown) as jest.Mock).mockRejectedValue(rejectedValue)
}

describe("Given the `getProductsFragment` on server-side", () => {
    const url = "test.com"
    const baseUrl = "http://test.com"
    const headers = {foo: "bar"}
    const searchTerm = "foo"
    const type = SearchApiRequestTypes.Category
    const start = 5
    const pageSize = 30
    const fields: (keyof ExternalSearchApiResponse)[] = ["items", "filters"]
    const bloomreachCookiesInitialVal = {
        brUid2: "testBRUID2",
        brMtSearch: "testBRMTSeach",
    }
    const bloomreachPersonalizationEnabled = true
    describe("When the request succeeds", () => {
        beforeEach(() => {
            jest.clearAllMocks()
            mockSuccessfulAxiosResponse([1, 2, 3])
        })

        it("should call axios with the expected parameters if the url does not contain HTTP/S", async () => {
            await getProductsFragment({
                headers,
                baseUrl,
                url,
                searchTerm,
                type,
                start,
                pageSize,
                fields,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            })
            expect(axios).toHaveBeenCalledWith({
                method: productsApi.method,
                url: baseUrl + productsApi.localEndpoint(),
                headers,
                params: buildParams({
                    url,
                    searchTerm,
                    type,
                    start,
                    pageSize,
                    fields,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                }),
            })
        })

        it("should call axios with the expected parameters if the url contains HTTP/S", async () => {
            await getProductsFragment({
                headers,
                baseUrl,
                url: "https://test.com",
                searchTerm,
                type,
                start,
                pageSize,
                fields,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            })
            expect(axios).toHaveBeenCalledWith({
                method: productsApi.method,
                url: baseUrl + productsApi.localEndpoint(),
                headers,
                params: buildParams({
                    url: "test.com",
                    searchTerm,
                    type,
                    start,
                    pageSize,
                    fields,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                }),
            })
        })

        it("should return the data returned by axios", async () => {
            const result = await getProductsFragment({
                headers,
                baseUrl,
                url,
                searchTerm,
                type,
                start,
                pageSize,
                fields,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            })
            expect(result).toEqual([1, 2, 3])
        })
    })

    describe("When the request fails", () => {
        const error = new Error("Oops...")

        beforeEach(() => {
            jest.clearAllMocks()
            mockFailingAxiosResponse(error)
        })

        it("should log the error", async () => {
            try {
                await getProductsFragment({
                    headers,
                    baseUrl,
                    url,
                    searchTerm,
                    type,
                    start,
                    pageSize,
                    fields,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                })
            } catch (e) {} // eslint-disable-line no-empty

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(Logger.error).toHaveBeenCalledWith(error, "getProductFragments")
        })

        it("should not log error when error is due to token cancellation", async () => {
            mockFailingAxiosResponse(new Error(TOKEN_CANCELLATION_FLAG))

            try {
                await getProductsFragment({
                    headers,
                    baseUrl,
                    url,
                    searchTerm,
                    type,
                    start,
                    pageSize,
                    fields,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                })
            } catch (e) {} // eslint-disable-line no-empty

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(Logger.error).not.toHaveBeenCalled()
        })

        it("should rethrow the error", async () => {
            const fn = () =>
                getProductsFragment({
                    headers,
                    baseUrl,
                    url,
                    searchTerm,
                    type,
                    start,
                    pageSize,
                    fields,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                })
            await expect(fn()).rejects.toThrow(error)
        })
    })

    describe("buildParams", () => {
        beforeEach(() => {
            ;(IS_BROWSER as any).mockImplementation(() => false)
            jest.clearAllMocks()
        })

        it("should call correctly", () => {
            const result = buildParams({
                url,
                searchTerm,
                type,
                start,
                pageSize,
                fields,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            })

            expect(result.contextid).toBe("testBRUID2")
            expect(result.segment).toBe("testBRMTSeach")
            expect(result.start).toBe(5)
            expect(result.pagesize).toBe(30)
            expect(result.searchTerm).toBe("foo")
            expect(result.type).toBe("Category")
            expect(result.criteria).toBe("test.com")
            expect(result.criteria).not.toBe("http://test.com")
            expect(result.fields).toBe("items,filters")
        })
    })
})

describe("Given the `getProductsFragment` on client-side", () => {
    const url = "test.com"
    const searchTerm = "foo"
    const type = SearchApiRequestTypes.Category
    const start = 5
    const pageSize = 30
    const fields: (keyof ExternalSearchApiResponse)[] = ["items", "filters"]
    const bloomreachCookiesInitialVal = {
        brUid2: "testBRUID2",
        brMtSearch: "testBRMTSeach",
    }
    const bloomreachPersonalizationEnabled = true
    describe("buildParams", () => {
        beforeEach(() => {
            ;(IS_BROWSER as any).mockImplementation(() => true)
            jest.clearAllMocks()
        })

        it("should call correctly if bloomreachPersonalizationEnabled is set to true", () => {
            const result = buildParams({url, searchTerm, type, start, pageSize, fields, bloomreachCookiesInitialVal, bloomreachPersonalizationEnabled})

            expect(result.contextid).toBe("uid%3D9624001141133%3Av%3D13.0%3Ats%3D1578565383488%3Ahc%3D138")
            expect(result.segment).toBe("")
            expect(result.start).toBe(5)
            expect(result.pagesize).toBe(30)
            expect(result.searchTerm).toBe("foo")
            expect(result.type).toBe("Category")
            expect(result.criteria).toBe("test.com")
            expect(result.criteria).not.toBe("http://test.com")
            expect(result.fields).toBe("items,filters")
        })
        it("should call correctly if bloomreachPersonalizationEnabled is set to false", () => {
            const result = buildParams({url, searchTerm, type, start, pageSize, fields, bloomreachCookiesInitialVal, bloomreachPersonalizationEnabled: false})

            expect(result.contextid).toBe("TODO CONTEXT ID")
            expect(result.start).toBe(5)
            expect(result.pagesize).toBe(30)
            expect(result.searchTerm).toBe("foo")
            expect(result.type).toBe("Category")
            expect(result.criteria).toBe("test.com")
            expect(result.criteria).not.toBe("http://test.com")
            expect(result.fields).toBe("items,filters")
        })
    })
})
