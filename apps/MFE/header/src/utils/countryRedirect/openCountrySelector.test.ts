import {openCountrySelector} from "./openCountrySelector"
import {fetchRetry} from "./utils"
import {SessionUpdate} from "./sessionUpdate"
import PublishCountrySelectorOpen from "../../events/countrySelectorOpen"
import {SubscribeCountrySelectorClosed} from "../../events/countrySelectorClosed"
import {SubscribeCountrySelectorRedirect} from "../../events/countrySelectorRedirect"

let actualSubscribeCountrySelectorClosedCB
jest.mock("../../events/countrySelectorClosed", () => ({
    SubscribeCountrySelectorClosed: jest.fn(cb => {
        actualSubscribeCountrySelectorClosedCB = cb
        return {subscription: {unsubscribe: jest.fn()}}
    }),
}))

let actualSubscribeCountrySelectorRedirectCB
jest.mock("../../events/countrySelectorRedirect", () => ({
    SubscribeCountrySelectorRedirect: jest.fn(cb => {
        actualSubscribeCountrySelectorRedirectCB = cb
        return {subscription: {unsubscribe: jest.fn()}}
    }),
}))

jest.mock("../../events/countrySelectorRedirect")
jest.mock("../../events/countrySelectorOpen")
jest.mock("./sessionUpdate")

let actualCallback
jest.mock("./utils", () => ({
    fetchRetry: jest.fn(cb => {
        actualCallback = cb
    }),
}))
const mockGeolocationData = {
    ISOCountryCode: "GB",
    ISOCountryName: "UK",
    RedirectUrl: "/testredirect",
}

const emptyGeolocationData = {
    ISOCountryCode: "",
    ISOCountryName: "",
    RedirectUrl: "/testredirect",
}

describe("Given a openCountrySelector ", () => {

    describe("When the country code or country.ISOCountryCode is empty string", () => {
        it(", should not do anything", async () => {
            await openCountrySelector("", emptyGeolocationData, 13, "www.siteurl.com")
            expect(fetchRetry).not.toHaveBeenCalled()
        })

        afterAll(() => {
            jest.clearAllMocks()
        })
    })
    describe("When the country code matched the redirect code", () => {
        it(", should call fetchRetry", async () => {
            expect.assertions(2)
            await openCountrySelector("GB", mockGeolocationData, 13, "www.siteurl.com")
            expect(fetchRetry).toHaveBeenCalled()

            actualCallback(3)
            expect(SessionUpdate).toHaveBeenCalledWith(false, false, mockGeolocationData, 13, "www.siteurl.com", 3)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })
    })
    describe("when the country code doesnt match the redirect code", () => {
        beforeAll(async done => {
            await openCountrySelector("IL", mockGeolocationData, 13, "www.siteurl.com")
            done()
        })
        it("should call PublishCountrySelectorOpen", () => {
            expect(PublishCountrySelectorOpen).toHaveBeenCalledWith({isoCountryCode: "GB"})
        })

        it("should call fetchRetry", () => {
            expect(fetchRetry).toHaveBeenCalled()
            actualCallback(5)
            expect(SessionUpdate).toHaveBeenCalledWith(true, true, mockGeolocationData, 13, "www.siteurl.com", 5)
        })

        it("should call SubscribeCountrySelectorClosed", () => {
            expect(SubscribeCountrySelectorClosed).toHaveBeenCalled()
        })

        it("should call SubscribeCountrySelectorRedirect", () => {
            expect(SubscribeCountrySelectorRedirect).toHaveBeenCalled()
        })

        it("should call fetchRetry when closed event fires", () => {
            actualSubscribeCountrySelectorClosedCB()

            expect(fetchRetry).toHaveBeenCalledTimes(2)

            actualCallback(6)
            expect(SessionUpdate).toHaveBeenCalledWith(true, false, mockGeolocationData, 13, "www.siteurl.com", 6)
        })

        it("should call fetchRetry when redireect event fires", () => {
            actualSubscribeCountrySelectorRedirectCB()

            expect(fetchRetry).toHaveBeenCalledTimes(3)

            actualCallback(7)
            expect(SessionUpdate).toHaveBeenCalledWith(true, true, mockGeolocationData, 13, "www.siteurl.com", 7)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })
    })
})
