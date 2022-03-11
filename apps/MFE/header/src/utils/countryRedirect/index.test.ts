import PerformCountryRedirectCheck from "."
import * as utils from "./utils"
import getGeolocation from "../../api/countryRedirect"
import {openCountrySelector} from "./openCountrySelector"
import {SessionUpdate} from "./sessionUpdate"
import * as featureFlags from "../featureSwitch"

const expectedGeolocationData = {
    ISOCountryCode: "GB",
    ISOCountryName: "UK",
    RedirectUrl: "/testredirect",
}

jest.mock("../featureSwitch", () => ({
    doCountryRedirect: jest.fn(() => true),
}))

jest.mock("../../api/countryRedirect", () => ({
    __esModule: true,
    default: jest.fn(async url => {
        return url === "NO-DATA"
            ? Promise.resolve(null)
            : Promise.resolve({
                  ISOCountryCode: "GB",
                  ISOCountryName: "UK",
                  RedirectUrl: "/testredirect",
              })
    }),
}))
jest.mock("./openCountrySelector", () => ({
    openCountrySelector: jest.fn(async () => Promise.resolve()),
}))
jest.mock("./sessionUpdate")

let actualFetchRetryCallback

jest.mock("./utils", () => ({
    fetchRetry: jest.fn(cb => {
        actualFetchRetryCallback = cb
    }),
    GetDevOverrideIpAddress: jest.fn(),
    IsApplicable: jest.fn(() => true),
}))

const mockCountryRedirectParams = {
    Version: 123,
    PopupDisplayed: true,
    ShowPopup: true,
    PopupDate: "2018-05-05",
    ISOCode: "GB",
    CountryName: "UK",
    RedirectUrl: "/testredirect",
}

const mockCountryRedirectParamsWithoutShowPopup = {
    ...mockCountryRedirectParams,
    ShowPopup: false,
}

const mockCountryRedirectParamsWithoutPopupDate = {
    ...mockCountryRedirectParams,
    PopupDate: null,
}

afterEach(() => {
    jest.clearAllMocks()
})
describe("Give a countryRedirect Service", () => {
    describe("When PerformCountryRedirectCheck()", () => {
        it("It should test for feature flag being false", async () => {
            jest.spyOn(featureFlags, "doCountryRedirect").mockImplementationOnce(() => false)
            expect.assertions(1)
            await PerformCountryRedirectCheck(
                mockCountryRedirectParams,
                "it",
                7,
                "www.siteurl.com",
                "www.geolocation.com",
            )
            expect(featureFlags.doCountryRedirect).toHaveBeenCalled()
        })

        it("It should test for being applicable", async () => {
            expect.assertions(1)
            await PerformCountryRedirectCheck(
                mockCountryRedirectParams,
                "it",
                7,
                "www.siteurl.com",
                "www.geolocation.com",
            )
            expect(utils.IsApplicable).toHaveBeenCalled()
        })
        it("should not call openCountrySelector()", async () => {
            expect.assertions(1)
            await PerformCountryRedirectCheck(
                mockCountryRedirectParamsWithoutShowPopup,
                "it",
                7,
                "www.siteurl.com",
                "www.geolocation.com",
            )

            expect(openCountrySelector).not.toHaveBeenCalledWith()
        })
        it("should call openCountrySelector()", async () => {
            const expectedCountry = {
                ISOCountryCode: "GB",
                ISOCountryName: "UK",
                RedirectUrl: "/testredirect",
            }
            expect.assertions(1)
            await PerformCountryRedirectCheck(
                mockCountryRedirectParams,
                "it",
                7,
                "www.siteurl.com",
                "www.geolocation.com",
            )

            expect(openCountrySelector).toHaveBeenCalledWith("IT", expectedCountry, 7, "www.siteurl.com")
        })
        it("should call openCountrySelector() without popup date", async () => {
            const expectedCountry = {
                ISOCountryCode: "GB",
                ISOCountryName: "UK",
                RedirectUrl: "/testredirect",
            }
            expect.assertions(1)
            await PerformCountryRedirectCheck(
                mockCountryRedirectParamsWithoutPopupDate,
                "it",
                7,
                "www.siteurl.com",
                "www.geolocation.com",
            )

            expect(openCountrySelector).toHaveBeenCalledWith("IT", expectedCountry, 7, "www.siteurl.com")
        })
    })
    describe("When countryRedirectParams are not provided", () => {
        it("should call the callGeolocationApi", async () => {
            expect.assertions(1)
            await PerformCountryRedirectCheck(null, "IT", 7, "www.siteurl.com", "www.geolocation.com")

            expect(getGeolocation).toHaveBeenCalledWith("www.geolocation.com", undefined)
        })
    })

    describe("When browser is not applicable", () => {
        it("should call the callGeolocationApi", async () => {
            jest.spyOn(utils, "IsApplicable").mockImplementationOnce(() => false)
            expect.assertions(1)
            await PerformCountryRedirectCheck(null, "IT", 7, "www.siteurl.com", "www.geolocation.com")
            expect(utils.IsApplicable).toHaveBeenCalled()
        })
    })

    describe("When countryRedirectParams for an old version", () => {
        const mockOldVersionCountryRedirectParams = {
            Version: 2,
            PopupDisplayed: false,
            ShowPopup: true,
            PopupDate: "2018-05-05",
            ISOCode: "GB",
            CountryName: "UK",
            RedirectUrl: "/testredirect",
        }

        it("should call the callGeolocationApi", async () => {
            expect.assertions(2)

            await PerformCountryRedirectCheck(
                mockOldVersionCountryRedirectParams,
                "IT",
                7,
                "www.siteurl.com",
                "www.geolocation.com",
            )
            expect(getGeolocation).toHaveBeenCalledWith("www.geolocation.com", undefined)
            expect(openCountrySelector).toHaveBeenCalledWith("IT", expectedGeolocationData, 7, "www.siteurl.com")
        })
    })

    describe("When there is no geolocation data", () => {
        const mockOldVersionCountryRedirectParams = {
            Version: 2,
            PopupDisplayed: false,
            ShowPopup: true,
            PopupDate: "2018-05-05",
            ISOCode: "GB",
            CountryName: "UK",
            RedirectUrl: "/testredirect",
        }

        it("should call the callGeolocationApi", async () => {
            expect.assertions(3)
            await PerformCountryRedirectCheck(
                mockOldVersionCountryRedirectParams,
                "IT",
                7,
                "www.siteurl.com",
                "NO-DATA",
            )
            expect(getGeolocation).toHaveBeenCalledWith("NO-DATA", undefined)
            expect(utils.fetchRetry).toHaveBeenCalled()

            actualFetchRetryCallback(3)
            expect(SessionUpdate).toHaveBeenCalledWith(false, false, null, 7, "www.siteurl.com", 3)
        })
    })
})
