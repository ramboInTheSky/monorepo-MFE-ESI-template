import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {LogoutWrapper, LogoutHidden, LogoutContainer} from "./components"

describe("LogoutQuickLink: ", () => {
    describe("LogoutWrapper: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<LogoutWrapper />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("LogoutHidden: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<LogoutHidden />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("LogoutContainer: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <LogoutContainer />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
