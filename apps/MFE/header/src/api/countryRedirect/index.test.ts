/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import GeolocationApiConfig from "../../config/api/countryRedirect"
import * as axios from "../../utils/axios"
import {getGeolocation, updateSession} from "."

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
const mockLocalEndpoint = jest.fn(() => "/getGeolocationData")
jest.mock("../../config/api/countryRedirect", () => ({
    __esModule: true,
    default: jest.fn(() => ({method: "get", localEndpoint: mockLocalEndpoint})),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockRequest = {
    baseUrl: "http://localhost:3004",
}

describe("Given a country redirect service", () => {
    describe("Given a getGeolocation()", () => {
        let response
        describe("When getting geolocation data", () => {
            beforeAll(async done => {
                response = await getGeolocation(mockRequest.baseUrl, null)
                done()
            })

            it('should call GeolocationApiConfig with "getGeolocationData"', () => {
                expect(GeolocationApiConfig).toBeCalledWith("getGeolocationData")
            })

            it("should call axios with expected parameters", () => {
                expect(axios.axiosInstance).toBeCalledWith({
                    method: "get",
                    url: "http://localhost:3004/getGeolocationData",
                })
            })

            it("should return response data", () => {
                expect(response).toEqual({mockResponseData: "Test"})
            })

            it("should not call the error logger", () => {
                expect(logger.error).not.toBeCalled()
            })
        })

        describe("When getting geolocation data for an ipaddress", () => {
            beforeAll(async done => {
                response = await getGeolocation(mockRequest.baseUrl, "1234")
                done()
            })

            it("should call GeolocationApiConfig with the ipaddress", () => {
                expect(mockLocalEndpoint).toHaveBeenCalledWith("1234")
            })
        })

        describe("Given an error request", () => {
            it("should return bad response data", async () => {
                const newMockRequest = {
                    siteUrl: "ERROR",
                }
                await expect(getGeolocation(newMockRequest.siteUrl, null)).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })

        afterAll(() => {
            jest.clearAllMocks()
        })
    })

    describe("Given a updateSession()", () => {
        const mockUpdateSessionData = {
            Version: 1,
            PopupDisplayed: true,
            ShowPopup: true,
            ISOCode: "GB",
            CountryName: "UK",
            RedirectUrl: null,
            Attempt: 4,
        }
        describe("When posting session data", () => {
            beforeAll(async done => {
                await updateSession(mockRequest.baseUrl, mockUpdateSessionData)
                done()
            })

            it('should call GeolocationApiConfig with "getGeolocationData"', () => {
                expect(GeolocationApiConfig).toBeCalledWith("sessionUpdate")
            })

            it("should call axios with expected parameters", () => {
                expect(axios.axiosInstance).toBeCalledWith({
                    method: "get",
                    url: "http://localhost:3004/getGeolocationData",
                    data: mockUpdateSessionData,
                })
            })

            it("should not call the error logger", () => {
                expect(logger.error).not.toBeCalled()
            })
        })

        describe("Given an error request", () => {
            it("should return bad response data", async () => {
                const newMockRequest = {
                    siteUrl: "ERROR",
                }
                await expect(updateSession(newMockRequest.siteUrl, mockUpdateSessionData)).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
})
