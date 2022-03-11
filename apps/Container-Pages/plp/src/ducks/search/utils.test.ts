import {
    calculateStartItem,
    selectFetchTriggerOffsetRows,
    selectItemsPerRow,
    selectFetchTriggerOffset,
    selectSubsequentItemsPerPage,
    selectSubsequentPagesNonLazyloadRows,
    getLazyloadItemIndexFrom,
    getInitialPage,
    formatSearchState,
} from "./utils"

describe("Ducks - search - utils", () => {
    describe("calculateStartItem()", () => {
        it("should return 0 as a start item", () => {
            const pageToFetch = 1
            const initialItemsPerPage = 24
            const subsequentItemsPerPage = 24

            expect(calculateStartItem(pageToFetch, initialItemsPerPage, subsequentItemsPerPage)).toEqual(0)
        })
        it("should return 24 as a start item", () => {
            const pageToFetch = 2
            const initialItemsPerPage = 24
            const subsequentItemsPerPage = 24

            expect(calculateStartItem(pageToFetch, initialItemsPerPage, subsequentItemsPerPage)).toEqual(24)
        })
        it("should return 12 as a start item", () => {
            const pageToFetch = 2
            const initialItemsPerPage = 12
            const subsequentItemsPerPage = 24

            expect(calculateStartItem(pageToFetch, initialItemsPerPage, subsequentItemsPerPage)).toEqual(12)
        })
        it("should return 84 as a start item", () => {
            const pageToFetch = 5
            const initialItemsPerPage = 12
            const subsequentItemsPerPage = 24

            expect(calculateStartItem(pageToFetch, initialItemsPerPage, subsequentItemsPerPage)).toEqual(84)
        })
    })

    describe("Given `selectItemsPerRow`", () => {
        describe("when enablePageInFilters is true", () => {
            it("should give me correct selectItemsPerRow value from breakpoint", () => {
                const state = {
                    search: {
                        itemsPerRow: {
                            inPageFiltersEnabled: {
                                xs: 2,
                                sm: 2,
                                md: 2,
                                lg: 3,
                                xl: 4,
                            },
                            default: {
                                xs: 2,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 4,
                            },
                        },
                        currentBreakpoint: "lg",
                    },
                    features: {
                        enablePageInFilters: true,
                    },
                } as any

                expect(selectItemsPerRow(state)).toEqual(3)
            })
        })
        describe("when enablePageInFilters is false", () => {
            it("should give me correct selectItemsPerRow value from breakpoint", () => {
                const state = {
                    search: {
                        itemsPerRow: {
                            inPageFiltersEnabled: {
                                xs: 2,
                                sm: 2,
                                md: 2,
                                lg: 3,
                                xl: 4,
                            },
                            default: {
                                xs: 2,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: 4,
                            },
                        },
                        currentBreakpoint: "lg",
                    },
                    features: {
                        enablePageInFilters: false,
                    },
                } as any

                expect(selectItemsPerRow(state)).toEqual(3)
            })
        })
    })

    describe("Given `selectSubsequentItemsPerPage`", () => {
        it("should give me itemsPerPage subsequent tablet ", () => {
            const state = {
                search: {
                    itemsPerPage: {
                        initial: {
                            mobile: 8,
                            tablet: 12,
                            desktop: 24,
                        },
                        subsequent: {
                            mobile: 10,
                            tablet: 16,
                            desktop: 28,
                        },
                    },
                    currentBreakpoint: "lg",
                },
            } as any

            expect(selectSubsequentItemsPerPage(state)).toEqual(28)
        })
    })
    describe("Given `selectSubsequentPagesNonLazyloadRows`", () => {
        it("should return 7 as current breakpoint is lg", () => {
            const state = {
                search: {
                    subsequentPagesNonLazyloadRows: {
                        xs: 4,
                        sm: 5,
                        md: 6,
                        lg: 7,
                        xl: 8,
                    },
                    currentBreakpoint: "lg",
                },
            } as any

            expect(selectSubsequentPagesNonLazyloadRows(state)).toEqual(7)
        })
    })
    describe("Given `getLazyloadItemIndexFrom`", () => {
        it("should return 8 as current breakpoint is xl", () => {
            const state = {
                search: {
                    subsequentPagesNonLazyloadRows: {
                        xs: 2,
                        sm: 2,
                        md: 2,
                        lg: 2,
                        xl: 2,
                    },
                    fetchTriggerOffsetRows: {
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 4,
                    },
                    itemsPerRow: {
                        inPageFiltersEnabled: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 3,
                            xl: 4,
                        },
                        default: {
                            xs: 2,
                            sm: 2,
                            md: 3,
                            lg: 3,
                            xl: 4,
                        },
                    },
                    currentBreakpoint: "xl",
                },
                features: {
                    enablePageInFilters: true,
                },
            } as any

            expect(getLazyloadItemIndexFrom(state)).toEqual(8)
        })
    })
    describe("Given `selectFetchTriggerOffsetRows`", () => {
        it("should give me correct offset row", () => {
            const state = {
                search: {
                    fetchTriggerOffsetRows: {
                        xs: 1,
                        sm: 1,
                        md: 2,
                        lg: 3,
                        xl: 4,
                    },
                    currentBreakpoint: "lg",
                },
            } as any

            expect(selectFetchTriggerOffsetRows(state)).toEqual(3)
        })
    })
    describe("Given `selectFetchTriggerOffset`", () => {
        it("should give me correct fetchTriggerOffset value", () => {
            const state = {
                search: {
                    itemsPerRow: {
                        inPageFiltersEnabled: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 3,
                            xl: 4,
                        },
                        default: {
                            xs: 2,
                            sm: 2,
                            md: 3,
                            lg: 3,
                            xl: 4,
                        },
                    },
                    fetchTriggerOffsetRows: {
                        xs: 3,
                        sm: 3,
                        md: 3,
                        lg: 3,
                        xl: 3,
                    },
                    currentBreakpoint: "lg",
                },
                features: {
                    enablePageInFilters: true,
                },
            } as any

            expect(selectFetchTriggerOffset(state)).toEqual(9)
        })
    })

    describe("Given getInitialPage", () => {
        const mockItemsPerPage = {
            initial: {
                mobile: 8,
                tablet: 12,
                desktop: 24,
            },
            subsequent: {
                mobile: 10,
                tablet: 16,
                desktop: 28,
            },
        }

        it("should return the page data defaults when URL history is not given", () => {
            const historyUrl = undefined
            const actual = getInitialPage(mockItemsPerPage, "lg", historyUrl)
            const expected = {
                startPage: 1,
                endPage: 1,
                pageSize: 24,
                scrollLocation: 0,
            }
            expect(actual).toEqual(expected)
        })

        it("should return the correct page data when URL history requests a page higher than 1", () => {
            const historyUrl = "http://localhost:3009/search?w=red&p=3#6728"
            const actual = getInitialPage(mockItemsPerPage, "lg", historyUrl)
            const expected = {
                startPage: 2,
                endPage: 3,
                pageSize: 28,
                scrollLocation: 6728,
            }
            expect(actual).toEqual(expected)
        })

        it("should return the correct page data when URL history requests page 1", () => {
            const historyUrl = "http://localhost:3009/search?w=red&p=1#350"
            const actual = getInitialPage(mockItemsPerPage, "lg", historyUrl)
            const expected = {
                startPage: 1,
                endPage: 1,
                pageSize: 24,
                scrollLocation: 350,
            }
            expect(actual).toEqual(expected)
        })

        it("should return the default page data when page is not given", () => {
            const historyUrl = "http://localhost:3009/search?w=red"
            const actual = getInitialPage(mockItemsPerPage, "lg", historyUrl)
            const expected = {
                startPage: 1,
                endPage: 1,
                pageSize: 24,
                scrollLocation: 0,
            }
            expect(actual).toEqual(expected)
        })

        it("should return default scroll location when not given", () => {
            const historyUrl = "http://localhost:3009/search?w=red&p=1"
            const actual = getInitialPage(mockItemsPerPage, "lg", historyUrl)
            const expected = {
                startPage: 1,
                endPage: 1,
                pageSize: 24,
                scrollLocation: 0,
            }
            expect(actual).toEqual(expected)
        })
        })
    describe("Given formatSearchState", () => {
        const mockPreviousSearchState = {
            filters: "previousFilters",
            facets: "previousFacets",
            filtersSort: "previousFiltersSort",
            totalResults: "previousTotalResults",
            sorting: "previousSorting",
            items: "previousItems",
            title: "previousTitle",
            startPage: 1,
            endPage: 1,
        } as any

        const mockDecodedApiResponseWithResults = {
            items: [
                'item',
                'item',
                'item',
                'item',
                'item',
            ],
            searchStateData: {
                totalResults: 5,
                facets: "updatedFacets",
                filtersSort: "updatedFiltersSort",
                filters: "updatedFilters",
                sorting: "updatedSorting",
                title: "updatedTitle",
            },
        } as any

        const mockDecodedApiResponseWithZeroResults = {
            items: [],
            searchStateData: {
                totalResults: 0,
                facets: "updatedFacets",
                filtersSort: "updatedFiltersSort",
                filters: "updatedFilters",
                sorting: "updatedSorting",
                title: "updatedTitle",
            },
        } as any
        it("should format the search state correctly", () => {
            const expected = {
                totalResults: 5,
                startPage: 1,
                endPage: 1,
                facets: "updatedFacets",
                filtersSort: "updatedFiltersSort",
                filters: "updatedFilters",
                items: [
                    'item',
                    'item',
                    'item',
                    'item',
                    'item',
                ],
                sorting: "updatedSorting",
                title: "updatedTitle",
            }

            const actual = formatSearchState(mockPreviousSearchState, mockDecodedApiResponseWithResults)

            expect(actual).toEqual(expected)
        })

        it("should retain the previous filters and facets if the search returns no results", () => {
            const expected = {
                totalResults: 0,
                startPage: 1,
                endPage: 1,
                facets: "previousFacets",
                filtersSort: "previousFiltersSort",
                filters: "previousFilters",
                items: [],
                sorting: "updatedSorting",
                title: "updatedTitle",
            }

            const actual = formatSearchState(mockPreviousSearchState, mockDecodedApiResponseWithZeroResults)

            expect(actual).toEqual(expected)
        })
    })
})
