import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {FacetPriceContainer, PriceLabel, PriceSliderLabel, StyledSlider} from "./components"

describe("Price Facet Components", () => {
    test("FacetPriceContainer", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <FacetPriceContainer>Test</FacetPriceContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("PriceSliderLabel", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <PriceSliderLabel>Test</PriceSliderLabel>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("PriceLabel", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <PriceLabel>Test</PriceLabel>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledSlider", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <StyledSlider>Test</StyledSlider>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
