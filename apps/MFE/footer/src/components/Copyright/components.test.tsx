import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {CopyrightText, GridContainer, ChildGrid, DeviceToggleLink} from "./components"

describe("Copyright components: ", () => {
    describe("CopyrightText: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <CopyrightText component="h3" />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("GridContainer: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<GridContainer />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("ChildGrid: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<ChildGrid />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("DeviceToggleLink: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <DeviceToggleLink />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
