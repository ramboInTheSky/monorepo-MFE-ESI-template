import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"

import {mockTheme} from "@monorepo/themes"
import {StyledFab, StyledZoom} from "./components"

describe("BackToTop Snapshot tests", () => {
    test("StyledZoom", () => {
        const {asFragment} = render(
            <StyledZoom>
                <div>Test</div>
            </StyledZoom>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledFab", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledFab>Test</StyledFab>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
