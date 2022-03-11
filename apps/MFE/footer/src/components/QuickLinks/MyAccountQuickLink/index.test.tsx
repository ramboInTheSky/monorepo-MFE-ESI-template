import React from "react"
import {render} from "@testing-library/react"

import {MyAccountQuickLink} from "./index"

const mockMyAccountLoggedInInput = {
    url: "http://somethingtesting.co.uk/secure/accounts/transfers",
    openInNewWindow: false,
    name: "",
    type: "MyAccountLoggedIn",
    icon: "",
    text: "TEST NAME",
    accessibilityText: "",
    tooltip: "",
    accessibilityTooltip: "",
    description: "",
    accessibilityDescription: "",
}
const mockMyAccountLoggedOutInput = {
    url: "http://somethingtesting.co.uk/secure/accounts/transfers",
    openInNewWindow: false,
    name: "",
    type: "MyAccountLoggedOut",
    icon: "",
    text: "LOGGED OUT",
    accessibilityText: "",
    tooltip: "",
    accessibilityTooltip: "",
    description: "",
    accessibilityDescription: "",
}

jest.mock("../QuickLink", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({data: {url, text}}) => (
        <a href={url} data-testid="footer-quick-links-name">
            {text}
        </a>
    ),
}))

describe("Given a MyAccountQuickLink", () => {
    describe("When the user is logged out state", () => {
        const Component = <MyAccountQuickLink {...mockMyAccountLoggedOutInput} />
        it("Then it renders the account quick link as logged out", () => {
            const {getByTestId} = render(Component)
            expect(getByTestId("footer-quick-links-name")).toBeInTheDocument()
            expect(getByTestId("footer-quick-links-name")).toHaveTextContent("LOGGED OUT")
        })
    })

    describe("When the user is logged in", () => {
        const Component = <MyAccountQuickLink {...mockMyAccountLoggedInInput} />
        it("Then it renders the account quick link as logged in", () => {
            const {getByTestId, asFragment} = render(Component)
            expect(asFragment()).toMatchSnapshot()
            expect(getByTestId("footer-quick-links-name")).toHaveTextContent("TEST NAME")
        })
    })
})
