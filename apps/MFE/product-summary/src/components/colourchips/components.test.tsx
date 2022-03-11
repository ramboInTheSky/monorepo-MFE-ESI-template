import React from "react"
import { render } from "@testing-library/react"
import { ThemeProvider } from "styled-components"
import { centralisedMockTheme, mockTheme } from "../../../__mocks__/mockStore"
import { ColourChipsContainer, ColourChipsList, ColourChipCollapse } from "./components"

describe("Given a Colour Chips Component - ColourChipCollapse", () => {
    it("should render as expected", () => {
        const { asFragment } = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChipCollapse />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colour Chips Component - ColourChipsList", () => {
    it("should render as expected", () => {
        const { asFragment } = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChipsList />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colour Chips Component - ColourChipsContainer", () => {
    it("should render as expected", () => {
        const { asFragment } = render(
            <ThemeProvider theme={mockTheme}>
                <ColourChipsContainer />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    describe("Given a Colour Chips Component - ColourChipsContainer with centralised theme ", () => {
        it("should render as expected", () => {
            const { asFragment } = render(
                <ThemeProvider theme={centralisedMockTheme}>
                    <ColourChipsContainer />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})