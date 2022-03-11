/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import MegaNavApiConfig from "../../config/api/appdata"
import * as axios from "../../utils/axios"
import {getPrimaryNavData} from "./index"
import {defaultPrimaryData} from "../getDefaultData"

jest.mock("../getDefaultData", () => ({defaultPrimaryData: jest.fn(() => ({defaultData: "test"}))}))
jest.mock("../../utils/axios", () => ({
    __esModule: true,
    axiosInstance: jest.fn(async req => {
        return req.headers.success
            ? Promise.resolve({status: 200, data: {mockResponseData: "Test"}})
            : Promise.reject(new Error("500 error"))
    }),
}))

jest.mock("../../config/api/appdata", () => ({
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
    describe("Given a getPrimaryNavData()", () => {
        let response
        const country = "mx"
        const version = "v1.0.0"
        describe("When loading products for a url", () => {
            beforeAll(async done => {
                response = await getPrimaryNavData(mockRequest.headers as any, {version, country})
                done()
            })

            it('should call SearchAPI with "getPrimaryNavData"', () => {
                expect(MegaNavApiConfig).toBeCalledWith("getPrimaryNavData")
            })

            it("should call axios with expected parameters", () => {
                expect(axios.axiosInstance).toBeCalledWith({
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
            let failedResponse
            beforeAll(async done => {
                const newMockRequest = {
                    headers: {success: false, "x-monorepo-realm": "amido", "x-monorepo-territory": "gb"},
                    url: "a url",
                }
                failedResponse = await getPrimaryNavData(newMockRequest.headers as any, {version, country})
                done()
            })
            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })

            it("should call load default data", () => {
                expect(defaultPrimaryData).toHaveBeenCalledWith("next", {country, version})
            })

            it("should return default data", () => {
                expect(failedResponse).toEqual({defaultData: "test"})
            })
        })
    })
})
