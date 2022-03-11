/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import FooterApiConfig from "../../config/api/footerdata"
import * as axios from "../../utils/axios"
import {getFooterData} from "./index"

jest.mock("../../utils/axios", () => ({
    __esModule: true,
    default: jest.fn(async req => {
        return req.headers.success
            ? Promise.resolve({status: 200, data: {mockResponseData: "Test"}})
            : Promise.reject(new Error("500 error"))
    }),
}))

jest.mock("../../config/api/footerdata", () => ({
    __esModule: true,
    default: jest.fn(() => ({method: "get", localEndpoint: () => "Test"})),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockRequest = {
    headers: {success: true},
}

describe("Given a GetProducts service", () => {
    describe("Given a getFooterData()", () => {
        let response
        describe("When loading products for a url", () => {
            beforeAll(async done => {
                response = await getFooterData(mockRequest.headers as any)
                done()
            })

            it('should call FooterApiConfig with "getFooterData"', () => {
                expect(FooterApiConfig).toBeCalledWith("getFooterData")
            })

            it("should call axios with expected parameters", () => {
                expect(axios.default).toBeCalledWith({
                    method: "get",
                    url: "Test",
                    headers: mockRequest.headers,
                })
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
                await expect(getFooterData(newMockRequest.headers as any)).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })
    })
})
