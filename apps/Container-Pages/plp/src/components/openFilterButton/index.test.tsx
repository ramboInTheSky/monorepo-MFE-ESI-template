import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {OpenFilterButtonComponent} from "."

jest.mock("../collaspedFilter", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST COLLASPED FILTER</div>,
}))
jest.mock("../collaspedPriceFilter", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST COLLASPED Price FILTER</div>,
}))

describe("OpenFilterComponent :", () => {
    let mockOpenFilterCallback

    beforeEach(() => {
        mockOpenFilterCallback = jest.fn()
    })

    it("should render the button to match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <OpenFilterButtonComponent
                    handleOpenFilterBtnClick={mockOpenFilterCallback}
                    isFilteredPrice={false}
                    filteredFacets={{}}
                    text={mockText}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should trigger open filter callback when button is pressed", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <OpenFilterButtonComponent
                    handleOpenFilterBtnClick={mockOpenFilterCallback}
                    isFilteredPrice={false}
                    filteredFacets={{}}
                    text={mockText}
                />
            </ThemeProvider>,
        )

        fireEvent.click(getByTestId("plp-facets-open-filters-btn"))

        expect(mockOpenFilterCallback).toHaveBeenCalled()
    })

    it("should render CollapsedFilter component when isFilterSelected=true", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <OpenFilterButtonComponent
                    handleOpenFilterBtnClick={mockOpenFilterCallback}
                    isFilteredPrice={false}
                    filteredFacets={{}}
                    isFilterSelected
                    text={mockText}
                />
            </ThemeProvider>,
        )

        const text = screen.getByText(/TEST COLLASPED FILTER/i)
        expect(text).toBeInTheDocument()
    })

    it("should render CollapsedPriceFilter component when isFilterSelected=true", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <OpenFilterButtonComponent
                    handleOpenFilterBtnClick={mockOpenFilterCallback}
                    isFilteredPrice
                    filteredFacets={{}}
                    isFilterSelected={false}
                    text={mockText}
                />
            </ThemeProvider>,
        )

        const text = screen.getByText(/TEST COLLASPED Price FILTER/i)
        expect(text).toBeInTheDocument()
    })
})
