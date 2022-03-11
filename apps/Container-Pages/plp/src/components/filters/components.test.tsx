import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {
    FilterFlexContainer,
    FilterContainer,
    FixedInfoContainer,
    FiltersContainer,
    ClearAllLink,
    TotalProductsResult,
} from "./components"
import dimensions from "../../../__mocks__/themeDimensions.json"

const mockThemeEnhanced = {...mockTheme, dimensions}

describe("Filters Components", () => {
    test("FilterFlexContainer", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FilterFlexContainer>Test</FilterFlexContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FacetContainer", () => {
        const {asFragment} = render(<FilterContainer>Test</FilterContainer>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("FixedInfoContainer with no top value and falsy 'hide' value", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FixedInfoContainer hide={false} top={0}>
                    Test
                </FixedInfoContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FixedInfoContainer with a top value and falsy 'hide' value", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FixedInfoContainer hide={false} top={100}>
                    Test
                </FixedInfoContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FixedInfoContainer with no top value and truthy 'hide' value", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FixedInfoContainer hide top={0}>
                    Test
                </FixedInfoContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("TotalProductsResult", () => {
        const {asFragment} = render(<TotalProductsResult />)
        expect(asFragment()).toMatchSnapshot()
    })

    test("ClearAllLink", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <ClearAllLink />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FiltersContainer in fixed position", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FiltersContainer absoluteTop={0} showFixedFacets isFiltersHidden={false} totalProductsHeight={24}>
                    Test
                </FiltersContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FiltersContainer in absolute position when showOpenFilterBtn is false", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FiltersContainer absoluteTop={10} showFixedFacets isFiltersHidden={false} totalProductsHeight={24}>
                    Test
                </FiltersContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FiltersContainer in fixed position when showOpenFilterBtn is true", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FiltersContainer absoluteTop={0} showFixedFacets isFiltersHidden totalProductsHeight={24}>
                    Test
                </FiltersContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FiltersContainer in absolute position when showOpenFilterBtn is true", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FiltersContainer absoluteTop={10} showFixedFacets isFiltersHidden totalProductsHeight={24}>
                    Test
                </FiltersContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("FiltersContainer has more top padding when totalProductHeight is above 24", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockThemeEnhanced}>
                <FiltersContainer absoluteTop={0} showFixedFacets isFiltersHidden={false} totalProductsHeight={48}>
                    Test
                </FiltersContainer>
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
