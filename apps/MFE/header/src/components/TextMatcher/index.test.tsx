import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import TextMatcher, {TextMatcherProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Components - TextMatcher: ", () => {
    let props: TextMatcherProps

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <TextMatcher {...props} text="celio" textToMatch="ce" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match occurance at start of text", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <TextMatcher {...props} text="celio" textToMatch="ce" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match occurance in middle text", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <TextMatcher {...props} text="celio" textToMatch="li" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match occurance at end of text", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <TextMatcher {...props} text="celio" textToMatch="io" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match multiple occurance of text", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <TextMatcher {...props} text="celiocelio" textToMatch="ce" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match case sensitive texts", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <TextMatcher {...props} text="CelioCElio" textToMatch="ce" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
