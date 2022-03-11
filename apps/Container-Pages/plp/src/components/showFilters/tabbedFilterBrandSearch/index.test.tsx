import {render, fireEvent} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"

import BrandSearchBar from "."
import {mockText, mockTheme} from "../../../../__mocks__/mockStore"

const mockSetBrandAction = jest.fn()

jest.mock("../../../ducks/tabbedFilters", () => ({
    setBrandName: jest.fn(() => mockSetBrandAction),
}))

const BrandSearch = ""

describe("Given a Tabbed Brand Search Bar Component", () => {
    const componentToTest = (
        <ThemeProvider theme={mockTheme}>
            <BrandSearchBar setBrandNameForSearch={mockSetBrandAction} brandSearch={BrandSearch} text={mockText}/>
        </ThemeProvider>
    )
    it("should render the component correctly to match the snapshot", () => {
        const {asFragment} = render(componentToTest)
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call setBrandNameForSearch when input value is changed", () => {
        const {getByTestId, getByRole} = render(componentToTest)
        const inputParent = getByTestId("plp-tabbed-brand-search-bar-input")
        const input = getByRole("textbox")
        inputParent.focus()
        fireEvent.change(input, {target: {value: "two"}})
        expect(mockSetBrandAction).toHaveBeenCalled()
    })
})
