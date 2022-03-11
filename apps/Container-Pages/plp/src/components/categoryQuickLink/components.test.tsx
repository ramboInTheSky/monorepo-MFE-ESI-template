import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {
    CategoryQuickLinkRoot,
    CategoryQuickLinkImage,
    CategoryQuickLinkTitle,
    CategoryQuickLinkDescription,
    CategoryQuickLinkImageContainer,
} from "./components"

describe("Snapshots - quick link", () => {
    test("CategoryQuickLinkRoot", () => {
        const {asFragment} = render(<CategoryQuickLinkRoot>Test</CategoryQuickLinkRoot>)
        expect(asFragment()).toMatchSnapshot()
    })
    test("CategoryQuickLinkImageContainer", () => {
        const {asFragment} = render(<CategoryQuickLinkImageContainer>Test</CategoryQuickLinkImageContainer>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("CategoryQuickLinkImage", () => {
        const {asFragment} = render(<CategoryQuickLinkImage src="foo" />)
        expect(asFragment()).toMatchSnapshot()
    })

    test("CategoryQuickLinkTitle", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CategoryQuickLinkTitle>Test</CategoryQuickLinkTitle>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("CategoryQuickLinkDescription", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CategoryQuickLinkDescription>Test</CategoryQuickLinkDescription>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
