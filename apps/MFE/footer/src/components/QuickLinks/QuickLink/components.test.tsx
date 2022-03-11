import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {QuickLinkContent, QuickLinkImg, QuickLinkDescription, Link, QuickLinkTitle} from "./components"

describe("QuickLink: ", () => {
    describe("Link: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Link href="/sad">Batman</Link>
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("QuickLinkContent: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<QuickLinkContent>Batman</QuickLinkContent>)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("QuickLinkImg: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<QuickLinkImg src="/imgs/myjpg.jpg" />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("QuickLinkTitle: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<QuickLinkTitle>anc</QuickLinkTitle>)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("QuickLinkDescription: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <QuickLinkDescription component="h4">Batman</QuickLinkDescription>
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
