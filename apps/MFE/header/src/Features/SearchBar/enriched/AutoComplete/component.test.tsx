import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {AutocompleteContent, AutocompleteProductsGrid, AutocompleteGrid} from "./component"

describe("AutoComplete component: ", () => {
    describe("AutocompleteContent: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<AutocompleteContent />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("AutocompleteGrid: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <AutocompleteGrid />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("AutocompleteProductsGrid: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <AutocompleteProductsGrid />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
