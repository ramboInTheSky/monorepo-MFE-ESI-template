import React from "react"
import {render, cleanup} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {GridContainer, QuickLinksWrapper} from "./components"

describe("Components/QuickLinks - Components", () => {
    afterEach(() => cleanup())
    it("should match the snapshot - GridContainer", () => {
        const {asFragment} = render(<GridContainer />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot - QuickLinksWrapper", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <QuickLinksWrapper />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
