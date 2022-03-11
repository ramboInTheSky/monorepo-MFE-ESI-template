import React from "react"
import {fireEvent, render} from "@testing-library/react"
import {Provider} from "react-redux"
import {ThemeProvider} from "styled-components"
import {Facets} from "."
import {ViewLinkOptions} from "../../config/constants"
import mockStore, {mockState, mockText, mockTheme, mockConfigureStore} from "../../../__mocks__/mockStore"

const mockFacets = ["1"]

const mockFacetsViewMore = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

const mockOpenViewAllModal = jest.fn()
const mockOnClick = jest.fn()

describe("Filter: ", () => {
    const {facets} = mockState.viewAllModal
    const handleSetFilter = jest.fn()
    it("should render correctly", () => {
        let isViewMoreOpen = false
        const {asFragment} = render(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <Facets
                        facetName="test"
                        firstFilters={mockFacets}
                        isViewMoreOpen={isViewMoreOpen}
                        toggleViewMore={() => {
                            isViewMoreOpen = !isViewMoreOpen
                        }}
                        onClick={() => {
                            mockOnClick()
                        }}
                        openViewAllModal={mockOpenViewAllModal}
                        facets={facets}
                        handleSetFilter={handleSetFilter}
                        isFetchingPageItems={false}
                        text={mockText}
                    />
                </ThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should show view more", () => {
        let isViewMoreOpen = false
        const {asFragment, queryByText} = render(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <Facets
                        facetName="test"
                        lastFilters={mockFacetsViewMore}
                        firstFilters={mockFacets}
                        isViewMoreOpen={isViewMoreOpen}
                        toggleViewMore={() => {
                            isViewMoreOpen = !isViewMoreOpen
                        }}
                        onClick={() => {
                            mockOnClick()
                        }}
                        openViewAllModal={mockOpenViewAllModal}
                        viewLink={ViewLinkOptions.viewMore}
                        facets={facets}
                        handleSetFilter={handleSetFilter}
                        isFetchingPageItems={false}
                        text={mockText}
                    />
                </ThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect(queryByText("View more")).toBeInTheDocument()
        expect(queryByText("View less")).not.toBeInTheDocument()
    })

    it("should show view less when isViewMoreOpen", () => {
        let isViewMoreOpen = true
        const {asFragment, queryByText} = render(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <Facets
                        facetName="test"
                        lastFilters={mockFacetsViewMore}
                        firstFilters={mockFacets}
                        isViewMoreOpen={isViewMoreOpen}
                        toggleViewMore={() => {
                            isViewMoreOpen = !isViewMoreOpen
                        }}
                        onClick={() => {
                            mockOnClick()
                        }}
                        openViewAllModal={mockOpenViewAllModal}
                        viewLink={ViewLinkOptions.viewMore}
                        facets={facets}
                        handleSetFilter={handleSetFilter}
                        isFetchingPageItems={false}
                        text={mockText}
                    />
                </ThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect(queryByText("View more")).not.toBeInTheDocument()
        expect(queryByText("View less")).toBeInTheDocument()
    })

    it("should show view all", () => {
        let isViewMoreOpen = false
        const {asFragment, queryByText} = render(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <Facets
                        facetName="test"
                        firstFilters={mockFacets}
                        isViewMoreOpen={isViewMoreOpen}
                        toggleViewMore={() => {
                            isViewMoreOpen = !isViewMoreOpen
                        }}
                        openViewAllModal={mockOpenViewAllModal}
                        onClick={() => mockOnClick()}
                        viewLink={ViewLinkOptions.viewAll}
                        facets={facets}
                        handleSetFilter={handleSetFilter}
                        isFetchingPageItems={false}
                        text={mockText}
                    />
                </ThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect(queryByText("View all")).toBeInTheDocument()
    })

    it("should open the tooltip if the tooltip icon is clicked", () => {
        const testFacets = {
            ...facets,
            available: {
                n: "available",
                c: 1,
                v: "feat:available",
                incompatibleWith: [],
                d: false,
            },
        }

        const stateWithEnabledTooltips = {
            ...mockState,
            features: {
                enablePageInFilters: false,
                enableSearchBanners: false,
                enableTooltips: true,
            }   
        }

        const mockStoreWithEnabledTooltips = mockConfigureStore(stateWithEnabledTooltips)

        let isViewMoreOpen = false
        const {getByTestId} = render(
            <Provider store={mockStoreWithEnabledTooltips}>
                <ThemeProvider theme={mockTheme}>
                    <Facets
                        facetName="feat"
                        firstFilters={["opt1", "opt2", "opt3", "available"]}
                        isViewMoreOpen={isViewMoreOpen}
                        toggleViewMore={() => {
                            isViewMoreOpen = !isViewMoreOpen
                        }}
                        onClick={() => {
                            mockOnClick()
                        }}
                        openViewAllModal={mockOpenViewAllModal}
                        facets={testFacets}
                        handleSetFilter={handleSetFilter}
                        isFetchingPageItems={false}
                        text={mockText}
                    />
                </ThemeProvider>
            </Provider>,
        )

        const tooltipFilterIcon = getByTestId("plp-facet-tooltip-icon-feat:available")

        expect(tooltipFilterIcon).toBeTruthy()

        fireEvent.click(tooltipFilterIcon)

        const tooltipFilter = getByTestId("plp-facet-tooltip-feat:available")
        expect(tooltipFilter).toBeTruthy()
    })

    describe("When is fetching page items", () => {
        it("should render correctly", () => {
            let isViewMoreOpen = false
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <ThemeProvider theme={mockTheme}>
                        <Facets
                            facetName="test"
                            firstFilters={mockFacets}
                            isViewMoreOpen={isViewMoreOpen}
                            toggleViewMore={() => {
                                isViewMoreOpen = !isViewMoreOpen
                            }}
                            onClick={() => {
                                mockOnClick()
                            }}
                            openViewAllModal={mockOpenViewAllModal}
                            facets={facets}
                            handleSetFilter={handleSetFilter}
                            isFetchingPageItems
                            text={mockText}
                        />
                    </ThemeProvider>
                </Provider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
})
