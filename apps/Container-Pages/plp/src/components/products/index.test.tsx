import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {Provider} from "react-redux"
import mockStore, {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {Products} from "."
import {useCallbackRef} from "../../hooks/useCallbackRef"
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll"
import {useInitialScrollPosition} from "./useInitialScrollPosition"
import {useScrollPositionTracking} from "./useScrollPositionTracking"
import {publishProductSummaryHydrate} from "../../events/productSummaryHydrate"
import publishProductNumbersToMonetate from "../../events/publishProductNumbersToMonetate"
import PublishProductSummaryTrackPage from "../../events/publishProductSummaryTrackPage"

jest.mock("./useInitialScrollPosition")
jest.mock("./useScrollPositionTracking")
jest.mock("../../hooks/useCallbackRef")
jest.mock("../../hooks/useInfiniteScroll")
jest.mock("../../events/productSummaryHydrate")
jest.mock("../../events/publishProductNumbersToMonetate")
jest.mock("../../events/publishProductSummaryTrackPage")

jest.mock("../spinner", () => ({
    ConnectSpinner: jest.fn(mockComponent("Spinner")),
    ConnectPrevNextSpinner: jest.fn(mockComponent("PrevNextSpinner")),
}))

jest.mock("../productsHeader", () => ({
    __esModule: true,
    default: jest.fn(mockComponent("ProductsHeader")),
}))

jest.mock("../backToTop", () => ({
    __esModule: true,
    default: jest.fn(mockComponent("BackToTop")),
}))

jest.mock("./components", () => ({
    ProductGrid: jest.fn(mockComponent("ProductGrid")),
    ProductsRoot: jest.fn(mockComponent("ProductsRoot")),
    ProductGridItem: jest.fn(mockComponent("ProductGridItem")),
    LoadingIconPrevNextPageContainer: jest.fn(mockComponent("LoadingIconPrevNextPageContainer")),
    NoResultsContainer: jest.fn(mockComponent("NoResultsContainer")),
    LoadingIconContainer: jest.fn(mockComponent("LoadingIconContainer")),
    LoadingIcon: jest.fn(mockComponent("LoadingIcon")),
    LoadingIconPrevNextPage: jest.fn(mockComponent("LoadingIconPrevNextPage")),
    ProductGridWrapper: jest.fn(mockComponent("ProductGridWrapper")),
}))

jest.mock("../product", () => ({
    __esModule: true,
    default: jest.fn(({itemNumber, newIn, html}) => (
        <>
            itemNumber: {itemNumber}, newIn: {String(newIn)}, {html && <>html: {html}</>}
        </>
    )),
}))

function mockUseCallbackRef(ref) {
    ;(useCallbackRef as jest.Mock).mockReturnValue([ref, jest.fn()])
}

function mockComponent(name: string) {
    // eslint-disable-next-line
    return ({children, ...otherProps}) => (
        <div {...otherProps}>
            {name} {children}
        </div>
    )
}

const defaultProps = {
    endPage: 1,
    startPage: 1,
    itemsPerPage: 10,
    hasNextPage: true,
    requestedPage: 5,
    hasPreviousPage: false,
    fetchPreviousPage: jest.fn(),
    fetchNextPage: jest.fn(),
    isFetchingNextPage: false,
    isFetchingPreviousPage: true,
    isFetchingPageItems: false,
    unfixFacets: jest.fn(),
    fixFacets: jest.fn(),
    items: [
        {itemNumber: "1", newIn: true},
        {itemNumber: "2", newIn: false, html: "foo..."},
    ],
    siteUrl: "www.test.com",
    useDevEsi: false,
    fetchTriggerOffset: 13,
    isAutocorrected: false,
    hasSelectedFilters: false,
    text: mockText,
    url: "www.test.com/shop?p=2",
    searchCategoryId: "test cat id",
    searchCategoryName: "test cat name",
    pushSearchResultsEvent: jest.fn(),
}

describe("Given the <Products /> component,", () => {
    describe("When initially rendered,", () => {
        const gridContainerElement = document.createElement("div")

        beforeAll(() => {
            jest.clearAllMocks()
            mockUseCallbackRef(gridContainerElement)
            render(
                <ThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <Products {...defaultProps} />
                    </Provider>
                </ThemeProvider>,
            )
        })

        it("should pass the correct props to the `useInfiniteScroll` hook", () => {
            const {
                items,
                endPage,
                startPage,
                fixFacets,
                unfixFacets,
                hasNextPage,
                itemsPerPage,
                hasPreviousPage,
                fetchPreviousPage,
                fetchNextPage,
                isFetchingNextPage,
                isFetchingPreviousPage,
                isFetchingPageItems,
            } = defaultProps

            expect(useInfiniteScroll).toHaveBeenCalledWith({
                endPage,
                startPage,
                hasNextPage,
                itemsPerPage,
                hasPreviousPage,
                fetchPreviousPage,
                fetchNextPage,
                isFetchingNextPage,
                isFetchingPreviousPage,
                isFetchingPageItems,
                gridContainerElement,
                fetchTriggerOffset: 13,
                totalItems: items.length,
                onBeforeFetchingPreviousPage: fixFacets,
                onAfterRestoringUpScrollPosition: unfixFacets,
            })
        })

        it("should pass the correct props to the `useInitialScrollPosition` hook", () => {
            const {itemsPerPage, requestedPage, fixFacets, unfixFacets} = defaultProps
            expect(useInitialScrollPosition).toHaveBeenCalledWith({
                itemsPerPage,
                requestedPage,
                gridContainerElement,
                onWillRepositionScroll: fixFacets,
                onAfterScrollReposition: unfixFacets,
            })
        })

        it("should pass the correct props to `useScrollPositionTracking`", () => {
            const {startPage, itemsPerPage} = defaultProps
            expect(useScrollPositionTracking).toHaveBeenCalledWith({
                startPage,
                itemsPerPage,
                gridContainerElement,
            })
        })

        it("should publish the product summary hydrate event", () => {
            expect(publishProductSummaryHydrate).toHaveBeenCalledTimes(1)
        })
        it("should publish products to monetate", () => {
            expect(publishProductNumbersToMonetate).toHaveBeenCalledWith(["1", "2"])
        })

        it("should publish products to  Data layer", () => {
            expect(PublishProductSummaryTrackPage).toHaveBeenCalledWith([
                {itemNumber: "1", index: 0},
                {itemNumber: "2", index: 1},
            ])
        })

        it("should publish search Results Event", () => {
            expect(defaultProps.pushSearchResultsEvent).toHaveBeenCalled()
        })
    })

    describe("When previous page is loading,", () => {
        it("should render the previous page loading indicator", () => {
            jest.clearAllMocks()
            const props = {...defaultProps, isFetchingNextPage: false, isFetchingPreviousPage: true, text: mockText}
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <Products {...props} />
                    </Provider>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When the next page is loading,", () => {
        it("should render the next page loading indicator", () => {
            jest.clearAllMocks()
            const props = {...defaultProps, isFetchingNextPage: true, isFetchingPreviousPage: false, text: mockText}
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <Products {...props} />
                    </Provider>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When page items are being fetched", () => {
        it("should render the next page loading indicator", () => {
            const props = {
                ...defaultProps,
                isFetchingNextPage: false,
                isFetchingPreviousPage: false,
                isFetchingPageItems: true,
                text: mockText,
            }
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <Products {...props} />
                    </Provider>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given no items are present", () => {
        describe("When a request is in progress", () => {
            it("should not render a no results message", () => {
                const props = {
                    ...defaultProps,
                    items: [],
                    isFetchingNextPage: false,
                    isFetchingPreviousPage: false,
                    isFetchingPageItems: true,
                    text: mockText,
                }
                const {asFragment, queryByTestId} = render(
                    <ThemeProvider theme={mockTheme}>
                        <Provider store={mockStore}>
                            <Products {...props} />
                        </Provider>
                    </ThemeProvider>,
                )
                expect(queryByTestId("plp-no-results-container")).not.toBeInTheDocument()
                expect(asFragment()).toMatchSnapshot()
            })
        })

        describe("When a request has finished", () => {
            it("should render a no results message", () => {
                const props = {
                    ...defaultProps,
                    items: [],
                    isFetchingNextPage: false,
                    isFetchingPreviousPage: false,
                    isFetchingPageItems: false,
                    text: mockText,
                }
                const {asFragment, queryByTestId} = render(
                    <ThemeProvider theme={mockTheme}>
                        <Provider store={mockStore}>
                            <Products {...props} />
                        </Provider>
                    </ThemeProvider>,
                )
                expect(queryByTestId("plp-no-results-container")).toBeInTheDocument()
                expect(asFragment()).toMatchSnapshot()
            })
        })
    })
})
