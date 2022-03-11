import React from "react"
import {render, cleanup, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {FacetSearch} from "."
import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {SearchValue} from "../../ducks/viewAllModal"
import {FacetsState} from "../../models/FacetsState"

describe("View all search filter: ", () => {
    const mockSearchFilterOptions: SearchValue[] = [
        {
            n: "Amido",
            v: "brand:amido",
        },
        {
            n: "Nike",
            v: "brand:nike",
        },
        {
            n: "Adidas",
            v: "brand:adidas",
        },
    ]

    const mockFilters: FacetsState = {
        "brand:amido": {n: "Amido", c: 1, v: "brand:amido", incompatibleWith: [], d: false},
        "brand:nike": {n: "Nike", c: 1, v: "brand:nike", s: true, incompatibleWith: [], d: false},
        "brand:adidas": {n: "Adidas", c: 1, v: "brand:adidas", incompatibleWith: [], d: false},
    }

    afterEach(() => {
        cleanup()
    })
    it("should render correctly", () => {
        const handleSetFilter = jest.fn()
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetSearch
                    displayName="Test filter name"
                    facets={mockFilters}
                    searchFacets={mockSearchFilterOptions}
                    handleSetFilterModal={handleSetFilter}
                    text={mockText}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should fire handleSetFilter using keys", () => {
        const handleSetFilter = jest.fn()
        const {getByRole, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetSearch
                    displayName="Test filter name"
                    facets={mockFilters}
                    searchFacets={mockSearchFilterOptions}
                    handleSetFilterModal={handleSetFilter}
                    text={mockText}
                />
            </ThemeProvider>,
        )
        const autocomplete = getByTestId("plp-facet-search")
        const input = getByRole("textbox")
        autocomplete.focus()
        fireEvent.change(input, {target: {value: "a"}})
        fireEvent.keyDown(autocomplete, {key: "ArrowDown"})
        fireEvent.keyDown(autocomplete, {key: "Enter"})
        expect(handleSetFilter).toHaveBeenCalledWith("brand:adidas")
    })

    it("should not fire handleSetFilter when search doesn't match", () => {
        const handleSetFilter = jest.fn()
        const {getByRole, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetSearch
                    displayName="Test filter name"
                    facets={mockFilters}
                    searchFacets={mockSearchFilterOptions}
                    handleSetFilterModal={handleSetFilter}
                    text={mockText}
                />
            </ThemeProvider>,
        )
        const autocomplete = getByTestId("plp-facet-search")
        const input = getByRole("textbox")
        autocomplete.focus()
        fireEvent.change(input, {target: {value: "d"}})
        fireEvent.keyDown(autocomplete, {key: "ArrowDown"})
        fireEvent.keyDown(autocomplete, {key: "Enter"})
        expect(handleSetFilter).not.toHaveBeenCalled()
    })

    it("should not fire handleSetFilter when search value is already selected", () => {
        const handleSetFilter = jest.fn()
        const {getByRole, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetSearch
                    displayName="Test filter name"
                    facets={mockFilters}
                    searchFacets={mockSearchFilterOptions}
                    handleSetFilterModal={handleSetFilter}
                    text={mockText}
                />
            </ThemeProvider>,
        )
        const autocomplete = getByTestId("plp-facet-search")
        const input = getByRole("textbox")
        autocomplete.focus()
        fireEvent.change(input, {target: {value: "n"}})
        fireEvent.change(input, {target: {value: "i"}})
        fireEvent.keyDown(autocomplete, {key: "ArrowDown"})
        fireEvent.keyDown(autocomplete, {key: "Enter"})
        expect(handleSetFilter).not.toHaveBeenCalled()
        expect(autocomplete.getAttribute("value")).toEqual(null)
    })
})
