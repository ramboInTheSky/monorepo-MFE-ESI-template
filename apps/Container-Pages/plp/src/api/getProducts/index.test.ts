/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import ProductsApi from "../../config/api/products"
import * as axios from "../../utils/axios"
import {getProducts} from "."
import build from "../../utils/buildProductsRequestParams"
import {SearchApiRequestTypes} from "../../config/constants"

jest.mock("../../utils/buildProductsRequestParams", () => ({
    __esModule: true,
    default: jest.fn(() => ({mockParams: "test"})),
}))

jest.mock("../../utils/axios", () => ({
    __esModule: true,
    default: jest.fn(async req => {
        return req.headers.success
            ? Promise.resolve({status: 200, data: {mockResponseData: "Test"}})
            : Promise.reject(new Error("500 error"))
    }),
}))

jest.mock("../../config/api/products", () => ({
    __esModule: true,
    default: jest.fn(() => ({method: "get", localEndpoint: () => "Test"})),
}))

jest.mock("../../config/api/products", () => ({
    __esModule: true,
    default: jest.fn(() => ({method: "get", localEndpoint: () => "Test"})),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockRequest = {
    headers: {success: true},
}
const mockUrl = "http://test.co.uk/shop/xxx/yyy"
const mockUrlTrimmed = "test.co.uk/shop/xxx/yyy"
describe("Given a GetProducts service", () => {
    describe("Given a getProducts()", () => {
        let response
        describe("When loading products for a url", () => {
            const startPage = 5
            const endPage = 6
            const pageSize = 30
            const fields = ["title"] as any
            const bloomreachCookiesInitialVal = {
                brUid2: "testBRUID2",
                brMtSearch: "testBRMTSeach",
            }
            const bloomreachPersonalizationEnabled = true

            beforeAll(async done => {
                response = await getProducts(
                    mockRequest.headers as any,
                    mockUrl,
                    "1234",
                    SearchApiRequestTypes.Category,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                    startPage,
                    endPage,
                    pageSize,
                    fields,
                )
                done()
            })

            it('should call SearchAPI with "getProducts"', () => {
                expect(ProductsApi).toBeCalledWith("getProducts")
            })

            it("should call axios with expected parameters", () => {
                expect(axios.default).toBeCalledWith({
                    method: "get",
                    url: "Test",
                    headers: mockRequest.headers,
                    params: {mockParams: "test"},
                })
            })

            it("should call build", () => {
                expect(build).not.toHaveBeenCalledWith(
                    mockUrl,
                    "1234",
                    SearchApiRequestTypes.Category,
                    startPage,
                    endPage,
                    pageSize,
                    fields,
                )

                expect(build).toHaveBeenCalledWith(
                    mockUrlTrimmed,
                    "1234",
                    SearchApiRequestTypes.Category,
                    startPage,
                    endPage,
                    pageSize,
                    bloomreachCookiesInitialVal,
                    bloomreachPersonalizationEnabled,
                    fields,
                )
            })

            it("should return response data", () => {
                expect(response).toEqual({mockResponseData: "Test"})
            })

            it("should not call the error logger", () => {
                expect(logger.error).not.toBeCalled()
            })
        })

        describe("Given an error request", () => {
            it("should return bad response data", async () => {
                const newMockRequest = {
                    headers: {success: false},
                    url: "a url",
                }
                const bloomreachCookiesInitialVal = {
                    brUid2: "testBRUID2",
                    brMtSearch: "testBRMTSeach",
                }
                const bloomreachPersonalizationEnabled = true

                await expect(
                    getProducts(
                        newMockRequest.headers as any,
                        mockUrl,
                        "1234",
                        SearchApiRequestTypes.Keyword,
                        bloomreachCookiesInitialVal,
                        bloomreachPersonalizationEnabled,
                    ),
                ).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })
    })
})
