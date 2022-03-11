import React from "react"
import {set} from "js-cookie"
import {fireEvent, render, screen, act, waitForElementToBeRemoved} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {CookieConsent, CookieConsentProps} from "."
import * as featureFlags from "../../utils/featureSwitch"

jest.mock("js-cookie", () => ({
    ...jest.requireActual("js-cookie"),
    set: jest.fn(),
}))

jest.mock("../../utils/featureSwitch", () => ({
    doCookiePolicy: jest.fn(() => true),
}))

describe("Components - CookieConsent: ", () => {
    let props: CookieConsentProps

    beforeEach(() => {
        props = {
            cookieDomain: ".test.com",
            hasConsentCookie: false,
            privacyUrl: "/privacy",
            cookieName: "AmidoConsentCookie",
            text: mockText.cookiePolicy,
        }
    })

    it("should match the snapshot when cookie policy is enabled", () => {
        jest.spyOn(featureFlags, "doCookiePolicy").mockImplementationOnce(() => true)

        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CookieConsent {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when cookie policy feature is disabled", () => {
        jest.spyOn(featureFlags, "doCookiePolicy").mockImplementationOnce(() => false)

        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CookieConsent {...props} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it("should have correct url", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <CookieConsent {...props} />
            </SCThemeProvider>,
        )

        expect(screen.getByText(props.text.link)).toHaveAttribute("href", props.privacyUrl)
    })

    it("should close pop up on close icon click", async () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <CookieConsent {...props} />
            </SCThemeProvider>,
        )
        const closeButton = screen.getByAltText(props.text.closeIconAltText)
        act(() => {
            fireEvent.click(closeButton)
        })
        await waitForElementToBeRemoved(() => screen.queryByText(props.text.title))
        expect(screen.queryByText(props.text.title)).not.toBeInTheDocument()
    })

    it("should not render pop up if there is a consent cookie", () => {
        const newProps = {
            ...props,
            hasConsentCookie: true,
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <CookieConsent {...newProps} />
            </SCThemeProvider>,
        )
        expect(screen.queryByText(props.text.title)).not.toBeInTheDocument()
    })

    it("should set consent cookie if there isn't one already", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <CookieConsent {...props} />
            </SCThemeProvider>,
        )
        expect(set).toHaveBeenCalledWith("AmidoConsentCookie", "AllowCookiesFromAmido=True", {
            expires: 365,
            domain: ".test.com",
        })
    })

    it("should not render pop up if cookie policy feature is disabled ", () => {
        jest.spyOn(featureFlags, "doCookiePolicy").mockImplementationOnce(() => false)

        render(
            <SCThemeProvider theme={mockTheme}>
                <CookieConsent {...props} />
            </SCThemeProvider>,
        )
        expect(screen.queryByText(props.text.title)).not.toBeInTheDocument()
    })
})
