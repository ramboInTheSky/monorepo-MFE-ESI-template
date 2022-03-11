import React, {createRef} from "react"
import {render, cleanup, fireEvent, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {FiltersComponent} from "."
import {Filters as FilterModel} from "../../models/Filter"
import * as FiltersHookModule from "./useShowFilters"
import * as HideFixedItemsModule from "../../hooks/useHideFixedItems"

jest.mock("../facetsFilters", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST FACETS FILTERS</div>,
}))

jest.mock("../facetsFeats", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST FACETS FEATS</div>,
}))

jest.mock("../openFilterButton", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST OPEN FILTERS BUTTON</div>,
}))

function mockUseShowFacetsHook(value: Partial<ReturnType<typeof FiltersHookModule.useShowFilters>> = {}) {
    const mockResult: ReturnType<typeof FiltersHookModule.useShowFilters> = {
        facetAbsoluteTop: 20,
        facetsContainerRef: createRef(),
        showFixedFacets: false,
        showOpenFilterBtn: false,
        handleOpenFilterBtnClick: jest.fn(),
        infoContainerTop: 10,
        infoContainerRef: createRef(),
        containerRef: createRef(),
        underlayElementHeight: 0,
        totalProductsHeight: 0,
        totalProductsRef: createRef(),
    }
    jest.spyOn(FiltersHookModule, "useShowFilters").mockReturnValue({...mockResult, ...value})
}

function mockUseHideFixedItems(hideFixedItems: boolean) {
    jest.spyOn(HideFixedItemsModule, "useHideFixedItems").mockReturnValue({hideFixedItems})
}

const clearAllFiltersMock = jest.fn()

describe("Facets: ", () => {
    beforeEach(() => {
        mockUseShowFacetsHook()
        mockUseHideFixedItems(false)
    })
    afterEach(() => {
        cleanup()
    })

    describe("When has reached footer", () => {
        it("should match the snapshot", () => {
            mockUseHideFixedItems(true)
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersComponent
                        clearAllFilters={clearAllFiltersMock}
                        isFilterSelected
                        locale="en-gb"
                        totalResults={9999}
                        filters={mockFilters}
                        consolidatedFilters={["TEST NAME", "TEST NAME2", "TEST NAME3"]}
                        text={mockText}
                    />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    it("When no filters are supplied, it should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FiltersComponent
                    clearAllFilters={clearAllFiltersMock}
                    totalResults={9999}
                    filters={null as any}
                    consolidatedFilters={[]}
                    isFilterSelected
                    locale="en-gb"
                    text={mockText}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    const mockFacetsOptions = ["TEST 1"]

    const mockFilters: FilterModel = {
        "TEST NAME": {
            name: "TEST NAME",
            displayName: "TEST DISPLAY NAME",
            type: "feat",
            facets: [],
            isFilterOpen: true,
            isViewMoreOpen: false,
        },
        "TEST NAME2": {
            name: "TEST NAME",
            displayName: "TEST DISPLAY NAME",
            type: "filter",
            facets: mockFacetsOptions,
            isFilterOpen: true,
            isViewMoreOpen: false,
        },
        "TEST NAME3": {
            name: "TEST NAME",
            displayName: "TEST DISPLAY NAME",
            type: "price",
            facets: mockFacetsOptions,
            isFilterOpen: true,
            isViewMoreOpen: false,
        },
    }

    describe("When isFilterSelected is not passed in the props", () => {
        it("should match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersComponent
                        clearAllFilters={clearAllFiltersMock}
                        totalResults={9999}
                        filters={mockFilters}
                        consolidatedFilters={["TEST NAME", "TEST NAME2", "TEST NAME3"]}
                        locale="en-gb"
                        text={mockText}
                    />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("When all filters are supplied", () => {
        it("should match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersComponent
                        clearAllFilters={clearAllFiltersMock}
                        isFilterSelected
                        locale="en-gb"
                        totalResults={9999}
                        filters={mockFilters}
                        consolidatedFilters={["TEST NAME", "TEST NAME2", "TEST NAME3"]}
                        text={mockText}
                    />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    it("should have role='status' for plp-total-products element for compliant for accessiblilty (AA)", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <FiltersComponent
                    clearAllFilters={clearAllFiltersMock}
                    isFilterSelected
                    locale="en-gb"
                    totalResults={9999}
                    filters={mockFilters}
                    consolidatedFilters={["TEST NAME", "TEST NAME2", "TEST NAME3"]}
                    text={mockText}
                />
            </ThemeProvider>,
        )

        expect(getByTestId("plp-total-products")).toHaveAttribute("role", "status")
    })
    describe("When clicking the clear link", () => {
        it("should call clearAllFilters function", () => {
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersComponent
                        clearAllFilters={clearAllFiltersMock}
                        isFilterSelected
                        locale="en-gb"
                        totalResults={9999}
                        filters={mockFilters}
                        consolidatedFilters={["TEST NAME", "TEST NAME2", "TEST NAME3"]}
                        text={mockText}
                    />
                </ThemeProvider>,
            )
            fireEvent.click(getByTestId("plp-filter-clear-all-link"))
            expect(clearAllFiltersMock).toHaveBeenCalled()
        })
    })

    describe("When 'showFixedFacets' is true", () => {
        beforeEach(() => {
            mockUseShowFacetsHook({showFixedFacets: true})
        })

        it("should render the filter button to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersComponent
                        clearAllFilters={clearAllFiltersMock}
                        isFilterSelected
                        locale="en-gb"
                        totalResults={9999}
                        filters={mockFilters}
                        consolidatedFilters={["TEST NAME", "TEST NAME2", "TEST NAME3"]}
                        text={mockText}
                    />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When 'showOpenFilterBtn' is true", () => {
        beforeEach(() => {
            mockUseShowFacetsHook({showOpenFilterBtn: true})
        })

        it("should render the openFilterButton component", () => {
            render(
                <ThemeProvider theme={mockTheme}>
                    <FiltersComponent
                        clearAllFilters={clearAllFiltersMock}
                        isFilterSelected
                        locale="en-gb"
                        totalResults={9999}
                        filters={mockFilters}
                        consolidatedFilters={["TEST NAME", "TEST NAME2", "TEST NAME3"]}
                        text={mockText}
                    />
                </ThemeProvider>,
            )
            const text = screen.getByText(/TEST OPEN FILTERS BUTTON/i)
            expect(text).toBeInTheDocument()
        })
    })
})
