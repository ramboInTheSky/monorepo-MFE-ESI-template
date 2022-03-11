/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import {getAutocompleteData} from "./index"
import {mockDateConstructor} from "../../../__mocks__/setDate"

import {externalCallAxiosInstance as axios} from "../../utils/axios"

jest.mock("../../utils/axios")

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockRequest = {
    siteUrl: "http://localhost:3004/",
}

describe("Given a GetProducts service", () => {
    describe("Given a getAutocompleteData()", () => {
        let response
        const searchValue = "socks"
        const accountId = "AccountId"
        const domainKey = "domainKey"
        const authKey = "authKey"
        const uid2 = "uid=abc123"
        describe("When loading products for a url", () => {
            beforeEach(async done => {
                mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))

                jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                    return Promise.resolve({status: 200, data: {mockResponseData: "Test"}})
                })

                response = await getAutocompleteData(
                    mockRequest.siteUrl,
                    searchValue,
                    accountId,
                    domainKey,
                    authKey,
                    uid2,
                )
                done()
            })

            it("should call axios with expected parameters", () => {
                const date = new Date().getTime()
                expect(axios.get).toBeCalledWith(
                    `http://localhost:3004/?account_id=${accountId}&auth_key=${authKey}&domain_key=${domainKey}&request_id=${date}&_br_uid_2=${uid2}&request_type=suggest&q=socks`,
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
                const newMockRequest = {
                    siteUrl: "http://localhost:3004/",
                    url: "a url",
                }
                await expect(
                    getAutocompleteData(newMockRequest.siteUrl, searchValue, accountId, domainKey, authKey, uid2),
                ).rejects.toThrowError()
            })

            it("should call the error logger", () => {
                expect(logger.error).toBeCalledWith(expect.any(Error))
            })
        })
    })
})
