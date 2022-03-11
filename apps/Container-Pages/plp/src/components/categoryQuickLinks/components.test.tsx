import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {CategoryQuickLinksRoot, CategoryQuickLinkItems, CategoryQuickLinksTitle} from "./components"

describe("Snapshots - quick links", () => {
    test("CategoryQuickLinksRoot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CategoryQuickLinksRoot>Test</CategoryQuickLinksRoot>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("CategoryQuickLinksTitle", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CategoryQuickLinksTitle>Test</CategoryQuickLinksTitle>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("CategoryQuickLinkItems", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CategoryQuickLinkItems>Test</CategoryQuickLinkItems>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
