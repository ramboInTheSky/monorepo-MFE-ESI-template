import * as utilsWindow from "../window"
import {fetchRetry, GetDevOverrideIpAddress, IsApplicable} from "./utils"

jest.mock("../window", () => ({
    getWindow: jest.fn(() => ({navigator: {userAgent: "test"}, location: {search: "?a=1"}})),
}))

describe("Given Country Redirect Utils", () => {
    describe("Given A fetchRetry()", () => {
        describe("When the apiCallFails", () => {
            it("should retry the api", async () => {
                const apiCall = jest.fn(() => {
                    throw new Error()
                })
                await fetchRetry(apiCall)

                expect(apiCall).toHaveBeenCalledWith(0)
                expect(apiCall).toHaveBeenCalledWith(1)
                expect(apiCall).toHaveBeenCalledWith(2)
                expect(apiCall).not.toHaveBeenCalledWith(3)
                expect(apiCall).toHaveBeenCalledTimes(3)
            })
        })
    })

    describe("Given a IsApplicable()", () => {
        describe("When valid userAgent", () => {
            it("should return true", () => {
                expect(IsApplicable()).toEqual(true)
            })
        })

        describe("When Amazon Silk device", () => {
            it("should return false", () => {
                jest.spyOn(utilsWindow, "getWindow").mockImplementationOnce(
                    () => ({navigator: {userAgent: "test,Silk"}} as any),
                )
                expect(IsApplicable()).toEqual(false)
            })
        })
    })

    describe("Given a GetDevOverrideIpAddress()", () => {
        describe("When no query ipaddress ", () => {
            it("should return null", () => {
                expect(GetDevOverrideIpAddress()).toEqual(null)
            })
        })

        describe("When Amazon Silk device", () => {
            it("should return false", () => {
                jest.spyOn(utilsWindow, "getWindow").mockImplementationOnce(
                    () => ({location: {search: "?ipaddress=1234.56"}} as any),
                )
                expect(GetDevOverrideIpAddress()).toEqual("1234.56")
            })
        })
    })
})
