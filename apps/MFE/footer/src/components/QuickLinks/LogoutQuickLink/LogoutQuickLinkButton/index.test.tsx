/* eslint-disable @typescript-eslint/no-floating-promises */
import React from "react"
import {render} from "@testing-library/react"
import LogoutLink from "."

const props = {
    url: "https://www.amido.com/logout",
    openInNewWindow: false,
    linkText: "Sign Out",
    accessibilityText: "Sign Out",
}

describe("QuickLinks - LogoutQuickLink - LogoutQuickLinkButton", () => {
    it("should create a link with the correct href ", () => {
        const {getByTestId} = render(<LogoutLink {...props} />)
        const signoutTestId = "footer-quick-links-sign-out-button"

        expect(getByTestId(signoutTestId)).toBeInTheDocument()
        expect(getByTestId(signoutTestId)).toHaveTextContent("Sign Out")

        expect(getByTestId(signoutTestId)).toHaveAttribute("href", "https://www.amido.com/logout")
    })
})
