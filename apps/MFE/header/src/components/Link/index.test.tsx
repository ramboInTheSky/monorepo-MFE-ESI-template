import React from "react"
import {render, screen} from "@testing-library/react"
import Link, {LinkProps} from "."

describe("Components - Link: ", () => {
    let props: Omit<LinkProps, "children">
    beforeEach(() => {
        props = {
            href: "https://sampleref",
        }
    })
    it("should match snapshot", () => {
        const {asFragment} = render(<Link {...props}> fake</Link>)
        expect(asFragment).toMatchSnapshot()
    })
    it("should have required attributes", () => {
        const content = "fake"
        render(<Link {...props}> {content}</Link>)
        const got = screen.getByRole("link")
        expect(got).toHaveAttribute("href", props.href)
        expect(got).toHaveTextContent(content)
    })

    it("should have optional rel attribute", () => {
        const content = "fake 2"
        render(
            <Link {...props} rel="nofollow">
                {" "}
                {content}
            </Link>,
        )
        const got = screen.getByRole("link")
        expect(got).toHaveAttribute("rel", props.rel)
        expect(got).toHaveTextContent(content)
    })
})
