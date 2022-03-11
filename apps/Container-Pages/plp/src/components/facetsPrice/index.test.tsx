/* eslint-disable react/self-closing-comp */
/* eslint-disable react/display-name */
import React from "react"
import {render, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {FacetsPrice} from "."

let actualOnChangeCommitted
const mockUpdatePriceFilters = jest.fn()

jest.mock("@mui/material", () => {
    const actualMaterial = jest.requireActual("@mui/material")
    return {
        ...actualMaterial,
        Slider: ({onChangeCommitted, getAriaValueText, getAriaLabel}) => {
            actualOnChangeCommitted = onChangeCommitted
            return (
                <div id="TEST-SLIDER">
                    getAriaValueText - {getAriaValueText(10)}
                    <span data-testid="slider-min-thumb" aria-label={getAriaLabel(0)}></span>
                    <span data-testid="slider-max-thumb" aria-label={getAriaLabel(1)}></span>
                    <span data-testid="dummy-switch-default-thumb" aria-label={getAriaLabel(2)}></span>
                </div>
            )
        },
    }
})

describe("Given a FacetsPrice", () => {
    describe("When rendering", () => {
        it("should match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsPrice
                        min={1}
                        max={10}
                        selectedMax={8}
                        selectedMin={2}
                        locale="en-GB"
                        updatePriceFilters={jest.fn()}
                        currencyCode="GBP"
                        realm="amido"
                        text={mockText}
                    />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When changing min value", () => {
        it("should render the new min value", () => {
            render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsPrice
                        min={1}
                        max={10}
                        selectedMax={8}
                        selectedMin={2}
                        locale="en-GB"
                        updatePriceFilters={mockUpdatePriceFilters}
                        currencyCode="GBP"
                        realm="amido"
                        text={mockText}
                    />
                </ThemeProvider>,
            )

            actualOnChangeCommitted(null, [3, 6])

            expect(mockUpdatePriceFilters).toHaveBeenCalledWith(3, 6)
        })
    })

    describe("When max value is set to below the selected value", () => {
        it("should render the selected value as the max value", () => {
            let max = 10
            let min = 1

            const {rerender, getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsPrice
                        min={min}
                        max={max}
                        selectedMax={8}
                        selectedMin={2}
                        locale="en-GB"
                        updatePriceFilters={mockUpdatePriceFilters}
                        currencyCode="GBP"
                        realm="amido"
                        text={mockText}
                    />
                </ThemeProvider>,
            )

            expect(getByTestId("plp-price-slider-label")).toHaveTextContent("£2 - £8")

            max = 6
            min = 3

            rerender(
                <ThemeProvider theme={mockTheme}>
                    <FacetsPrice
                        min={min}
                        max={max}
                        selectedMax={8}
                        selectedMin={2}
                        locale="en-GB"
                        updatePriceFilters={mockUpdatePriceFilters}
                        currencyCode="GBP"
                        realm="amido"
                        text={mockText}
                    />
                </ThemeProvider>,
            )

            expect(getByTestId("plp-price-slider-label")).toHaveTextContent("£3 - £6")
        })
    })
})

describe("when rendered", () => {
    it("should have aria attributes for min and max sliders", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <FacetsPrice
                    min={1}
                    max={10}
                    selectedMax={8}
                    selectedMin={2}
                    locale="en-GB"
                    updatePriceFilters={jest.fn()}
                    currencyCode="GBP"
                    realm="amido"
                    text={mockText}
                />
            </ThemeProvider>,
        )

        expect(screen.getByTestId("slider-min-thumb")).toHaveAttribute("aria-label", "Set minimum value")
        expect(screen.getByTestId("slider-max-thumb")).toHaveAttribute("aria-label", "Set maximum value")
        expect(screen.getByTestId("dummy-switch-default-thumb")).toHaveAttribute("aria-label", "")
    })
})
