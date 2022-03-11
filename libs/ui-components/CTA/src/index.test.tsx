import React from "react"
import {render, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import {CTA, CTAProps} from "."

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
            <ThemeProvider theme={mockTheme}>
                <CTA {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it("should have required attributes", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <CTA {...props} />
            </ThemeProvider>,
        )

        const button = screen.getByRole("link")
        expect(button).toHaveAttribute("href", props.url)
        expect(button).toHaveTextContent(props.text)
        expect(button).toHaveStyle("opacity:1")
    })
    it("should have required attributes when disabled", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <CTA {...props} enable={false} />
            </ThemeProvider>,
        )

        const button = screen.getByRole("link")
        expect(button).toHaveAttribute("href", props.url)
        expect(button).toHaveTextContent(props.text)
        expect(button).toHaveStyle("opacity: 0.5")
    })
})
