import Logger from "@monorepo/core-logger"
import axios from "../../utils/axios"
import build from "../../utils/buildProductsRequestParams"
import ProductsApi from "../../config/api/products"
import {getProductsFragmentByPage} from "."
import {SearchApiRequestTypes, TOKEN_CANCELLATION_FLAG} from "../../config/constants"
import {ExternalSearchApiResponse} from "../../models/searchApi"

const productsApi = ProductsApi("getProductsFragment")

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
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

describe("Given the `getProductsFragmentByPage`", () => {
    const url = "https://some/url"
    const urlHttpTrimmed = "some/url"
    const baseUrl = "http://test.com"
    const headers = {foo: "bar"}
    const searchTerm = "foo"
    const type = SearchApiRequestTypes.Category
    const startPage = 5
    const endPage = 6
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

        it("should call axios with the expected parameters", async () => {
            await getProductsFragmentByPage({
                headers,
                baseUrl,
                url,
                searchTerm,
                type,
                startPage,
                endPage,
                pageSize,
                fields,
                bloomreachCookiesInitialVal,
                bloomreachPersonalizationEnabled,
            })
            expect(axios).toHaveBeenCalledWith({
                method: productsApi.method,
                url: baseUrl + productsApi.localEndpoint(),
                headers,
                params: build(
                    urlHttpTrimmed,
                    searchTerm,
                    type,
                    startPage,
                    endPage,
                    pageSize,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                    fields,
                ),
            })
        })

        it("should return the data returned by axios", async () => {
            const result = await getProductsFragmentByPage({
                headers,
                baseUrl,
                url,
                searchTerm,
                type,
                startPage,
                endPage,
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
                await getProductsFragmentByPage({
                    headers,
                    baseUrl,
                    url,
                    searchTerm,
                    type,
                    startPage,
                    endPage,
                    pageSize,
                    fields,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                })
            } catch (e) {} // eslint-disable-line no-empty

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(Logger.error).toHaveBeenCalledWith(error, "getProductsFragmentByPage")
        })

        it("should not log error when error is due to token cancellation", async () => {
            mockFailingAxiosResponse(new Error(TOKEN_CANCELLATION_FLAG))

            try {
                await getProductsFragmentByPage({
                    headers,
                    baseUrl,
                    url,
                    searchTerm,
                    type,
                    startPage,
                    endPage,
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
                getProductsFragmentByPage({
                    headers,
                    baseUrl,
                    url,
                    searchTerm,
                    type,
                    startPage,
                    endPage,
                    pageSize,
                    fields,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                })
            await expect(fn()).rejects.toThrow(error)
        })
    })
})
