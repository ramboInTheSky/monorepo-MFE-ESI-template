import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"

import {
    LanguageSelectorDescription,
    LanguageSelectorTitle,
    LanguageSelectorLink,
    LanguageSelectorElement,
    LanguageSelectorImg,
    LanguageSelectorWrapper,
} from "./components"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

describe("Language Selector Quicklinks: ", () => {
    describe("LanguageSelectorDescription: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<LanguageSelectorDescription>Batman</LanguageSelectorDescription>)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("LanguageSelectorTitle: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<LanguageSelectorTitle>Batman</LanguageSelectorTitle>)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("LanguageSelectorLink: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <LanguageSelectorLink>Batman</LanguageSelectorLink>
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("LanguageSelectorGrid: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<LanguageSelectorElement>Batman</LanguageSelectorElement>)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("LanguageSelectorImg: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <LanguageSelectorImg src="http://batman.co.uk" aria-hidden="true" alt="Batmans website" />,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("LanguageSelectorWrapper: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<LanguageSelectorWrapper>Batman</LanguageSelectorWrapper>)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
