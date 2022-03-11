import {fireEvent, render} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"

import {TabbedFilter, TabbedFilterRenderer} from "."
import {mockTheme} from "../../../../__mocks__/mockStore"

const mockOnFilterSelect = jest.fn()

describe("Given a TabbedFilter component", () => {
    it("should render the component correctly to match the snapshot", () => {
        const {asFragment, getByTestId, rerender} = render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilter
                    filterState={{
                        n: "Brand",
                        c: 20,
                        v: "feat:newin",
                        incompatibleWith: [],
                        d: false,
                        s: false,
                    }}
                    onFilterSelect={mockOnFilterSelect}
                    filterName=""
                    tabAutoFocus
                />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()

        const button = getByTestId("plp-tabbed-key-filter-button-feat:newin")
        fireEvent(
            button,
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            }),
        )
        expect(asFragment()).toMatchSnapshot()

        expect(mockOnFilterSelect).toHaveBeenCalled()

        rerender(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilter
                    filterState={{
                        n: "Brand",
                        c: 20,
                        v: "feat:newin",
                        incompatibleWith: [],
                        d: false,
                        s: true,
                    }}
                    onFilterSelect={mockOnFilterSelect}
                    filterName=""
                    tabAutoFocus
                />
            </ThemeProvider>,
        )
    })

    it("When disabled, it should render the component correctly to match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilter
                    filterState={{
                        n: "Brand",
                        c: 20,
                        v: "feat:newin",
                        incompatibleWith: [],
                        d: true,
                        s: false,
                    }}
                    onFilterSelect={mockOnFilterSelect}
                    filterName=""
                    tabAutoFocus
                />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it("When is a non key filter, it should render the component correctly to match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilter
                    filterState={{
                        n: "Brand",
                        c: 20,
                        v: "brand:dolce&gabbana",
                        incompatibleWith: [],
                        d: true,
                        s: false,
                    }}
                    onFilterSelect={mockOnFilterSelect}
                    filterName=""
                    isTabbedFilter
                    tabAutoFocus
                />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    describe("When filter is loading and selected is not true after 5 seconds", () => {
        beforeEach(() => {
            jest.useFakeTimers()
        })

        it("should set loading to false", () => {
            const {getByTestId, asFragment, rerender} = render(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFilter
                        filterState={{
                            n: "Brand",
                            c: 20,
                            v: "brand:dolce&gabbana",
                            incompatibleWith: [],
                            d: false,
                            s: false,
                        }}
                        onFilterSelect={mockOnFilterSelect}
                        filterName=""
                        isTabbedFilter
                        tabAutoFocus
                    />
                </ThemeProvider>,
            )

            const button = getByTestId("plp-tabbed-facet-button-brand:dolce&gabbana")
            fireEvent(
                button,
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                }),
            )
            rerender(
                <ThemeProvider theme={mockTheme}>
                    <TabbedFilter
                        filterState={{
                            n: "Brand",
                            c: 20,
                            v: "brand:dolce&gabbana",
                            incompatibleWith: [],
                            d: false,
                            s: false,
                        }}
                        onFilterSelect={mockOnFilterSelect}
                        filterName=""
                        isTabbedFilter
                        tabAutoFocus
                    />
                </ThemeProvider>,
            )

            jest.runOnlyPendingTimers()

            expect(asFragment()).toMatchSnapshot()
        })
    })
})

describe("Given a TabbedFilterRenderer component", () => {
    it("should render nothing when there is no filter state", () => {
        const {asFragment} = render(
            <TabbedFilterRenderer filterState={null as any} onFilterSelect={jest.fn()} filterName="" tabAutoFocus />,
        )
        expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`)
    })

    it("should render component to match snapshot when there is filter state", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilterRenderer
                    filterState={{
                        n: "Brand",
                        c: 20,
                        v: "brand:dolce&gabbana",
                        incompatibleWith: [],
                        d: false,
                        s: false,
                    }}
                    onFilterSelect={jest.fn()}
                    filterName=""
                    tabAutoFocus
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
