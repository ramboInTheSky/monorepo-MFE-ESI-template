/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import CountriesApiConfig from "../../config/api/countries"
import * as axios from "../../utils/axios"
import {getCountriesList} from "./index"

jest.mock("../../utils/axios", () => ({
    __esModule: true,
    axiosInstance: jest.fn(async req => {
        return !req.url.includes("ERROR")
            ? Promise.resolve({
                  status: 200,
                  data: {mockResponseData: "Test"},
              })
            : Promise.reject(new Error("500 error"))
    }),
}))

jest.mock("../../config/api/countries", () => ({
    __esModule: true,
    default: jest.fn(() => ({method: "get", localEndpoint: () => "/countries"})),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockRequest = {
    headers: {success: true},
    siteUrl: "http://localhost:3004",
    countrySelectorEndpoint: "/ChannelSelector/GetCountrySelection",
}

describe("Given a GetCountriesList service", () => {
    describe("Given a getCountriesList()", () => {
        let response
        describe("When getting list of countries", () => {
            beforeAll(async done => {
                response = await getCountriesList(
                    mockRequest.siteUrl,
                    mockRequest.headers as any,
                    mockRequest.countrySelectorEndpoint,
                )
                done()
            })

            it('should call CountriesApi with "getCountriesListData"', () => {
                expect(CountriesApiConfig).toBeCalledWith("getCountriesListData")
            })

            it("should call axios with expected parameters", () => {
                expect(axios.axiosInstance).toBeCalledWith({
                    method: "get",
                    url: "http://localhost:3004/ChannelSelector/GetCountrySelection",
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
                    siteUrl: "ERROR",
                    url: "a url",
                }
                await expect(
                    getCountriesList(
                        newMockRequest.siteUrl,
                        newMockRequest.headers as any,
                        mockRequest.countrySelectorEndpoint,
                    ),
                ).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })
    })
})
