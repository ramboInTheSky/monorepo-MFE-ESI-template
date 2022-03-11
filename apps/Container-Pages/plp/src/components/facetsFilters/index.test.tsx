/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme, mockText as text} from "../../../__mocks__/mockStore"
import {FacetsFilters} from "."
import Facets from "../facets"
import FacetsPrice from "../facetsPrice"

jest.mock("../facets", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => <div>TEST FACETS</div>),
}))

jest.mock("../facetsPrice", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => <div>TEST PRICE FACET</div>),
}))

const clearTypeFiltersMock = jest.fn()

describe("Facets - Filters: ", () => {
    describe("When rendering for filters", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsFilters
                        name="TEST_NAME"
                        displayName="TEST DISPLAY NAME"
                        isOpen={false}
                        toggleExpansionPanel={() => {}}
                        type="filter"
                        clearTypeFilters={clearTypeFiltersMock}
                        isFilterSelected
                        text={text}
                    />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
            expect(screen.queryByTestId("plp-facets-filters-test_name")).not.toBeInTheDocument()
        })
        it("When clicking the facet header, should display fiters, passing filters", () => {
            let isOpen = false
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsFilters
                        name="TEST_NAME"
                        displayName="TEST DISPLAY NAME"
                        isOpen={isOpen}
                        toggleExpansionPanel={() => {
                            isOpen = !isOpen
                        }}
                        type="filter"
                        clearTypeFilters={clearTypeFiltersMock}
                        isFilterSelected
                        text={text}
                    />
                </ThemeProvider>,
            )
            fireEvent.click(getByTestId("plp-f-f-test_name"))
            expect(
                render(
                    <ThemeProvider theme={mockTheme}>
                        <FacetsFilters
                            name="TEST_NAME"
                            displayName="TEST DISPLAY NAME"
                            isOpen={isOpen}
                            toggleExpansionPanel={() => {
                                isOpen = !isOpen
                            }}
                            type="filter"
                            clearTypeFilters={clearTypeFiltersMock}
                            isFilterSelected
                            text={text}
                        />
                    </ThemeProvider>,
                ).asFragment(),
            ).toMatchSnapshot()
            expect(Facets).toHaveBeenCalledWith(
                {
                    facetName: "TEST_NAME",
                },
                {},
            )
        })

        it("should show the clear link for test_name", () => {
            let isOpen = false
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsFilters
                        name="TEST_NAME"
                        displayName="TEST DISPLAY NAME"
                        isOpen={isOpen}
                        toggleExpansionPanel={() => {
                            isOpen = !isOpen
                        }}
                        type="filter"
                        clearTypeFilters={clearTypeFiltersMock}
                        isFilterSelected
                        text={text}
                    />
                </ThemeProvider>,
            )
            fireEvent.click(getByTestId("plp-filter-clear-link-test_name"))
            expect(clearTypeFiltersMock).toHaveBeenCalled()
            expect(clearTypeFiltersMock).toHaveBeenCalledWith()
        })

        it("should not snapshot the clear links when isFilterSelected is not provided in the props or set to false", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsFilters
                        name="TEST_NAME"
                        displayName="TEST DISPLAY NAME"
                        isOpen={false}
                        toggleExpansionPanel={() => {}}
                        type="filter"
                        clearTypeFilters={clearTypeFiltersMock}
                        text={text}
                    />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
            expect(screen.queryByTestId("plp-filter-clear-link-test_name")).not.toBeInTheDocument()
        })
    })
    describe("When rendering for Price Facets", () => {
        it("When clicking the facet header, should display fiters, passing filters", () => {
            let isOpen = false
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsFilters
                        name="TEST_NAME"
                        displayName="TEST DISPLAY NAME"
                        isOpen={isOpen}
                        toggleExpansionPanel={() => {
                            isOpen = !isOpen
                        }}
                        type="price"
                        clearTypeFilters={clearTypeFiltersMock}
                        isFilterSelected
                        text={text}
                    />
                </ThemeProvider>,
            )
            fireEvent.click(getByTestId("plp-f-f-test_name"))
            expect(
                render(
                    <ThemeProvider theme={mockTheme}>
                        <FacetsFilters
                            name="TEST_NAME"
                            displayName="TEST DISPLAY NAME"
                            isOpen={isOpen}
                            toggleExpansionPanel={() => {
                                isOpen = !isOpen
                            }}
                            type="price"
                            clearTypeFilters={clearTypeFiltersMock}
                            isFilterSelected
                            text={text}
                        />
                    </ThemeProvider>,
                ).asFragment(),
            ).toMatchSnapshot()
            expect(FacetsPrice).toHaveBeenCalledWith(
                {
                    name: "TEST_NAME",
                },
                {},
            )
        })
        it("When clicking the clear link", () => {
            let isOpen = false
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <FacetsFilters
                        name="TEST_NAME"
                        displayName="TEST DISPLAY NAME"
                        isOpen={isOpen}
                        toggleExpansionPanel={() => {
                            isOpen = !isOpen
                        }}
                        type="price"
                        clearTypeFilters={clearTypeFiltersMock}
                        isFilterSelected
                        text={text}
                    />
                </ThemeProvider>,
            )
            fireEvent.click(getByTestId("plp-filter-clear-link-test_name"))
            expect(clearTypeFiltersMock).toHaveBeenCalled()
            expect(clearTypeFiltersMock).toHaveBeenCalledWith()
        })
    })
})
