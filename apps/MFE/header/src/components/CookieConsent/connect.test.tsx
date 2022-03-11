import {mapStateToProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"

jest.mock("js-cookie", () => ({
    ...jest.requireActual("js-cookie"),
    get: jest.fn(() => mockGetCookie),
}))

let mockGetCookie = false

describe("Components/CookieConsent - Given connect - mapStateToProps()", () => {
    const {
        text: {cookiePolicy},
    } = mockState
    const expected = {
        cookieDomain: ".amido.com",
        privacyUrl: "/privacy",
        hasConsentCookie: false,
        cookieName: "AmidoConsentCookie",
        text: cookiePolicy,
    }
    it("should return the correct props for non international country", () => {
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })

    it("should return the correct props for international country", () => {
        const newState = {
            ...mockState,
            request: {
                ...mockState.request,
                isInternationalCountry: true,
            },
        }
        const newExpected = {
            ...expected,
            privacyUrl: "/privacypolicy",
            cookieName: "AmidoDirectConsentCookie",
            text: cookiePolicy,
        }
        const got = mapStateToProps(newState)
        expect(got).toEqual(newExpected)
    })
    it("should return the correct props for existing consent cookie", () => {
        mockGetCookie = true
        const newExpected = {
            ...expected,
            hasConsentCookie: true,
            text: cookiePolicy,
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(newExpected)
    })
})
