import {render} from "@testing-library/react"
import React from "react"
import {Provider} from "react-redux"
import {ThemeProvider} from "styled-components"

import {TabbedFiltersPanel} from "."
import mockStore, {mockText, mockTheme} from "../../../../__mocks__/mockStore"
import {FilterType} from "../../../config/constants"

jest.mock("../../facetsPrice", () => {
    const FacetPrice = () => <span>Facet Price</span>
    return {
        __esModule: true,
        default: FacetPrice,
    }
})
jest.mock("../tabbedFilter", () => {
    const TabbedFilter = ({filterName}) => <span>Tabbed Filter - {filterName}</span>
    return {
        __esModule: true,
        default: TabbedFilter,
    }
})

const mockAllBrands = [
    "brand:znth",
    "brand:one",
    "brand:oops",
    "brand:two",
    "brand:tcas",
    "brand:three",
    "brand:four",
    "brand:five",
    "brand:six",
    "brand:2 size",
] as string[]

describe("Given a TabbedFiltersPanel component", () => {
    describe("When no facet is present", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFiltersPanel filter={null} text={mockText} />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When filter is price filter", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFiltersPanel filter={{type: "price"} as any} text={mockText} />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        describe("and When is fetching items", () => {
            it("should render the component correctly to match the snapshot", () => {
                const {asFragment} = render(
                    <ThemeProvider theme={mockTheme}>
                        <TabbedFiltersPanel filter={{type: "price"} as any} text={mockText} isFetchingPageItems  />
                    </ThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
            })
        })
    })

    describe("When filter is feat filter", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFiltersPanel filter={{type: "feat", filters: ["znth", "one", "two", "three"]} as any} text={mockText} />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
        describe("and When is fetching items", () => {
            it("should render the component correctly to match the snapshot", () => {
                const {asFragment} = render(
                    <ThemeProvider theme={mockTheme}>
                        <TabbedFiltersPanel
                            filter={{type: "feat", name: "brand", filters: []} as any}
                            isFetchingPageItems
                            text={mockText}
                        />
                    </ThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
            })
        })
    })

    describe("When facet is filter facet", () => {
        describe("and When is fetching items with brand with no search criteria", () => {
            it("should render the component correctly to match the snapshot", () => {
                const {asFragment} = render(
                    <Provider store={mockStore}>
                        <ThemeProvider theme={mockTheme}>
                            <TabbedFiltersPanel
                                filter={
                                    {
                                        type: "filter" as FilterType,
                                        name: "brand",
                                        filters: mockAllBrands,
                                    } as any
                                }
                                text={mockText}
                            />
                        </ThemeProvider>
                    </Provider>,
                )

                expect(asFragment()).toMatchSnapshot()
            })
        })

        describe("and When is fetching items with brand with word search criteria", () => {
            it("should render the component correctly to match the snapshot", () => {
                const {asFragment} = render(
                    <Provider store={mockStore}>
                        <ThemeProvider theme={mockTheme}>
                            <TabbedFiltersPanel
                                filter={
                                    {
                                        type: "filter" as FilterType,
                                        name: "brand",
                                        filters: mockAllBrands,
                                    } as any
                                }
                                text={mockText}
                            />
                        </ThemeProvider>
                    </Provider>,
                )

                expect(asFragment()).toMatchSnapshot()
            })
        })
    })

    describe("When facet is disabled", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFiltersPanel
                        filter={{type: "filter", filters: ["znth", "one", "two", "three"], disabled: true} as any}
                        text={mockText}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
