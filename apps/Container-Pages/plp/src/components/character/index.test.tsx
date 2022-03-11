import React from "react"
import {render, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Character} from "."

describe("FilterButton:", () => {
    const mockOnClick = jest.fn()

    describe("is clickable", () => {
        it("should match snapshot when is clickable and not selected character", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Character isClickable onClick={mockOnClick} text="TEST BUTTON" />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should match snapshot when is clickable and is selected character", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Character isClickable onClick={mockOnClick} isSelectedCharacter text="TEST BUTTON" />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should call onClick when the button is clicked", () => {
            const {getByText} = render(
                <ThemeProvider theme={mockTheme}>
                    <Character isClickable onClick={mockOnClick} text="TEST BUTTON" />
                </ThemeProvider>,
            )

            fireEvent.click(getByText("TEST BUTTON"))
            expect(mockOnClick).toHaveBeenCalled()
        })
    })

    describe("is not clickable", () => {
        it("should match snapshot when not clickable", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Character isClickable={false} onClick={mockOnClick} text="TEST BUTTON" />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
