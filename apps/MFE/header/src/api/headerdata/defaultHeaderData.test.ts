/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import defaultHeaderData from "./defaultHeaderData"

import {axiosInstance as axios} from "../../utils/axios"

jest.mock("../../utils/axios")

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

describe("Given a default header", () => {
    describe("Given a defaultHeaderData()", () => {
        let response
        describe("When loading products for a url", () => {
            beforeEach(async done => {
                jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                    return Promise.resolve({status: 200, data: {mockResponseData: "Test"}})
                })

                response = await defaultHeaderData("amido", "v1.4.4")
                done()
            })

            it("should call axios with expected parameters", () => {
                expect(axios.get).toBeCalledWith(
                    `https://ecmbrowsefdsxeuw.azurefd.net/static-content/fallback-api-data/header/v1.4.4/amido/default-header.json`,
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
            beforeEach(() => {
                jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                    return Promise.reject(new Error("500 error"))
                })
            })
            it("should return bad response data", async () => {
                await expect(defaultHeaderData("amido", "v1.4.4")).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })
    })
})
