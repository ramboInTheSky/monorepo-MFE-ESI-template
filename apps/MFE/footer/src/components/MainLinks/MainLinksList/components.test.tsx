import React from "react"
import {render, cleanup} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"

import {MainList, MainListLink} from "./components"

describe("Components/MainLinks/MainLinkList - Components", () => {
    afterEach(() => {
        cleanup()
    })
    it("should match the snapshot - MainList", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MainList />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot - MainListLink", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MainListLink href="/" target="_blank" aria-label="Some text">
                    Test
                </MainListLink>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
