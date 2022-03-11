/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import SearchApi from "../../config/api/search"
import * as axios from "../../utils/axios"
import {getProductSummary} from "./index"

jest.mock("../../utils/axios", () => ({
    __esModule: true,
    default: jest.fn(async req => {
        return req.headers.success
            ? Promise.resolve({
                  status: 200,
                  data: {
                      mockResponseData: "Test",
                  },
                  headers: {
                      "last-modified": "test-last-modified",
                      "edge-cache-tags": "test-edge-cache-tags",
                  },
              })
            : Promise.reject(new Error("500 error"))
    }),
}))

jest.mock("../../config/api/search", () => ({
    __esModule: true,
    default: jest.fn(() => ({method: "get", localEndpoint: () => "Test"})),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockRequest = {
    headers: {success: true},
}
const mockPid = "1234"
const mockType = "product"
describe("Given a GetProducts service", () => {
    describe("Given a getProductSummary()", () => {
        let response
        describe("When loading products for a url", () => {
            beforeAll(async done => {
                response = await getProductSummary(mockRequest.headers as any, mockPid, "product")
                done()
            })

            it("should call axios with expected parameters", () => {
                expect(axios.default).toBeCalledWith({
                    method: "get",
                    url: "Test",
                    headers: mockRequest.headers,
                })
            })

            it("should return response data", () => {
                expect(response).toEqual({
                    response: {
                        mockResponseData: "Test",
                    },
                    responseHeaders: {
                        "last-modified": "test-last-modified",
                        "edge-cache-tags": "test-edge-cache-tags",
                    },
                })
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
                await expect(
                    getProductSummary(newMockRequest.headers as any, mockPid, "product"),
                ).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })

        describe("When loading products for a url with a 'type' param defined", () => {
            beforeAll(async done => {
                response = await getProductSummary(mockRequest.headers as any, mockPid, mockType)
                done()
            })

            it('should call SearchAPI with "getTypeSummary"', () => {
                expect(SearchApi).toBeCalledWith("getTypeSummary")
            })

            it("should call axios with expected parameters", () => {
                expect(axios.default).toBeCalledWith({
                    method: "get",
                    url: "Test",
                    headers: mockRequest.headers,
                })
            })

            it("should return response data", () => {
                expect(response).toEqual({
                    response: {
                        mockResponseData: "Test",
                    },
                    responseHeaders: {
                        "last-modified": "test-last-modified",
                        "edge-cache-tags": "test-edge-cache-tags",
                    },
                })
            })
        })
    })
})
