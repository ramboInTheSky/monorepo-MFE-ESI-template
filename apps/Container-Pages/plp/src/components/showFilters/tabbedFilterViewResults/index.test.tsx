import {fireEvent, render} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"

import {TabbedFilterViewResults} from "."
import {mockText, mockTheme} from "../../../../__mocks__/mockStore"

const mockCloseTabbedFilters = jest.fn()

describe("Given a TabbedFilterViewResults component", () => {
    it("should render the component correctly to match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilterViewResults totalResults={123} closeTabbedFilters={mockCloseTabbedFilters} text={mockText} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it("When clicking, it should click the passed fn", () => {
        const {getByText} = render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilterViewResults totalResults={123} closeTabbedFilters={mockCloseTabbedFilters}  text={mockText}  />
            </ThemeProvider>,
        )
        fireEvent.click(getByText("View 123 Products"))

        expect(mockCloseTabbedFilters).toHaveBeenCalledWith()
    })
})
