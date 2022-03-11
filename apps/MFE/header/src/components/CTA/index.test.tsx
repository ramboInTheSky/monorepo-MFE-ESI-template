import React from "react"
import {render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import CTA, {CTAProps} from "."

describe("Components - CTA: ", () => {
    let props: CTAProps

    beforeEach(() => {
        props = {
            themeType: "Primary",
            enable: true,
            url: "/spiderman/",
            text: "sample",
        }
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CTA {...props} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it("should have required attributes", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <CTA {...props} />
            </SCThemeProvider>,
        )

        const button = screen.getByRole("link")
        expect(button).toHaveAttribute("href", props.url)
        expect(button).toHaveTextContent(props.text)
        expect(button).toHaveStyle("opacity:1")
    })
    it("should have required attributes when disabled", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <CTA {...props} enable={false} />
            </SCThemeProvider>,
        )

        const button = screen.getByRole("link")
        expect(button).toHaveAttribute("href", props.url)
        expect(button).toHaveTextContent(props.text)
        expect(button).toHaveStyle("opacity: 0.5")
    })
})
