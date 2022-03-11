import React from "react"
import {render, cleanup} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {RegionContainer, RegionGrid} from "./components"

describe("RegionWrapper: ", () => {
    afterEach(() => {
        cleanup()
    })
    it("should match the snapshot with RegionContainer", () => {
        const {asFragment} = render(<RegionContainer />)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot with RegionGrid ", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <RegionGrid />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
