import React from "react"
import {Provider} from "react-redux"
import {ThemeProvider} from "styled-components"
import {render, screen} from "@testing-library/react"
import mockStore, {mockState, mockText, mockTheme} from "../../../__mocks__/mockStore"
import {ResultsTitle} from "."
import {SearchApiRequestTypes} from "../../config/constants"

jest.mock("../seoHeading", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => `<h1>Test</h1>`),
}))

const the = {
    titleText: () => screen.getByTestId("plp-results-title"),
    productText: () => screen.getByTestId("plp-product-title"),
    noResultsText: () => screen.queryByTestId("plp-no-results-text"),
}

describe("Results Title: ", () => {
    describe("For non autocorrected search", () => {
        describe("For keyword search", () => {
            beforeEach(() => {
                const props = {
                    type: SearchApiRequestTypes.Keyword,
                    relaxedQuery: "",
                    facets: mockState.search.facets,
                    title: "Dresses",
                    totalResults: 1234,
                    isAutocorrected: false,
                    originalSearchTerm: null,
                    hasSelectedFilters: false,
                    searchBannerHtml: "<div />",
                    overrideHeading: false,
                    text: mockText
                }
                render(
                    <ThemeProvider theme={mockTheme}>
                        <ResultsTitle {...props} />
                    </ThemeProvider>,
                )
            })
            it("should wrap the title text with quotes", () => {
                expect(the.titleText()).toHaveTextContent('"Dresses"')
            })

            it("should not display the no results text", () => {
                expect(the.noResultsText()).not.toBeInTheDocument()
            })
        })

        describe("For category search", () => {
            beforeEach(() => {
                const props = {
                    type: SearchApiRequestTypes.Category,
                    relaxedQuery: "",
                    facets: mockState.search.facets,
                    title: "Dresses",
                    totalResults: 1234,
                    isAutocorrected: false,
                    originalSearchTerm: null,
                    hasSelectedFilters: false,
                    searchBannerHtml: "<div />",
                    overrideHeading: false,
                    text: mockText
                }
                render(
                    <ThemeProvider theme={mockTheme}>
                        <ResultsTitle {...props} />
                    </ThemeProvider>,
                )
            })
            it("should not wrap the title with", () => {
                expect(the.productText()).toHaveTextContent("1234 Dresses")
                expect(the.productText()).not.toHaveTextContent('"Dresses"')
            })

            it("should not display the no results text", () => {
                expect(the.noResultsText()).not.toBeInTheDocument()
            })
        })

        describe("For category search with overrideHeading enabled", () => {
            const props = {
                type: SearchApiRequestTypes.Category,
                relaxedQuery: "",
                    facets: mockState.search.facets,
                title: "Dresses",
                totalResults: 1234,
                isAutocorrected: false,
                originalSearchTerm: null,
                hasSelectedFilters: false,
                searchBannerHtml: "<div />",
                overrideHeading: true,
                text: mockText
            }

            it("should not display default results text", () => {
                const {asFragment} = render(
                    <Provider store={mockStore}>
                        <ThemeProvider theme={mockTheme}>
                            <ResultsTitle {...props} />
                        </ThemeProvider>
                    </Provider>,
                )
                expect(asFragment()).toMatchSnapshot()
                expect(the.productText()).not.toHaveTextContent("1234 Dresses")
            })
        })
    })

    describe("For autocorrected search", () => {
        describe("For keyword search without filters", () => {
            beforeEach(() => {
                const props = {
                    type: SearchApiRequestTypes.Keyword,
                    relaxedQuery: "",
                    facets: mockState.search.facets,
                    title: "Dress",
                    totalResults: 1234,
                    isAutocorrected: true,
                    originalSearchTerm: "drass",
                    hasSelectedFilters: false,
                    searchBannerHtml: "<div />",
                    overrideHeading: false,
                    text: mockText
                }
                render(
                    <ThemeProvider theme={mockTheme}>
                        <ResultsTitle {...props} />
                    </ThemeProvider>,
                )
            })
            it("should display the correct title text", () => {
                expect(the.titleText()).toHaveTextContent('Showing results for "Dress" (1234)')
            })

            it("should display the `no results` text", () => {
                expect(the.noResultsText()).toHaveTextContent('0 results for "drass"')
            })
        })

        describe("For keyword search with filters", () => {
            beforeEach(() => {
                const props = {
                    type: SearchApiRequestTypes.Keyword,
                    relaxedQuery: "",
                    facets: mockState.search.facets,
                    title: "Dresses",
                    totalResults: 1234,
                    isAutocorrected: true,
                    originalSearchTerm: "drass",
                    hasSelectedFilters: true,
                    searchBannerHtml: "<div />",
                    overrideHeading: false,
                    text: mockText
                }
                render(
                    <ThemeProvider theme={mockTheme}>
                        <ResultsTitle {...props} />
                    </ThemeProvider>,
                )
            })
            it("should display the regular title text", () => {
                expect(the.titleText()).toHaveTextContent('"Dresses"')
            })

            it("should not display the `no results` text", () => {
                expect(the.noResultsText()).not.toBeInTheDocument()
            })
        })
    })

    describe("For searches with relaxedQuery", () => {
        describe("For keyword search without filters", () => {
            beforeEach(() => {
                const props = {
                    type: SearchApiRequestTypes.Keyword,
                    relaxedQuery: "jeans",
                    facets: mockState.search.facets,
                    title: "red jeans mens old",
                    totalResults: 1234,
                    isAutocorrected: false,
                    originalSearchTerm: "red jeans mens old",
                    hasSelectedFilters: false,
                    searchBannerHtml: "<div />",
                    overrideHeading: false,
                    text: mockText
                }
                render(
                    <ThemeProvider theme={mockTheme}>
                        <ResultsTitle {...props} />
                    </ThemeProvider>,
                )
            })
            it("should display the correct title text", () => {
                expect(the.titleText()).toHaveTextContent('Showing results for nearest matches')
            })

            it("should display the `no results` text", () => {
                expect(the.noResultsText()).toHaveTextContent('0 results for "red jeans mens old"')
            })
        })
        describe("For keyword search with filters", () => {
            beforeEach(() => {
                const props = {
                    type: SearchApiRequestTypes.Keyword,
                    relaxedQuery: "jeans",
                    facets: {
                        opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                        opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                        opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
                    },
                    title: "red jeans mens old",
                    totalResults: 1234,
                    isAutocorrected: false,
                    originalSearchTerm: "red jeans mens old",
                    hasSelectedFilters: true,
                    searchBannerHtml: "<div />",
                    overrideHeading: false,
                    text: mockText
                }
                render(
                    <ThemeProvider theme={mockTheme}>
                        <ResultsTitle {...props} />
                    </ThemeProvider>,
                )
            })
            it("should display the correct title text", () => {
                expect(the.titleText()).toHaveTextContent('jeans')
            })

            it("should display the `no results` text", () => {
                expect(the.noResultsText()).not.toBeInTheDocument()
            })
        })
    })
})
