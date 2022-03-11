import React from "react"
import logger from "@monorepo/core-logger"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {LogoutLinkComponent} from "."

const props = {
    elements: [
        {
            type: "Logout",
            url: "/forget-me",
            openInNewWindow: false,
            name: "Logout",
            icon: "account_circle",
            text: "Not <username>?",
            accessibilityText: "Not <username>?",
            tooltip: "Logout",
            accessibilityTooltip: "Logout",
            description: "Logout of account",
            accessibilityDescription: "Logout of account",
        },
        {
            type: "LogoutButton",
            url: "/forget-me",
            openInNewWindow: false,
            name: "LogoutButton",
            icon: "account_circle",
            text: "Sign Out",
            accessibilityText: "Sign Out",
            tooltip: "Logout",
            accessibilityTooltip: "Logout",
            description: "Logout of your account",
            accessibilityDescription: "Logout of your account",
        },
    ],
    user: {accountFirstName: "John", loggedIn: true},
    bordercolor: "#fff",
    key: 123,
    siteUrl: "https://localhost.superman:2000",
}

jest.mock("@monorepo/core-logger", () => ({
    warn: jest.fn(),
}))

describe("QuickLinks: LogoutQuickLink", () => {
    describe("Testing old logout path", () => {
        it("should snapshot the logoutElement when the user is logged in state", () => {
            const newProps = {
                ...props,
                elements: [
                    {
                        type: "Logout",
                        url: "/MyAccount/AccountSummary/ForgetMe",
                        openInNewWindow: false,
                        name: "Logout",
                        icon: "account_circle",
                        text: "Not <username>?",
                        accessibilityText: "Not <username>?",
                        tooltip: "Logout",
                        accessibilityTooltip: "Logout",
                        description: "Logout of account",
                        accessibilityDescription: "Logout of account",
                    },
                    {
                        type: "LogoutButton",
                        url: "/MyAccount/AccountSummary/ForgetMe",
                        openInNewWindow: false,
                        name: "LogoutButton",
                        icon: "account_circle",
                        text: "Sign Out",
                        accessibilityText: "Sign Out",
                        tooltip: "Logout",
                        accessibilityTooltip: "Logout",
                        description: "Logout of your account",
                        accessibilityDescription: "Logout of your account",
                    },
                ],
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <LogoutLinkComponent {...newProps} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.warn).toHaveBeenCalledWith(
                "Logout component, LogoutButton url is using old path /MyAccount/AccountSummary/ForgetMe",
            )
        })
    })
    describe("When the type is Logout", () => {
        it("should snapshot the logoutElement when the user is logged in state", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <LogoutLinkComponent {...props} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it('should be "Not John?"', () => {
            const {getByTestId} = render(
                <SCThemeProvider theme={mockTheme}>
                    <LogoutLinkComponent {...props} />
                </SCThemeProvider>,
            )

            const LogoutTextTestID = "footer-quick-links-logout-text"

            expect(getByTestId(LogoutTextTestID)).toBeInTheDocument()
            expect(getByTestId(LogoutTextTestID)).toHaveTextContent("Not John?")
        })

        it("should render null when the user is not logged in state", () => {
            const newProps = {...props, user: {accountFirstName: "", loggedIn: false}}
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <LogoutLinkComponent {...newProps} />
                </SCThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should return null and output an warning", () => {
            const newProps = {
                ...props,
                elements: [
                    {
                        type: "hello123",
                        url: "https://www.amido.com/logout",
                        openInNewWindow: false,
                        name: "hello123",
                        icon: "account_circle",
                        text: "Not <username>?",
                        accessibilityText: "Not <username>?",
                        tooltip: "Logout",
                        accessibilityTooltip: "Logout",
                        description: "Logout of account",
                        accessibilityDescription: "Logout of account",
                    },
                ],
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <LogoutLinkComponent {...newProps} />
                </SCThemeProvider>,
            )
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.warn).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.warn).toHaveBeenCalledWith("INVALID QUICKLINKS LOGOUT JSON")

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
