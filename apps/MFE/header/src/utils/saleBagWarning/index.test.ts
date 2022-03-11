import Cookies from "js-cookie"
import {getReadOnMainSite, updateReadOnMainSite, pathToVipSite} from "./index"

jest.mock("js-cookie", () => ({
    ...jest.requireActual("js-cookie"),
    get: jest.fn(),
    set: jest.fn(),
}))

describe("util - AmidoSaleBagWarning", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("pathToVipSite", () => {
        it("should return siteurl and /eoss", () => {
            expect(pathToVipSite("abcwer")).toEqual("abcwer/eoss")
        })
    })
    describe("updateReadOnMainSite", () => {
        it("should return false if cookie name does not exist", () => {
            Cookies.get = jest.fn().mockImplementation(() => undefined)
            expect(updateReadOnMainSite()).toBeFalsy()
        })
        it("should update the value to True for readOnMainSite", () => {
            Cookies.get = jest.fn().mockImplementation(() => "readOnMainSite=False")
            updateReadOnMainSite()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(Cookies.set).toBeCalledWith("AmidoSaleBagWarning", "readOnMainSite=True")
        })
    })
    describe("getReadOnMainSite", () => {
        it("should return false if coookie name does not exist", () => {
            Cookies.get = jest.fn().mockImplementation(() => undefined)
            expect(getReadOnMainSite()).toBeFalsy()
        })
        it("should return true when readOnMainSite is false", () => {
            Cookies.get = jest.fn().mockImplementation(() => "readOnMainSite=False")

            expect(getReadOnMainSite()).toBeTruthy()
        })
        it("should return false when readOnMainSite is true", () => {
            Cookies.get = jest.fn().mockImplementation(() => "readOnMainSite=True")

            expect(getReadOnMainSite()).toBeFalsy()
        })
        it("should return false when readOnMainSite does not exist", () => {
            Cookies.get = jest.fn().mockImplementation(() => "asdasd=asdasd")

            expect(getReadOnMainSite()).toBeFalsy()
        })
    })
})
