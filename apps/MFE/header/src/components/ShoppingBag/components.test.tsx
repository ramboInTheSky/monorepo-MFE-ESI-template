import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ShoppingBagLink, ToolTipContent} from "./components"

describe("ShoppingBag Components: ", () => {
    describe("ShoppingBagLink", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ShoppingBagLink />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("ToolTipContent", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ToolTipContent />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
