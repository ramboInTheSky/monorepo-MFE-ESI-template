/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import {defaultPrimaryData} from "."

import {axiosInstance} from "../../utils/axios"

jest.mock("../../utils/axios")

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

describe("Given a default meganav", () => {
    afterAll(() => jest.clearAllMocks())
    describe("Given a defaultPrimaryData()", () => {
        let response

        // beforeEach(() => jest.clearAllMocks())
        describe("When loading primary data", () => {
            beforeEach(async done => {
                jest.spyOn(axiosInstance, "get").mockImplementationOnce(async () => {
                    return Promise.resolve({status: 200, data: {mockResponseData: "Test"}})
                })

                response = await defaultPrimaryData("next", {version: "v1.4.4"})
                done()
            })

            it("should call axios with expected parameters", () => {
                expect(axiosInstance.get).toBeCalledWith(
                    `https://ecmbrowsefdsxeuw.azurefd.net/static-content/fallback-api-data/meganav/v1.4.4/amido/primary/fallback.json`,
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
                jest.spyOn(axiosInstance, "get").mockImplementationOnce(async () => {
                    return Promise.reject(new Error("500 error"))
                })
            })
            it("should return bad response data", async () => {
                await expect(defaultPrimaryData("amido", {version: "v1.4.4"})).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })
    })
})
