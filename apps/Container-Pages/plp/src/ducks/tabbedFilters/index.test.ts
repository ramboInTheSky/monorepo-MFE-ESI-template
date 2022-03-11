import React from "react"
import {SearchApiRequestTypes} from "../../config/constants"
import reducer, {
    setSelectedFacetAction,
    setTabbedFacet,
    syncTabbedFiltersFromSearch,
    setTabbedPriceFilterAction,
    setBrandName,
    SET_SELECTED_FILTER,
    SET_CAN_SYNC,
    SET_TABBED_FACET,
    SET_TABBED_PRICE_FILTER,
    SYNC_TABBED_FILTERS,
    SET_TABBED_FILTERS_IS_OPEN,
    SET_UPDATED_SEARCH_RESULTS,
    SET_IS_PERFORMING_KEY_FILTER_SEARCH,
    SET_KEY_FILTER,
    SET_BRAND_NAME_SEARCH,
    setTabbedFiltersOpenAction,
    setUpdatedSearchResults,
    searchForSelectedFacets,
    setSelectedFilterThunk,
    searchForKeyFilters,
    searchForSelectedPrice,
    TabbedFilterDuckState,
    onClickViewResults,
} from "."
import {Filters} from "../../models/Filter"
import {FacetsState} from "../../models/FacetsState"

import TrackFilterSelection from "../../events/trackEvent/events/trackFilterSelection"
import TrackFilterDeselect from "../../events/trackEvent/events/trackFilterDeselect"

const initialState: TabbedFilterDuckState = {
    isOpen: false,
    totalResults: 0,
    filters: new Filters(),
    filtersSort: [],
    facets: new FacetsState(),
    items: [],
    selectedFilter: null,
    historicFacetFilter: {},
    isPerformingKeyFilterSearch: false,
    canSync: true,
    isPriceFacetChanged: false,
    brandSearch: "",
}

const mockDispatch = jest.fn()
const mockGetState = jest.fn(() => ({
    search: {
        totalResults: 15,
        facets: {},
        filtersSort: ["test"],
        filters: {},
        items: [],
    },
    tabbedFilters: initialState,
}))

jest.mock("../../utils/getFacetSearchResults", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        totalResults: 123,
        facets: {},
        filtersSort: ["test"],
        filters: {},
    })),
}))
jest.mock("../../utils/disableNonReturnedFilters", () => ({
    __esModule: true,
    disableNonReturnedFilters: jest.fn(() => ({filters: {}, filtersSort: ["test"]})),
}))
jest.mock("../../utils/disableNonReturnedKeyFilters", () => ({
    __esModule: true,
    disableNonReturnedKeyFilters: jest.fn(() => ({
        filters: {},
        facets: {},
    })),
}))

jest.mock("../../events/trackEvent/events/trackFilterSelection", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackFilterDeselect", () => ({
    __esModule: true,
    default: jest.fn(),
}))

describe("Given a Tabbed Filters Duck", () => {
    describe("Given a syncTabbedFiltersFromSearch action that can sync and isOpen", () => {
        beforeAll(() => {
            syncTabbedFiltersFromSearch(true)(mockDispatch, mockGetState as any)
        })
        it("Should call Dispatch with expected action", () => {
            const expectedActionData = {
                isOpen: true,
                totalResults: 15,
                facets: {},
                filtersSort: ["test"],
                filters: {},
                items: [],
                selectedFilter: null,
                brandSearch: "",
                historicFacetFilter: {},
                isPerformingKeyFilterSearch: false,
                canSync: true,
                isPriceFacetChanged: false,
            }
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SYNC_TABBED_FILTERS,
                data: expectedActionData,
            })
        })
    })

    describe("Given a syncTabbedFiltersFromSearch action that can sync and isOpen and Brand is search is undefined", () => {
        const initialStateWithoutBrand: any = {
            isOpen: false,
            totalResults: 0,
            filters: new Filters(),
            filtersSort: [],
            facets: new FacetsState(),
            items: [],
            selectedFilter: null,
            historicFacetFilter: {},
            isPerformingKeyFilterSearch: false,
            canSync: true,
            isPriceFacetChanged: false,
        }

        const mockStateWithoutBrand = jest.fn(() => ({
            search: {
                totalResults: 15,
                facets: {},
                filtersSort: ["test"],
                filters: {},
                items: [],
            },
            tabbedFilters: initialStateWithoutBrand,
        }))

        beforeAll(() => {
            syncTabbedFiltersFromSearch(true)(mockDispatch, mockStateWithoutBrand as any)
        })
        it("should return the correct state", () => {
            const expectedActionData = {
                isOpen: true,
                totalResults: 15,
                facets: {},
                filtersSort: ["test"],
                filters: {},
                items: [],
                selectedFilter: null,
                brandSearch: "",
                historicFacetFilter: {},
                isPerformingKeyFilterSearch: false,
                canSync: true,
                isPriceFacetChanged: false,
            }
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SYNC_TABBED_FILTERS,
                data: expectedActionData,
            })
        })
    })

    describe("Given a syncTabbedFiltersFromSearch action that can not sync and isOpen", () => {
        const initialStateNoSync: TabbedFilterDuckState = {
            isOpen: false,
            totalResults: 0,
            filters: new Filters(),
            filtersSort: [],
            facets: new FacetsState(),
            items: [],
            selectedFilter: null,
            brandSearch: "",
            historicFacetFilter: {},
            isPerformingKeyFilterSearch: false,
            canSync: false,
            isPriceFacetChanged: false,
        }
        beforeAll(() => {
            jest.clearAllMocks()
            const mockGetStateNoSync = jest.fn(() => ({
                search: {
                    totalResults: 15,
                    facets: {},
                    filtersSort: ["test"],
                    filters: {},
                    items: [],
                },
                tabbedFilters: initialStateNoSync,
            }))
            syncTabbedFiltersFromSearch(true)(mockDispatch, mockGetStateNoSync as any)
        })
        it("Should not call Dispatch", () => {
            expect(mockDispatch).not.toHaveBeenCalled()
        })
    })

    describe("Given a syncTabbedFiltersFromSearch action with available filters", () => {
        const initialStateWithFilters: TabbedFilterDuckState = {
            isOpen: false,
            totalResults: 0,
            filters: {
                Test1: {
                    name: "Test1",
                    facets: ["opt1"],
                    displayName: "Test 1",
                    type: "feat",
                    isFilterOpen: true,
                    isViewMoreOpen: true,
                },
                Test2: {
                    name: "Test2 with options",
                    facets: ["opt2"],
                    displayName: "Test 2",
                    type: "filter",
                    isFilterOpen: false,
                    isViewMoreOpen: false,
                },
                Test3: {
                    name: "Test2 with options",
                    displayName: "",
                    type: "price",
                    isFilterOpen: false,
                    max: 100,
                    min: 0,
                    selectedMax: 70,
                    selectedMin: 30,
                    currencyCode: "GBP",
                },
                Price: {
                    name: "Test2 with options",
                    displayName: "",
                    type: "price",
                    isFilterOpen: false,
                    max: 100,
                    min: 0,
                    selectedMax: 70,
                    selectedMin: 30,
                    currencyCode: "GBP",
                },
            },
            filtersSort: ["Test1", "Test2"],
            facets: {
                opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
            },
            items: [],
            selectedFilter: null,
            brandSearch: "",
            historicFacetFilter: {opt1: ["opt1"]},
            isPerformingKeyFilterSearch: false,
            canSync: true,
            isPriceFacetChanged: false,
        }
        const mockGetStateWithFilters = jest.fn(() => ({
            search: {
                totalResults: 15,
                filters: {
                    opt1: {
                        name: "Test1",
                        facets: ["opt1"],
                        displayName: "Test 1",
                        type: "feat",
                        isFilterOpen: true,
                        isViewMoreOpen: true,
                    },
                    opt2: {
                        name: "Test2 with options",
                        facets: ["opt2"],
                        displayName: "Test 2",
                        type: "filter",
                        isFilterOpen: false,
                        isViewMoreOpen: false,
                    },
                    opt3: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 70,
                        selectedMin: 30,
                        currencyCode: "GBP",
                    },
                    Price: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 70,
                        selectedMin: 30,
                        currencyCode: "GBP",
                    },
                },
                filtersSort: ["Test1", "Test2"],
                facets: {
                    opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                    opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                    opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
                },
                items: [],
                historicFacetFilter: {opt1: ["opt1"]},
            },
            tabbedFilters: initialStateWithFilters,
        }))
        beforeAll(() => {
            jest.clearAllMocks()
        })
        it("Should call Dispatch", () => {
            syncTabbedFiltersFromSearch(true)(mockDispatch, mockGetStateWithFilters as any)
            const expectedActionData = {
                isOpen: true,
                totalResults: 15,
                filters: {
                    opt1: {
                        name: "Test1",
                        facets: ["opt1"],
                        displayName: "Test 1",
                        type: "feat",
                        isFilterOpen: true,
                        isViewMoreOpen: true,
                    },
                    opt2: {
                        name: "Test2 with options",
                        facets: ["opt2"],
                        displayName: "Test 2",
                        type: "filter",
                        isFilterOpen: false,
                        isViewMoreOpen: false,
                    },
                    opt3: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 70,
                        selectedMin: 30,
                        currencyCode: "GBP",
                    },
                    Price: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 70,
                        selectedMin: 30,
                        currencyCode: "GBP",
                    },
                },
                filtersSort: ["Test1", "Test2"],
                facets: {
                    opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                    opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                    opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
                },
                items: [],
                selectedFilter: null,
                historicFacetFilter: {opt1: ["opt1"]},
                isPerformingKeyFilterSearch: false,
                canSync: true,
                isPriceFacetChanged: false,
                brandSearch: "",
            }
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SYNC_TABBED_FILTERS,
                data: expectedActionData,
            })
        })
    })

    describe("Given a syncTabbedFiltersFromSearch action with available filters but they don't exist in the facets", () => {
        const initialStateWithFilters: TabbedFilterDuckState = {
            isOpen: true,
            totalResults: 0,
            filters: {
                opt4: {
                    name: "Test1",
                    facets: ["option4"],
                    displayName: "Test 1",
                    type: "feat",
                    isFilterOpen: true,
                    isViewMoreOpen: true,
                },
                opt2: {
                    name: "Test2 with options",
                    facets: ["opt2"],
                    displayName: "Test 2",
                    type: "filter",
                    isFilterOpen: false,
                    isViewMoreOpen: false,
                },
                opt3: {
                    name: "Test2 with options",
                    displayName: "",
                    type: "price",
                    isFilterOpen: false,
                    max: 100,
                    min: 0,
                    selectedMax: 70,
                    selectedMin: 30,
                    currencyCode: "GBP",
                },
                Price: {
                    name: "Test2 with options",
                    displayName: "",
                    type: "price",
                    isFilterOpen: false,
                    max: 100,
                    min: 0,
                    selectedMax: 70,
                    selectedMin: 30,
                    currencyCode: "GBP",
                },
            },
            filtersSort: ["Test1", "Test2"],
            facets: {
                option1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                option4: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
            },
            items: [],
            selectedFilter: null,
            brandSearch: "",
            historicFacetFilter: {},
            isPerformingKeyFilterSearch: true,
            canSync: true,
            isPriceFacetChanged: false,
        }
        const mockGetStateWithFilters = jest.fn(() => ({
            search: {
                totalResults: 15,
                filters: {
                    opt4: {
                        name: "Test1",
                        facets: ["option4"],
                        displayName: "Test 1",
                        type: "feat",
                        isFilterOpen: true,
                        isViewMoreOpen: true,
                    },
                    opt2: {
                        name: "Test2 with options",
                        facets: ["opt2"],
                        displayName: "Test 2",
                        type: "filter",
                        isFilterOpen: false,
                        isViewMoreOpen: false,
                    },
                    opt3: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 70,
                        selectedMin: 30,
                        currencyCode: "GBP",
                    },
                    Price: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 70,
                        selectedMin: 30,
                        currencyCode: "GBP",
                    },
                },
                filtersSort: ["Test1", "Test2"],
                facets: {
                    option1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                    option4: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                    opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                    opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
                },
                items: [],
                historicFacetFilter: {},
            },
            tabbedFilters: initialStateWithFilters,
        }))
        beforeAll(() => {
            jest.clearAllMocks()
        })
        it("Should call Dispatch", () => {
            syncTabbedFiltersFromSearch(true)(mockDispatch, mockGetStateWithFilters as any)
            const expectedActionData = {
                isOpen: true,
                totalResults: 15,
                facets: {},
                filtersSort: ["test"],
                filters: {},
                items: [],
                selectedFilter: null,
                historicFacetFilter: {},
                isPerformingKeyFilterSearch: true,
                canSync: true,
                isPriceFacetChanged: false,
                brandSearch: "",
            }
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SYNC_TABBED_FILTERS,
                data: expectedActionData,
            })
        })
    })

    describe("Given a syncTabbedFiltersFromSearch action with available filters when performing keyfilter search", () => {
        const initialStateWithFilters: TabbedFilterDuckState = {
            isOpen: true,
            totalResults: 0,
            filters: {
                opt1: {
                    name: "Test1",
                    facets: ["option1"],
                    displayName: "Test 1",
                    type: "feat",
                    isFilterOpen: true,
                    isViewMoreOpen: true,
                },
                opt4: {
                    name: "Test1",
                    facets: ["option4"],
                    displayName: "Test 1",
                    type: "feat",
                    isFilterOpen: true,
                    isViewMoreOpen: true,
                },
                opt2: {
                    name: "Test2 with options",
                    facets: ["opt2"],
                    displayName: "Test 2",
                    type: "filter",
                    isFilterOpen: false,
                    isViewMoreOpen: false,
                },
                opt3: {
                    name: "Test2 with options",
                    displayName: "",
                    type: "price",
                    isFilterOpen: false,
                    max: 100,
                    min: 0,
                    selectedMax: 70,
                    selectedMin: 30,
                    currencyCode: "GBP",
                },
                Price: {
                    name: "Test2 with options",
                    displayName: "",
                    type: "price",
                    isFilterOpen: false,
                    max: 100,
                    min: 0,
                    selectedMax: 70,
                    selectedMin: 30,
                    currencyCode: "GBP",
                },
            },
            filtersSort: ["Test1", "Test2"],
            facets: {
                option1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                option4: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
            },
            items: [],
            selectedFilter: null,
            brandSearch: "",
            historicFacetFilter: {opt1: ["opt1", "opt1"]},
            isPerformingKeyFilterSearch: true,
            canSync: true,
            isPriceFacetChanged: false,
        }
        const mockGetStateWithFilters = jest.fn(() => ({
            search: {
                totalResults: 15,
                filters: {
                    opt1: {
                        name: "Test1",
                        facets: ["option1"],
                        displayName: "Test 1",
                        type: "feat",
                        isFilterOpen: true,
                        isViewMoreOpen: true,
                    },
                    opt4: {
                        name: "Test1",
                        facets: ["option4"],
                        displayName: "Test 1",
                        type: "feat",
                        isFilterOpen: true,
                        isViewMoreOpen: true,
                    },
                    opt2: {
                        name: "Test2 with options",
                        facets: ["opt2"],
                        displayName: "Test 2",
                        type: "filter",
                        isFilterOpen: false,
                        isViewMoreOpen: false,
                    },
                    opt3: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 70,
                        selectedMin: 30,
                        currencyCode: "GBP",
                    },
                    Price: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 70,
                        selectedMin: 30,
                        currencyCode: "GBP",
                    },
                },
                filtersSort: ["Test1", "Test2"],
                facets: {
                    option1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                    option4: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false, s: true},
                    opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                    opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
                },
                items: [],
                historicFacetFilter: {opt1: ["opt1", "opt4"]},
            },
            tabbedFilters: initialStateWithFilters,
        }))
        beforeAll(() => {
            jest.clearAllMocks()
        })
        it("Should call Dispatch", () => {
            syncTabbedFiltersFromSearch(true)(mockDispatch, mockGetStateWithFilters as any)
            const expectedActionData = {
                isOpen: true,
                totalResults: 15,
                facets: {},
                filtersSort: ["test"],
                filters: {},
                items: [],
                selectedFilter: null,
                historicFacetFilter: {opt1: ["opt1", "opt1"]},
                isPerformingKeyFilterSearch: true,
                canSync: true,
                isPriceFacetChanged: false,
                brandSearch: "",
            }
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SYNC_TABBED_FILTERS,
                data: expectedActionData,
            })
        })
    })

    describe("Given a setSelectedFacetAction action", () => {
        it("should dispatch the correct action", () => {
            expect(setSelectedFacetAction("brand")).toEqual({
                type: SET_SELECTED_FILTER,
                name: "brand",
            })
        })
    })

    describe("Given a setTotalResults action", () => {
        it("should dispatch the correct action", () => {
            expect(
                setUpdatedSearchResults({
                    totalResults: 123,
                    filters: {},
                    facets: {},
                    filtersSort: [],
                }),
            ).toEqual({
                type: SET_UPDATED_SEARCH_RESULTS,
                data: {
                    totalResults: 123,
                    facets: {},
                    filters: {},
                    filtersSort: [],
                },
            })
        })
    })

    describe("Given a setTabbedFiltersOpenAction action", () => {
        it("should dispatch the correct action", () => {
            expect(setTabbedFiltersOpenAction(true)).toEqual({
                type: SET_TABBED_FILTERS_IS_OPEN,
                isOpen: true,
            })
        })
    })

    describe("Given a setTabbedFilter action", () => {
        it("should dispatch the correct action", () => {
            expect(
                setTabbedFacet({
                    parent: "feat",
                    child: "feat:new:in",
                }),
            ).toEqual({
                type: SET_TABBED_FACET,
                data: {
                    parent: "feat",
                    child: "feat:new:in",
                },
            })
        })
    })

    describe("Given a setTabbedPriceFilterAction action", () => {
        it("should dispatch the correct action", () => {
            expect(setTabbedPriceFilterAction("price", 2, 30)).toEqual({
                type: SET_TABBED_PRICE_FILTER,
                data: {
                    name: "price",
                    selectedMin: 2,
                    selectedMax: 30,
                },
            })
        })
    })

    describe("Given a searchForSelectedPrice", () => {
        const mockSearchGetState = jest.fn(
            () =>
                ({
                    features: {
                        enablePageInFilters: false,
                    },
                    request: {
                        headers: {},
                        searchTerm: "test",
                        type: SearchApiRequestTypes.Category,
                        siteUrl: "www.test.com",
                        url: "http://www.test.com/test",
                    },
                    tabbedFilters: {
                        facets: {
                            dolce: {
                                n: "dolce",
                                s: true,
                                incompatibleWith: [],
                                d: false,
                                c: 10,
                                v: "Dolce",
                            },
                        },
                        filters: {},
                    },
                    search: {
                        sorting: null,
                        currentBreakpoint: "lg",
                        subsequentPagesNonLazyloadRows: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 2,
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
                    },
                } as any),
        )

        beforeAll(async () => {
            jest.clearAllMocks()

            await searchForSelectedPrice("dolce", 10, 20)(mockDispatch, mockSearchGetState)
        })
        it("should call getState", () => {
            expect(mockSearchGetState).toHaveBeenCalled()
        })

        it("should call mockDispatch", () => {
            expect(mockDispatch).toHaveBeenNthCalledWith(1, {
                type: SET_TABBED_PRICE_FILTER,
                data: {name: "dolce", selectedMin: 10, selectedMax: 20},
            })

            expect(mockDispatch).toHaveBeenNthCalledWith(2, {
                type: "SET_SELECTED_PRICE_FILTER",
                data: {facetName: "dolce", selectedMin: 10, selectedMax: 20},
            })

            expect(mockDispatch).toHaveBeenNthCalledWith(3, {
                type: SET_UPDATED_SEARCH_RESULTS,
                data: {
                    filters: {},
                    filtersSort: ["test"],
                    facets: {},
                    totalResults: 123,
                },
            })
        })
    })

    describe("Given a searchForSelectedFacets when deselecting", () => {
        const mockSearchDispatch = jest.fn()
        const mockSearchGetState = jest.fn(
            () =>
                ({
                    features: {
                        enablePageInFilters: false,
                    },
                    request: {
                        headers: {},
                        searchTerm: "test",
                        type: SearchApiRequestTypes.Category,
                        siteUrl: "www.test.com",
                        url: "http://www.test.com/test",
                    },
                    tabbedFilters: {
                        facets: {
                            "brand:dolce": {
                                n: "brand:dolce",
                                s: true,
                                incompatibleWith: [],
                                d: false,
                                c: 10,
                                v: "brand:dolce",
                            },
                        },
                        filters: {},
                    },
                    search: {
                        sorting: null,
                        currentBreakpoint: "lg",
                        subsequentPagesNonLazyloadRows: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 2,
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
                    },
                } as any),
        )

        beforeAll(async () => {
            await searchForSelectedFacets({parent: "brand", child: "brand:dolce"})(
                mockSearchDispatch,
                mockSearchGetState,
            )
        })
        it("should call getState", () => {
            expect(mockSearchGetState).toHaveBeenCalled()
        })

        it("should call mockSearchDispatch", () => {
            expect(mockSearchDispatch).toHaveBeenCalledWith({
                type: SET_TABBED_FACET,
                data: {
                    child: "brand:dolce",
                    parent: "brand",
                },
            })

            expect(mockSearchDispatch).toHaveBeenCalledWith({
                type: SET_UPDATED_SEARCH_RESULTS,
                data: {
                    filters: {},
                    filtersSort: ["test"],
                    facets: {
                        "brand:dolce": {
                            c: 10,
                            d: false,
                            incompatibleWith: [],
                            n: "brand:dolce",
                            s: false,
                            v: "brand:dolce",
                        },
                    },
                    totalResults: 123,
                },
            })
        })

        it("should call TrackFilterDeselect", () => {
            expect(TrackFilterDeselect).toBeCalledWith("brand", "dolce")
        })
    })
    describe("Given a searchForSelectedFacets when selecting", () => {
        const mockSearchDispatch = jest.fn()
        const mockSearchGetState = jest.fn(
            () =>
                ({
                    features: {
                        enablePageInFilters: false,
                    },
                    request: {
                        headers: {},
                        searchTerm: "test",
                        type: SearchApiRequestTypes.Category,
                        siteUrl: "www.test.com",
                        url: "http://www.test.com/test",
                    },
                    tabbedFilters: {
                        facets: {
                            "brand:dolce": {
                                n: "brand:dolce",
                                s: false,
                                incompatibleWith: [],
                                d: false,
                                c: 10,
                                v: "brand:dolce",
                            },
                        },
                        filters: {},
                    },
                    search: {
                        sorting: null,
                        currentBreakpoint: "lg",
                        subsequentPagesNonLazyloadRows: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 2,
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
                    },
                } as any),
        )

        beforeAll(async () => {
            await searchForSelectedFacets({parent: "brand", child: "brand:dolce"})(
                mockSearchDispatch,
                mockSearchGetState,
            )
        })

        it("should call TrackFilterSelection", () => {
            expect(TrackFilterSelection).toBeCalledWith("brand", "dolce")
        })
    })

    describe("Given a setSelectedFilterThunk when the name sent over is different", () => {
        const mockSearchDispatch = jest.fn()
        const mockSearchGetState = jest.fn(
            () =>
                ({
                    features: {
                        enablePageInFilters: false,
                    },
                    request: {
                        headers: {},
                        searchTerm: "test",
                        type: SearchApiRequestTypes.Category,
                        siteUrl: "www.test.com",
                        url: "http://www.test.com/test",
                    },
                    tabbedFilters: {
                        facets: {
                            dolce: {
                                n: "dolce",
                                s: true,
                                incompatibleWith: [],
                                d: false,
                                c: 10,
                                v: "Dolce",
                            },
                        },
                        filter: {},
                        selectedFilter: "dolce",
                    },
                    search: {
                        sorting: null,
                        currentBreakpoint: "lg",
                        subsequentPagesNonLazyloadRows: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 2,
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
                    },
                } as any),
        )
        beforeAll(async () => {
            await setSelectedFilterThunk("testDifferentFromDolce")(mockSearchDispatch, mockSearchGetState)
        })

        it("should call getState", () => {
            expect(mockSearchGetState).toHaveBeenCalled()
        })

        it("should call mockSearchDispatch", () => {
            expect(mockSearchDispatch).toHaveBeenNthCalledWith(1, {
                type: SET_SELECTED_FILTER,
                name: "testDifferentFromDolce",
            })

            expect(mockSearchDispatch).toHaveBeenNthCalledWith(2, {
                type: SET_CAN_SYNC,
                value: false,
            })

            expect(mockSearchDispatch).toHaveBeenNthCalledWith(4, {
                type: SET_CAN_SYNC,
                value: true,
            })
        })
    })
    describe("Given a setBrandName action", () => {
        it("should dispatch the correct action", () => {
            // mock function to return event so we can give that to setBrandName
            const mockedSynthEvent = ({
                target: {
                    value: "amido",
                },
            } as unknown) as React.SyntheticEvent
            expect(setBrandName(mockedSynthEvent)).toEqual({
                type: SET_BRAND_NAME_SEARCH,
                value: "amido",
            })
        })
    })

    describe("Given a setSelectedFilterThunk when the name sent over is the same", () => {
        const mockSearchDispatch = jest.fn()
        const mockSearchGetState = jest.fn(
            () =>
                ({
                    features: {
                        enablePageInFilters: false,
                    },
                    request: {
                        headers: {},
                        searchTerm: "test",
                        type: SearchApiRequestTypes.Category,
                        siteUrl: "www.test.com",
                        url: "http://www.test.com/test",
                    },
                    tabbedFilters: {
                        facets: {
                            dolce: {
                                n: "dolce",
                                s: true,
                                incompatibleWith: [],
                                d: false,
                                c: 10,
                                v: "Dolce",
                            },
                        },
                        filters: {},
                        selectedFilter: "dolce",
                    },
                    search: {
                        sorting: null,
                        currentBreakpoint: "lg",
                        subsequentPagesNonLazyloadRows: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 2,
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
                    },
                } as any),
        )

        beforeAll(async () => {
            await setSelectedFilterThunk("dolce")(mockSearchDispatch, mockSearchGetState)
        })

        it("should call getState", () => {
            expect(mockSearchGetState).toHaveBeenCalled()
        })

        it("should call not mockSearchDispatch", () => {
            expect(mockSearchDispatch).not.toHaveBeenCalled()
        })
    })

    describe("Given a searchForKeyFilters", () => {
        const mockSearchDispatch = jest.fn()
        const mockSearchGetState = jest.fn(
            () =>
                ({
                    features: {
                        enablePageInFilters: false,
                    },
                    request: {
                        headers: {},
                        searchTerm: "test",
                        type: SearchApiRequestTypes.Category,
                        siteUrl: "www.test.com",
                        url: "http://www.test.com/test",
                    },
                    tabbedFilters: {
                        facets: {
                            dolce: {
                                n: "dolce",
                                s: true,
                                incompatibleWith: [],
                                d: false,
                                c: 10,
                                v: "Dolce",
                            },
                        },
                        filters: {},
                        selectedFilter: "dolce",
                    },
                    search: {
                        sorting: null,
                        currentBreakpoint: "lg",
                        subsequentPagesNonLazyloadRows: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 2,
                            xl: 2,
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
                    },
                } as any),
        )

        beforeAll(async () => {
            await searchForKeyFilters("dolce")(mockSearchDispatch, mockSearchGetState)
        })

        it("should call getState", () => {
            expect(mockSearchGetState).toHaveBeenCalled()
        })

        it("should call mockSearchDispatch", () => {
            expect(mockSearchDispatch).toHaveBeenNthCalledWith(1, {
                type: SET_IS_PERFORMING_KEY_FILTER_SEARCH,
                value: true,
            })

            expect(mockSearchDispatch).toHaveBeenNthCalledWith(2, {
                type: SET_KEY_FILTER,
                name: "dolce",
            })

            expect(mockSearchDispatch).toHaveBeenNthCalledWith(4, {
                type: SET_IS_PERFORMING_KEY_FILTER_SEARCH,
                value: false,
            })
        })
    })

    describe("Given a onClickViewResults() action", () => {
        beforeEach(async () => {
            jest.clearAllMocks()

            const mockState = {
                tabbedFilters: {...initialState, filters: {}},
                search: {filters: {}},
            }
            await onClickViewResults()(mockDispatch, jest.fn(() => mockState) as any)
        })

        it("should set tabbed filters isOpen to false", () => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_TABBED_FILTERS_IS_OPEN,
                isOpen: false,
            })
        })
    })

    describe("Given a reducer", () => {
        const expectedActionData: TabbedFilterDuckState = {
            isOpen: true,
            totalResults: 15,
            filters: {},
            filtersSort: ["test"],
            facets: {},
            items: [],
            brandSearch: "",
            selectedFilter: null,
            isPerformingKeyFilterSearch: false,
            canSync: true,
            historicFacetFilter: {},
            isPriceFacetChanged: false,
        }

        describe("When called with SYNC_TABBED_FILTERS", () => {
            const mockAction = {
                type: SYNC_TABBED_FILTERS as typeof SYNC_TABBED_FILTERS,
                data: expectedActionData,
            }
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction as any)).toEqual(expectedActionData)
            })
        })

        describe("When called with SET_SELECTED_FACET", () => {
            const mockAction = {
                type: SET_SELECTED_FILTER as typeof SET_SELECTED_FILTER,
                name: "brand",
            }
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    filters: {},
                    filtersSort: [],
                    facets: {},
                    isOpen: false,
                    items: [],
                    selectedFilter: "brand",
                    totalResults: 0,
                    brandSearch: "",
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                })
            })
        })

        describe("When called with SET_TABBED_FILTERS_IS_OPEN and isOpen true", () => {
            const mockAction = {
                type: SET_TABBED_FILTERS_IS_OPEN as typeof SET_TABBED_FILTERS_IS_OPEN,
                isOpen: true,
            }
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    isOpen: true,
                    totalResults: 0,
                    filters: new Filters(),
                    filtersSort: [],
                    facets: new FacetsState(),
                    items: [],
                    selectedFilter: null,
                    brandSearch: "",
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                })
            })
        })

        describe("When called with SET_TABBED_FILTERS_IS_OPEN and isOpen false", () => {
            const mockAction = {
                type: SET_TABBED_FILTERS_IS_OPEN as typeof SET_TABBED_FILTERS_IS_OPEN,
                isOpen: false,
            }
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    isOpen: false,
                    totalResults: 0,
                    filters: new Filters(),
                    filtersSort: [],
                    facets: new FacetsState(),
                    items: [],
                    selectedFilter: null,
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                    brandSearch: "",
                })
            })
        })

        describe("When called with SET_UPDATED_SEARCH_RESULTS", () => {
            const mockAction = {
                type: SET_UPDATED_SEARCH_RESULTS,
                data: {
                    filters: new Filters(),
                    filtersSort: ["test"],
                    facets: new FacetsState(),
                    totalResults: 123,
                },
            } as any
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    isOpen: false,
                    totalResults: 123,
                    filters: new Filters(),
                    filtersSort: ["test"],
                    facets: new FacetsState(),
                    items: [],
                    selectedFilter: null,
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                    brandSearch: "",
                })
            })
        })

        describe("When called with SET_IS_PERFORMING_KEY_FILTER_SEARCH and false", () => {
            const mockAction = {
                type: SET_IS_PERFORMING_KEY_FILTER_SEARCH,
                value: false,
            } as any
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    isOpen: false,
                    totalResults: 0,
                    filters: new Filters(),
                    filtersSort: [],
                    facets: new FacetsState(),
                    items: [],
                    selectedFilter: null,
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                    brandSearch: "",
                })
            })
        })
        describe("When called with SET_IS_PERFORMING_KEY_FILTER_SEARCH and true", () => {
            const mockAction = {
                type: SET_IS_PERFORMING_KEY_FILTER_SEARCH,
                value: true,
            } as any
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    isOpen: false,
                    totalResults: 0,
                    filters: new Filters(),
                    filtersSort: [],
                    facets: new FacetsState(),
                    items: [],
                    selectedFilter: null,
                    brandSearch: "",
                    isPerformingKeyFilterSearch: true,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                })
            })
        })

        describe("When called with SET_TABBED_FILTER", () => {
            const mockAction = {
                type: SET_TABBED_FACET,
                data: {
                    parent: "feat",
                    child: "feat:newin",
                },
            } as any
            it("should set state correctly", () => {
                expect(
                    reducer(
                        {
                            ...initialState,
                            selectedFilter: "brand",
                            facets: {
                                dolce: {
                                    n: "feat:newin",
                                    s: true,
                                    incompatibleWith: [],
                                    d: false,
                                    c: 10,
                                    v: "New In",
                                },
                            },
                        },
                        mockAction,
                    ),
                ).toEqual({
                    filters: {},
                    filtersSort: [],
                    facets: {
                        dolce: {
                            n: "feat:newin",
                            s: true,
                            incompatibleWith: [],
                            d: false,
                            c: 10,
                            v: "New In",
                        },
                    },
                    isOpen: false,
                    items: [],
                    selectedFilter: "brand",
                    totalResults: 0,
                    brandSearch: "",
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {
                        feat: ["feat:newin"],
                    },
                    isPriceFacetChanged: false,
                })
            })
        })

        describe("When called with SET_TABBED_PRICE_FILTER when max is changed", () => {
            const mockAction = {
                type: SET_TABBED_PRICE_FILTER,
                data: {name: "price", selectedMin: 10, selectedMax: 20},
            } as any
            it("should set state correctly", () => {
                expect(
                    reducer(
                        {
                            ...initialState,
                            selectedFilter: "price",
                            filters: {
                                price: {type: "price"} as any,
                            },
                        },
                        mockAction,
                    ),
                ).toEqual({
                    filters: {
                        price: {type: "price", selectedMin: 10, selectedMax: 20},
                    },
                    filtersSort: [],
                    facets: {},
                    isOpen: false,
                    items: [],
                    selectedFilter: "price",
                    totalResults: 0,
                    brandSearch: "",
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: true,
                })
            })

            it("should not change state if payload is incorrect", () => {
                const mockInitialState = {...initialState, filters: {price: {} as any}}
                expect(reducer(mockInitialState, mockAction)).toEqual(mockInitialState)
            })
        })

        describe("When called with SET_TABBED_PRICE_FILTER when min is changed", () => {
            const mockAction = {
                type: SET_TABBED_PRICE_FILTER,
                data: {name: "price", selectedMin: 10, selectedMax: 20},
            } as any
            it("should set state correctly", () => {
                expect(
                    reducer(
                        {
                            ...initialState,
                            selectedFilter: "price",
                            filters: {
                                price: {type: "price", selectedMax: 20, selectedMin: 15} as any,
                            },
                        },
                        mockAction,
                    ),
                ).toEqual({
                    filters: {
                        price: {type: "price", selectedMin: 10, selectedMax: 20},
                    },
                    filtersSort: [],
                    facets: new FacetsState(),
                    isOpen: false,
                    items: [],
                    selectedFilter: "price",
                    totalResults: 0,
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: true,
                    brandSearch: "",
                })
            })

            it("should not change state if payload is incorrect", () => {
                const mockInitialState = {...initialState, filters: {price: {} as any}}
                expect(reducer(mockInitialState, mockAction)).toEqual(mockInitialState)
            })
        })

        describe("When called with SET_BRAND_NAME_SEARCH", () => {
            const mockAction = {
                type: SET_BRAND_NAME_SEARCH,
                value: "amido",
            } as any
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    isOpen: false,
                    totalResults: 0,
                    filters: new Filters(),
                    filtersSort: [],
                    facets: new FacetsState(),
                    items: [],
                    selectedFilter: null,
                    brandSearch: "amido",
                    canSync: true,
                    historicFacetFilter: {},
                    isPerformingKeyFilterSearch: false,
                    isPriceFacetChanged: false,
                })
            })
        })

        describe("When called with SET_KEY_FILTER", () => {
            const mockAction = {
                type: SET_KEY_FILTER,
                name: "opt1",
            } as any
            it("should set state correctly", () => {
                expect(
                    reducer(
                        {
                            ...initialState,
                            filters: {
                                opt1: {
                                    name: "Test1",
                                    facets: ["opt1"],
                                    displayName: "Test 1",
                                    type: "feat",
                                    isFilterOpen: true,
                                    isViewMoreOpen: true,
                                },
                                opt4: {
                                    name: "Test1",
                                    facets: ["opt4"],
                                    displayName: "Test 1",
                                    type: "feat",
                                    isFilterOpen: true,
                                    isViewMoreOpen: true,
                                },
                                opt2: {
                                    name: "Test2 with options",
                                    facets: ["opt2"],
                                    displayName: "Test 2",
                                    type: "filter",
                                    isFilterOpen: false,
                                    isViewMoreOpen: false,
                                },
                                opt3: {
                                    name: "Test2 with options",
                                    displayName: "",
                                    type: "price",
                                    isFilterOpen: false,
                                    max: 100,
                                    min: 0,
                                    selectedMax: 70,
                                    selectedMin: 30,
                                    currencyCode: "GBP",
                                },
                                Price: {
                                    name: "Test2 with options",
                                    displayName: "",
                                    type: "price",
                                    isFilterOpen: false,
                                    max: 100,
                                    min: 0,
                                    selectedMax: 70,
                                    selectedMin: 30,
                                    currencyCode: "GBP",
                                },
                            },
                            filtersSort: ["Test1", "Test2"],
                            facets: {
                                opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: ["opt2"], d: false, s: true},
                                opt4: {n: "opt4", c: 1, v: "opt4", incompatibleWith: [], d: false, s: true},
                                opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
                                opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
                            },
                        },
                        mockAction,
                    ),
                ).toEqual({
                    isOpen: false,
                    totalResults: 0,
                    filters: {
                        opt1: {
                            name: "Test1",
                            facets: ["opt1"],
                            displayName: "Test 1",
                            type: "feat",
                            isFilterOpen: true,
                            isViewMoreOpen: true,
                        },
                        opt4: {
                            name: "Test1",
                            facets: ["opt4"],
                            displayName: "Test 1",
                            type: "feat",
                            isFilterOpen: true,
                            isViewMoreOpen: true,
                        },
                        opt2: {
                            name: "Test2 with options",
                            facets: ["opt2"],
                            displayName: "Test 2",
                            type: "filter",
                            isFilterOpen: false,
                            isViewMoreOpen: false,
                        },
                        opt3: {
                            name: "Test2 with options",
                            displayName: "",
                            type: "price",
                            isFilterOpen: false,
                            max: 100,
                            min: 0,
                            selectedMax: 70,
                            selectedMin: 30,
                            currencyCode: "GBP",
                        },
                        Price: {
                            name: "Test2 with options",
                            displayName: "",
                            type: "price",
                            isFilterOpen: false,
                            max: 100,
                            min: 0,
                            selectedMax: 70,
                            selectedMin: 30,
                            currencyCode: "GBP",
                        },
                    },
                    filtersSort: ["Test1", "Test2"],
                    facets: {
                        opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: ["opt2"], d: false, s: true},
                        opt4: {n: "opt4", c: 1, v: "opt4", incompatibleWith: [], d: false, s: true},
                        opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: true},
                        opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
                    },
                    items: [],
                    selectedFilter: null,
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                    brandSearch: "",
                })
            })
        })

        describe("When called with SET_CAN_SYNC and true", () => {
            const mockAction = {
                type: SET_CAN_SYNC,
                value: true,
            } as any
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    isOpen: false,
                    totalResults: 0,
                    filters: new Filters(),
                    filtersSort: [],
                    facets: new FacetsState(),
                    items: [],
                    selectedFilter: null,
                    isPerformingKeyFilterSearch: false,
                    canSync: true,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                    brandSearch: "",
                })
            })
        })

        describe("When called with SET_CAN_SYNC and false", () => {
            const mockAction = {
                type: SET_CAN_SYNC,
                value: false,
            } as any
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    isOpen: false,
                    totalResults: 0,
                    filters: new Filters(),
                    filtersSort: [],
                    facets: new FacetsState(),
                    items: [],
                    selectedFilter: null,
                    brandSearch: "",
                    isPerformingKeyFilterSearch: false,
                    canSync: false,
                    historicFacetFilter: {},
                    isPriceFacetChanged: false,
                })
            })
        })

        describe("When called with OTHER", () => {
            const mockAction = {
                type: "OTHER" as any,
                data: expectedActionData,
            }
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction as any)).toEqual(initialState)
            })
        })
    })
})
