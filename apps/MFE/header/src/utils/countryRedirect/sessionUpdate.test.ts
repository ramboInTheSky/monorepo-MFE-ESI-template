import {SessionUpdate} from "./sessionUpdate"

import {updateSession} from "../../api/countryRedirect"

jest.mock("../../api/countryRedirect", () => ({
    updateSession: jest.fn(() => Promise.resolve()),
}))

const mockGeolocationData = {
    ISOCountryCode: "GB",
    ISOCountryName: "UK",
    RedirectUrl: "/testredirect",
}

const expectedPostData = {
    Version: 4,
    PopupDisplayed: true,
    ShowPopup: true,
    ISOCode: "GB",
    CountryName: "UK",
    RedirectUrl: "/testredirect",
    Attempt: 4,
}

describe("Given a Session Update Service", () => {
    describe("When redirect data is valid", () => {
        beforeAll(async done => {
            await SessionUpdate(true, true, mockGeolocationData, 4, "www.testsiteurl.com", 4)
            done()
        })

        it("When redirect data is valid, it should call session update", () => {
            expect(updateSession).toHaveBeenCalledWith("www.testsiteurl.com", expectedPostData)
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })

    describe("When redirect data is partially valid", () => {
        const emptyCountryData = {
            ISOCountryCode: "GB",
            ISOCountryName: null,
            RedirectUrl: null,
        }
        const expectedPartialData = {
            ...expectedPostData,
            CountryName: null,
            RedirectUrl: null,
        }
        beforeAll(async done => {
            await SessionUpdate(true, true, emptyCountryData, 4, "www.testsiteurl.com", 4)
            done()
        })

        it("When redirect data is valid, it should call session update", () => {
            expect(updateSession).toHaveBeenCalledWith("www.testsiteurl.com", expectedPartialData)
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })

    describe("When no country data is passed", () => {
        beforeAll(async done => {
            await SessionUpdate(true, true, null, 4, "www.testsiteurl.com", 4)
            done()
        })

        it("should not call update Session", () => {
            expect(updateSession).not.toHaveBeenCalled()
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })

    describe("When empty country data is passed", () => {
        const emptyCountryData = {
            ISOCountryCode: null,
            ISOCountryName: null,
            RedirectUrl: null,
        }
        beforeAll(async done => {
            await SessionUpdate(true, true, emptyCountryData, 4, "www.testsiteurl.com", 4)
            done()
        })

        it("should not call update Session", () => {
            expect(updateSession).not.toHaveBeenCalled()
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
})
