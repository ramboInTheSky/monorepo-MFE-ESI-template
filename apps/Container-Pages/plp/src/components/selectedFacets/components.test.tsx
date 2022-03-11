import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {
    StyledSelectedFacetsContainer,
    StyledSelectedFacetsTitle,
    StyledSelectedFacetsList,
    StyledRemove,
    RemoveSelectedFacet,
    StyledSelectedFacetLabel,
    StyledList,
    StyledListItem,
} from "./components"

describe("Snapshots - Selected Facets", () => {
    test("StyledSelectedFacetsContainer", () => {
        const {asFragment} = render(<StyledSelectedFacetsContainer>Test</StyledSelectedFacetsContainer>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledSelectedFacetsTitle", () => {
        const {asFragment} = render(<StyledSelectedFacetsTitle>Test</StyledSelectedFacetsTitle>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledSelectedFacetsList", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledSelectedFacetsList>Test</StyledSelectedFacetsList>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledRemove", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledRemove>Test</StyledRemove>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("RemoveSelectedFacet", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <RemoveSelectedFacet>Test</RemoveSelectedFacet>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledSelectedFacetLabel", () => {
        const {asFragment} = render(<StyledSelectedFacetLabel>Test</StyledSelectedFacetLabel>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledList", () => {
        const {asFragment} = render(<StyledList>Test</StyledList>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledListItem", () => {
        const {asFragment} = render(<StyledListItem>Test</StyledListItem>)
        expect(asFragment()).toMatchSnapshot()
    })
})
