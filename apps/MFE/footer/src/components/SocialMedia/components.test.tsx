import React from "react"
import {render, cleanup} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {SocialTitle, SocialLinkIcon} from "./components"

describe("SocialTitle: ", () => {
    afterEach(() => {
        cleanup()
    })
    it("should match the snapshot with SocialTitle", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SocialTitle />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot with SocialLinkIcon ", () => {
        const {asFragment} = render(<SocialLinkIcon />)
        expect(asFragment()).toMatchSnapshot()
    })
})
