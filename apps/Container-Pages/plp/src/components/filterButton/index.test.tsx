import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {FilterButton} from "."

const mockOnClick = jest.fn()

describe("FilterButton: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FilterButton onClick={mockOnClick} text="TEST BUTTON" />
            </ThemeProvider>,
        )

        expect(asFragment).toMatchSnapshot()
    })

    it("should match the snapshot when large", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FilterButton onClick={mockOnClick} text="TEST BUTTON" large />
            </ThemeProvider>,
        )

        expect(asFragment).toMatchSnapshot()
    })

    it("should call onClick when the buttons is clicked", () => {
        const {getByText} = render(
            <ThemeProvider theme={mockTheme}>
                <FilterButton onClick={mockOnClick} text="TEST BUTTON" />
            </ThemeProvider>,
        )

        fireEvent.click(getByText("TEST BUTTON"))
        expect(mockOnClick).toHaveBeenCalled()
    })
})
