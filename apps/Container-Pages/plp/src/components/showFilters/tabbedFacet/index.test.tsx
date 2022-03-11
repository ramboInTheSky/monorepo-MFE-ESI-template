import {render} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"

import {TabbedFacet} from "."
import {mockTheme} from "../../../../__mocks__/mockStore"

describe("Given a TabbedFacet", () => {
    describe("when 'noBorder' prop is not passed", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFacet
                        facetDisplayName="Gender"
                        facetName="gender"
                        setSelectedFacet={jest.fn()}
                        hasSelectedFacet={false}
                        hideTopBorder={false}
                        hasSelectedFilters={false}
                        disabled={false}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("when 'noBorder' prop is passed", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFacet
                        facetDisplayName="Gender"
                        facetName="gender"
                        setSelectedFacet={jest.fn()}
                        hasSelectedFacet={false}
                        hideTopBorder={false}
                        hasSelectedFilters={false}
                        noBorder
                        disabled={false}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When it has selected filters and is not focused", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFacet
                        facetDisplayName="Gender"
                        facetName="gender"
                        setSelectedFacet={jest.fn()}
                        hasSelectedFacet={false}
                        hideTopBorder={false}
                        hasSelectedFilters
                        isFocused={false}
                        disabled={false}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When it has selected filters and is focused", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFacet
                        facetDisplayName="Gender"
                        facetName="gender"
                        setSelectedFacet={jest.fn()}
                        hasSelectedFacet={false}
                        hideTopBorder={false}
                        hasSelectedFilters
                        isFocused
                        disabled={false}
                        selectedFacetFilters="test filter"
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When it is disabled", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFacet
                        facetDisplayName="Gender"
                        facetName="gender"
                        setSelectedFacet={jest.fn()}
                        hasSelectedFacet={false}
                        hideTopBorder={false}
                        hasSelectedFilters
                        isFocused
                        disabled
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When it has selected filters and has selected facet, but not focused", () => {
        it("should match the snapshot correctly", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFacet
                        facetDisplayName="Gender"
                        facetName="gender"
                        setSelectedFacet={jest.fn()}
                        hideTopBorder={false}
                        hasSelectedFilters
                        hasSelectedFacet
                        isFocused={false}
                        disabled={false}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
