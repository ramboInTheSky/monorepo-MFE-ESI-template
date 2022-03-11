import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ColourChipListItem, ColourChipLink} from "./components"

describe("Given a Colour Chip Component - ColourChipListItem", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChipListItem />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colour Chip Component - ColourChipLink", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChipLink />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
