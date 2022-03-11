import React from "react"
import {render, fireEvent} from "@testing-library/react"
import * as MUIModule from "@mui/material"
import {ThemeProvider} from "styled-components"
import {Provider} from "react-redux"
import TrackMobileFiltersOpen from "../../events/trackEvent/events/trackMobileFiltersOpen"
import TrackMobileFiltersClosed from "../../events/trackEvent/events/trackMobileFiltersClosed"
import {ShowFilters} from "."
import mockStore, {mockTheme, mockState, mockText} from "../../../__mocks__/mockStore"

jest.mock("@mui/material/useMediaQuery")
jest.mock("../../events/trackEvent/events/trackMobileFiltersOpen")
jest.mock("../../events/trackEvent/events/trackMobileFiltersClosed")

const mockUseMediaQueryReturnedValue = (value = false) => {
    return jest.spyOn(MUIModule, "useMediaQuery").mockReturnValue(value)
}

const mockSyncTabbedFilters = jest.fn()
const mockCloseTabbedFilters = jest.fn()

describe("Given a Show filters component:", () => {
    describe("When break point is for larger screens", () => {
        beforeAll(() => {
            mockUseMediaQueryReturnedValue()
        })

        it("should match the snapshot ", () => {
            const {baseElement} = render(
                <Provider store={mockStore}>
                    <ThemeProvider theme={mockTheme}>
                        <ShowFilters
                            hasSelectedFacet={false}
                            filtersSort={mockState.search.filtersSort}
                            filters={mockState.search.filters}
                            isAnyFilterSelected={false}
                            clearAll={() => "void"}
                            syncTabbedFilters={() => "void"}
                            closeTabbedFilters={() => "void"}
                            isOpen={false}
                            text={mockText}
                        />
                    </ThemeProvider>
                </Provider>,
            )

            expect(baseElement).toMatchSnapshot()
        })
    })

    describe("When break point is not for larger screens", () => {
        beforeAll(() => {
            mockUseMediaQueryReturnedValue(true)
        })

        it("should match the snapshot correctly", () => {
            const {baseElement} = render(
                <Provider store={mockStore}>
                    <ThemeProvider theme={mockTheme}>
                        <ShowFilters
                            filtersSort={mockState.search.filtersSort}
                            filters={mockState.search.filters}
                            isAnyFilterSelected={false}
                            clearAll={() => "void"}
                            syncTabbedFilters={() => "void"}
                            closeTabbedFilters={() => "void"}
                            isOpen={false}
                            hasSelectedFacet={false}
                            text={mockText}
                        />
                    </ThemeProvider>
                </Provider>,
            )

            expect(baseElement).toMatchSnapshot()
        })

        describe("When filter drawer is opened", () => {
            it("should match snapshot correctly", () => {
                const {baseElement, getByTestId} = render(
                    <Provider store={mockStore}>
                        <ThemeProvider theme={mockTheme}>
                            <ShowFilters
                                hasSelectedFacet={false}
                                filtersSort={mockState.search.filtersSort}
                                filters={mockState.search.filters}
                                isAnyFilterSelected={false}
                                clearAll={() => "void"}
                                syncTabbedFilters={mockSyncTabbedFilters}
                                closeTabbedFilters={mockCloseTabbedFilters}
                                isOpen
                                text={mockText}
                            />
                        </ThemeProvider>
                    </Provider>,
                )

                fireEvent.click(getByTestId("plp-filters-menu-btn"))
                expect(mockSyncTabbedFilters).toHaveBeenCalledWith(true)
                expect(baseElement).toMatchSnapshot()

                expect(TrackMobileFiltersOpen).toHaveBeenCalled()
            })
        })

        describe("When filter drawer is opened and a filter is selected", () => {
            it("should match snapshot correctly", () => {
                const {baseElement, getByTestId} = render(
                    <Provider store={mockStore}>
                        <ThemeProvider theme={mockTheme}>
                            <ShowFilters
                                filtersSort={[...mockState.search.filtersSort, "Thanos the destroyer"]}
                                filters={mockState.search.filters}
                                isAnyFilterSelected
                                clearAll={() => "void"}
                                syncTabbedFilters={mockSyncTabbedFilters}
                                closeTabbedFilters={mockCloseTabbedFilters}
                                isOpen
                                hasSelectedFacet
                                text={mockText}
                            />
                        </ThemeProvider>
                    </Provider>,
                )

                fireEvent.click(getByTestId("plp-filters-menu-btn"))
                expect(mockSyncTabbedFilters).toHaveBeenCalledWith(true)
                expect(baseElement).toMatchSnapshot()
            })
        })

        describe("When filter drawer is closed after opening", () => {
            it("should close drawer and match the snapshot", () => {
                const {getByTestId, baseElement, rerender} = render(
                    <Provider store={mockStore}>
                        <ThemeProvider theme={mockTheme}>
                            <ShowFilters
                                filtersSort={mockState.search.filtersSort}
                                filters={mockState.search.filters}
                                isAnyFilterSelected={false}
                                clearAll={() => "void"}
                                syncTabbedFilters={mockSyncTabbedFilters}
                                closeTabbedFilters={mockCloseTabbedFilters}
                                isOpen={false}
                                hasSelectedFacet={false}
                                text={mockText}
                            />
                        </ThemeProvider>
                    </Provider>,
                )

                expect(() => getByTestId("plp-filters-close-button")).toThrow()
                fireEvent.click(getByTestId("plp-filters-menu-btn"))

                expect(mockSyncTabbedFilters).toHaveBeenCalledWith(true)
                rerender(
                    <Provider store={mockStore}>
                        <ThemeProvider theme={mockTheme}>
                            <ShowFilters
                                filtersSort={mockState.search.filtersSort}
                                filters={mockState.search.filters}
                                isAnyFilterSelected={false}
                                clearAll={() => "void"}
                                syncTabbedFilters={mockSyncTabbedFilters}
                                closeTabbedFilters={mockCloseTabbedFilters}
                                isOpen
                                hasSelectedFacet={false}
                                text={mockText}
                            />
                        </ThemeProvider>
                    </Provider>,
                )
                expect(getByTestId("plp-filters-close-button")).toBeTruthy()
                fireEvent.click(getByTestId("plp-filters-close-button"))
                expect(mockCloseTabbedFilters).toHaveBeenCalledWith(false)
                expect(TrackMobileFiltersClosed).toHaveBeenCalled()
                expect(baseElement).toMatchSnapshot()
            })
        })
    })

    describe("When tabbed filters is open and is in page filters breakpoint", () => {
        it("should close the tabbed filters", () => {
            render(
                <Provider store={mockStore}>
                    <ThemeProvider theme={mockTheme}>
                        <ShowFilters
                            filtersSort={mockState.search.filtersSort}
                            filters={mockState.search.filters}
                            isAnyFilterSelected={false}
                            clearAll={() => "void"}
                            syncTabbedFilters={mockSyncTabbedFilters}
                            closeTabbedFilters={mockCloseTabbedFilters}
                            isOpen={false}
                            hasSelectedFacet={false}
                            text={mockText}
                        />
                    </ThemeProvider>
                </Provider>,
            )

            expect(mockCloseTabbedFilters).toHaveBeenCalledWith(false)
        })
    })
})
