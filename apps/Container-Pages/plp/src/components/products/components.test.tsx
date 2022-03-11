import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {
    ProductGrid,
    ProductsRoot,
    ProductGridItem,
    ProductGridWrapper
} from "./components"

describe("Products components -", () => {
    test("ProductsGridContainer", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ProductsRoot>Test</ProductsRoot>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("ProductGridWrapper", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ProductGridWrapper>Test</ProductGridWrapper>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("ProductGridWrapper with larger header", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ProductGridWrapper $largerTopPaddingDesktop>Test</ProductGridWrapper>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("ProductGrid", () => {
        const {asFragment} = render(<ProductGrid>Test</ProductGrid>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("ProductGridItem", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ProductGridItem>Test</ProductGridItem>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("ProductGridItem when", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ProductGridItem>Test</ProductGridItem>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
