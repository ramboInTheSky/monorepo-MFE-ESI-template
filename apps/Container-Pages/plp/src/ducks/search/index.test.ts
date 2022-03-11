import logger from "@monorepo/core-logger"
import {SearchState} from "models/SearchState"
import searchApiJson from "../../../__mocks__/searchApi.page1.json"
import reducer, {
    SET_SEARCH_DATA,
    updateProducts,
    SET_SELECTED_SORTING,
    setFilterClearTypeAction,
    SET_CLEAR_TYPE_FILTER,
    setFilterClearAllAction,
    SET_CLEAR_ALL_FILTER,
    SET_CLEAR_PRICE_FILTER,
    setSelectedSortingAction,
    setFilterIsOpenThunk,
    SET_FILTER_IS_OPEN,
    setViewMoreIsOpenThunk,
    nextPageItemsReadyAction,
    previousPageItemsReadyAction,
    selectTotalPages,
    selectHasNextPage,
    selectHasPreviousPage,
    fetchNextPageItemsThunk,
    fetchPreviousPageItemsThunk,
    setPageItemsThunk,
    setPageItemsAction,
    initialState as initialSearchState,
    setIsFetchingNextPageAction,
    setIsFetchingPreviousPageAction,
    SET_SELECTED_PRICE_FILTER,
    setSelectedPriceFilterAction,
    SET_FACET,
    setFilter,
    mapToInitialPageRange,
    setInitialPageRangeFromPageAction,
    setIsFetchingPageItems,
    setAllFilters,
    SET_ALL_FILTERS,
    selectItems,
    setDebounceTimeAction,
    setSingleOptionFacetList,
    fixFacets,
    selectShouldFacetsBeFixed,
    unfixFacets,
    assignSearchStateAction,
    ASSIGN_SEARCH_STATE,
    setCurrentBreakpointAction,
    SET_CURRENT_BREAKPOINT,
    selectIsFetchingNextPage,
    setBloomreachCookiesInitialLoad,
} from "."
import {pushSearchResultsEvent} from "../../utils/pushSearchResultsEvent"
import PublishProductSummaryTrackPage from "../../events/publishProductSummaryTrackPage"
import TrackFilterSelection from "../../events/trackEvent/events/trackFilterSelection"
import TrackFilterDeselect from "../../events/trackEvent/events/trackFilterDeselect"
import TrackCTATabbedFilters from "../../events/trackEvent/events/trackCTATabbedFilters"
import TrackPriceFilterChange from "../../events/trackEvent/events/trackPriceFilterChange"

import setFilterCookie from "../../utils/setFilterCookie"
import {createMockStoreForRequest, mockState} from "../../../__mocks__/mockStore"
import {REALM_HEADER, SearchApiRequestTypes, TERRITORY_HEADER, TOKEN_CANCELLATION_FLAG} from "../../config/constants"
import {getProductsFragment} from "../../api/getProductsFragment"
import {getProductsFragmentByPage} from "../../api/getProductsFragmentByPage"
import {appendFilterData, createProductsFragment, mapProductsFragmentToItems} from "../../utils/productsFragment"
import {getProducts} from "../../api/getProducts"
import {FilterFacet, FilterPrice} from "../../models/Filter"
import * as Debouncer from "../../utils/debounceAndGetCancelToken"
import * as TypeGuards from "../../models/searchApi/typeGuards"
import {assignCategoryQuickLinks} from "../categoryQuickLinks"
import {selectSeoMetadata} from "../../utils/seo/selectSeoMetadata"
import {selectedFacetFilterTitle} from "../../utils/selectedFacetFilterTitle"
import {updateDocumentSeoMetadata} from "../../utils/seo/updateDocumentSeoMetadata"
import {syncTabbedFiltersFromSearch} from "../tabbedFilters"
import {ASSIGN_REQUEST_STATE} from "../request"
import {NEXT_PAGE, PREV_PAGE} from "../../models/Lazyload"
import {getSEOFiltersHTML} from "../../utils/getSEOFiltersHTML"

const mockStoreDispatch = jest.fn()
const mockGetState = jest.fn()
const mockJson = searchApiJson
const mockHtml = "<html></html>"
const expectedState = {...mockState.search}

jest.mock("../tabbedFilters")

jest.mock("../../utils/seo/selectSeoMetadata")

jest.mock("../../utils/seo/updateDocumentSeoMetadata")

jest.mock("../../utils/getSEOFiltersHTML", () => ({
    getSEOFiltersHTML: jest.fn(),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("../../api/getProducts", () => ({
    getProducts: jest.fn(async headers => {
        if (headers.throwError) throw new Error("Error")
        if (headers.noResults) return Promise.resolve({...mockJson, totalResults: 0, items: []})

        return Promise.resolve(mockJson)
    }),
    getProductsHTML: jest.fn(() => mockHtml),
}))

jest.mock("../../utils/mapApiDataToState", () => ({
    __esModule: true,
    default: jest.fn(({totalResults}) => {
        if (totalResults === 0) return {...mockState.search, totalResults: 0, items: []}
        return {...mockState.search}
    }),
}))

jest.mock("../../utils/selectedFacetFilterTitle", () => ({
    __esModule: true,
    selectedFacetFilterTitle: jest.fn(() => {
        return "Brand: test1, test2 | Category: test3"
    }),
}))

jest.mock("../../utils/setFilterCookie", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackFilterSelection", () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock("../../events/publishProductSummaryTrackPage", () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock("../../utils/pushSearchResultsEvent", () => ({
    pushSearchResultsEvent: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackFilterDeselect", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackCTATabbedFilters", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackPriceFilterChange", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../api/getProductsFragment", () => ({
    getProductsFragment: jest.fn(),
}))

jest.mock("../../api/getProductsFragmentByPage", () => ({
    getProductsFragmentByPage: jest.fn(),
}))

jest.mock("@monorepo/core-logger", () => ({
    __esModule: true,
    default: {
        debug: jest.fn(),
        error: jest.fn(),
    },
}))

const initialState = {
    request: {
        headers: {"my-header": "test"},
        url: "http://www.test.co.uk/testCategory",
        searchTerm: "red",
        type: SearchApiRequestTypes.Keyword,
        category: "testCategory",
        siteUrl: "http://www.test.co.uk",
        bloomreachPersonalizationEnabled: false,
    },
    dispatch: null,
    theme: null,
    search: initialSearchState,
    tabbedFilters: {
        isOpen: false,
    },
    seoFilters: {
        filterDepthCount: 6,
    },
    features: {},
}

function createMockState({request = {}, search = {}, features = {}}: any = {}) {
    return {
        ...initialState,
        request: {
            ...initialState.request,
            ...request,
        },
        search: {
            ...initialState.search,
            ...search,
        },
        tabbedFilters: {
            isOpen: true,
        },
        seoFilters: {
            filterDepthCount: 6,
        },
        features: {
            ...initialState.features,
            ...features,
        },
    }
}

function mockTheGetStateFn({request = {}, search = {}, features = {}}: any = {}) {
    mockGetState.mockReturnValue(createMockState({request, search, features}))
}

function mockSuccessfulGetProductsFragmentFnCall(resolvedValue: any) {
    ;(getProductsFragment as any).mockResolvedValue(resolvedValue)
}

function mockFailingGetProductsFragmentFnCall(rejectedValue: any) {
    ;(getProductsFragment as any).mockRejectedValue(rejectedValue)
}

function mockSuccessfulGetProductsByPageFragmentFnCall(resolvedValue: any) {
    ;(getProductsFragmentByPage as any).mockResolvedValue(resolvedValue)
}

function mockFailingGetProductsFragmentByPageFnCall(rejectedValue: any) {
    ;(getProductsFragmentByPage as any).mockRejectedValue(rejectedValue)
}

function mockSelectSeoMetadataResult(result: any) {
    ;(selectSeoMetadata as jest.Mock).mockReturnValue(result)
}

describe("reducers: search", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            const state = reducer(undefined, {
                type: null as any,
                data: null as any,
            })
            expect(state).toEqual(initialSearchState)
        })
    })

    describe("When called with `setIsFetchingNextPageAction`", () => {
        it("should return the appropriate state", () => {
            const state = reducer(initialSearchState, setIsFetchingNextPageAction("foo" as any))
            expect(state).toEqual({...initialSearchState, isFetchingNextPage: "foo"})
        })
    })

    describe("When called with `setIsFetchingPreviousPageAction`", () => {
        it("should return the appropriate state", () => {
            const state = reducer(initialSearchState, setIsFetchingPreviousPageAction("bar" as any))
            expect(state).toEqual({...initialSearchState, isFetchingPreviousPage: "bar"})
        })
    })

    describe("When called with `setDebounceTimeAction`", () => {
        it("should return the appropriate state", () => {
            const state = reducer(initialSearchState, setDebounceTimeAction(300))
            expect(state).toEqual({...initialSearchState, debounceTime: 300})
        })
    })

    describe("When called with `setSingleOptionFacetList`", () => {
        it("should return the appropriate state", () => {
            const state = reducer(initialSearchState, setSingleOptionFacetList(["test1"]))
            expect(state).toEqual({...initialSearchState, singleOptionFacetList: ["test1"]})
        })
    })

    describe("When called with `assignSearchStateAction`", () => {
        it("should return the appropriate state", () => {
            const data = {
                initialItemsPerPage: 0,
                fetchTriggerOffset: {
                    xs: 0,
                    sm: 0,
                    md: 0,
                    lg: 0,
                    xl: 0,
                },
            }
            const state = reducer(initialSearchState, assignSearchStateAction(data))
            expect(state).toEqual({...initialSearchState, ...data})
        })
    })

    describe("When called with `setPageItemsAction`", () => {
        it("should return the appropriate state", () => {
            const mockItems = [
                {itemNumber: "1", newIn: true},
                {itemNumber: "2", newIn: false},
            ]
            const state = reducer(initialSearchState, setPageItemsAction(mockItems))
            expect(state).toEqual({
                ...initialSearchState,
                items: mockItems,
                isFetchingPageItems: false,
                isFetchingNextPage: false,
                isFetchingPreviousPage: false,
            })
        })
    })

    describe("When called with `setIsFetchingPageItems`", () => {
        it("should return the appropriate state", () => {
            const state = reducer(initialSearchState, setIsFetchingPageItems(false))
            expect(state).toEqual({
                ...initialSearchState,
                isFetchingPageItems: false,
                isFetchingNextPage: false,
                isFetchingPreviousPage: false,
            })
        })
    })

    describe("When called with `setInitialPageRangeFromPageAction`", () => {
        it("should return the appropriate state", () => {
            const state = reducer(initialSearchState, setInitialPageRangeFromPageAction(8))
            expect(state).toEqual({...initialSearchState, ...mapToInitialPageRange(8)})
        })
    })

    describe("When called with `nextPageItemsReadyAction`", () => {
        it("should return the appropriate state", () => {
            const stateBefore = {
                ...initialSearchState,
                items: [
                    {itemNumber: "1", newIn: false},
                    {itemNumber: "2", newIn: true},
                ],
                startPage: 5,
                endPage: 5,
                isFetchingNextPage: true,
            }
            const action = nextPageItemsReadyAction(
                [
                    {itemNumber: "3", newIn: false},
                    {itemNumber: "4", newIn: true, html: "foo.."},
                ],
                6,
            )
            const state = reducer(stateBefore, action)
            expect(state).toEqual({
                ...stateBefore,
                items: [
                    {itemNumber: "1", newIn: false},
                    {itemNumber: "2", newIn: true},
                    {itemNumber: "3", newIn: false},
                    {itemNumber: "4", newIn: true, html: "foo.."},
                ],
                endPage: 6,
                isFetchingNextPage: false,
            })
        })
    })

    describe("When called with `previousPageItemsReadyAction`", () => {
        it("should return the appropriate state", () => {
            const stateBefore = {
                ...initialSearchState,
                items: [
                    {itemNumber: "3", newIn: false},
                    {itemNumber: "4", newIn: true},
                ],
                endPage: 5,
                startPage: 5,
                isFetchingPreviousPage: true,
            }
            const action = previousPageItemsReadyAction(
                [
                    {itemNumber: "1", newIn: false},
                    {itemNumber: "2", newIn: true, html: "foo.."},
                ],
                4,
            )
            const state = reducer(stateBefore, action)
            expect(state).toEqual({
                ...stateBefore,
                startPage: 4,
                items: [
                    {itemNumber: "1", newIn: false},
                    {itemNumber: "2", newIn: true, html: "foo.."},
                    {itemNumber: "3", newIn: false},
                    {itemNumber: "4", newIn: true},
                ],
                isFetchingPreviousPage: false,
            })
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialSearchState, {
                    type: null as any,
                    data: null as any,
                }),
            ).toEqual({
                ...initialSearchState,
            })
        })
    })

    describe("When called with SET_SEARCH_DATA", () => {
        it(`should update the state`, () => {
            const state = {
                ...initialSearchState,
            }
            expect(
                reducer(state, {
                    type: SET_SEARCH_DATA,
                    data: {
                        ...expectedState,
                        facets: {
                            ...expectedState.facets,
                            test1: {
                                n: "test1",
                                c: 1,
                                v: "test1",
                                s: true,
                                incompatibleWith: ["test2"],
                                d: false,
                            },
                            test2: {
                                n: "test2",
                                c: 1,
                                v: "test2",

                                incompatibleWith: ["test1"],
                                d: false,
                            },
                        },
                    },
                }),
            ).toEqual({
                ...expectedState,
                facets: {
                    ...expectedState.facets,
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1",
                        s: true,
                        incompatibleWith: ["test2"],
                        d: false,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: true,
                    },
                },
            })
        })
    })

    describe("When called with SET_FACET", () => {
        it(`should update the state`, () => {
            const variation = {
                facets: {
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1",
                        incompatibleWith: ["test2"],
                        d: false,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                },
            }
            expect(
                reducer(
                    {...initialSearchState, ...variation},
                    {
                        type: SET_FACET,
                        value: "test1",
                    },
                ),
            ).toEqual({
                ...initialSearchState,
                facets: {
                    test1: {
                        c: 1,
                        d: false,
                        incompatibleWith: ["test2"],
                        n: "test1",
                        s: true,
                        v: "test1",
                    },
                    test2: {
                        c: 1,
                        d: true,
                        incompatibleWith: ["test1"],
                        n: "test2",
                        v: "test2",
                    },
                },
            })
        })

        it(`should call TrackFilterSelection if the filter was previously unselected (or deselected)`, () => {
            const variation = {
                facets: {
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1:testFacet",
                        incompatibleWith: ["test2"],
                        d: false,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                },
            }
            expect(
                reducer(
                    {...initialSearchState, ...variation},
                    {
                        type: SET_FACET,
                        value: "test1",
                    },
                ),
            ).toEqual({
                ...initialSearchState,
                facets: {
                    test1: {
                        c: 1,
                        d: false,
                        incompatibleWith: ["test2"],
                        n: "test1",
                        s: true,
                        v: "test1:testFacet",
                    },
                    test2: {
                        c: 1,
                        d: true,
                        incompatibleWith: ["test1"],
                        n: "test2",
                        v: "test2",
                    },
                },
            })
            expect(TrackFilterSelection).toBeCalledWith("test1", "testFacet")
        })

        it(`should call TrackFilterDeselect if the filter was previously selected)`, () => {
            const variation = {
                facets: {
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1:testFacet",
                        incompatibleWith: ["test2"],
                        d: false,
                        s: true,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                },
            }
            expect(
                reducer(
                    {...initialSearchState, ...variation},
                    {
                        type: SET_FACET,
                        value: "test1",
                    },
                ),
            ).toEqual({
                ...initialSearchState,
                facets: {
                    test1: {
                        c: 1,
                        d: false,
                        incompatibleWith: ["test2"],
                        n: "test1",
                        s: false,
                        v: "test1:testFacet",
                    },
                    test2: {
                        c: 1,
                        d: true,
                        incompatibleWith: ["test1"],
                        n: "test2",
                        v: "test2",
                    },
                },
            })
            expect(TrackFilterDeselect).toBeCalledWith("test1", "testFacet")
        })
    })

    describe("When calling setAllFilters", () => {
        it("should dispatch SET_ALL_FILTERS", () => {
            const variation = {
                facets: {
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "brand:test1",
                        incompatibleWith: ["test2"],
                        d: false,
                        s: true,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "brand:test2",
                        incompatibleWith: ["test1"],
                        d: false,
                        s: true,
                    },
                    test3: {
                        n: "test3",
                        c: 1,
                        v: "category:test3",
                        incompatibleWith: ["test1"],
                        d: false,
                        s: true,
                    },
                },
            }
            setAllFilters({...initialSearchState, ...variation})(mockStoreDispatch)
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_ALL_FILTERS,
                value: {
                    ...initialSearchState,
                    facets: {
                        ...variation.facets,
                    },
                },
            })
            expect(selectedFacetFilterTitle).toBeCalled()
            expect(TrackCTATabbedFilters).toBeCalledWith("Brand: test1, test2 | Category: test3")
        })
    })

    describe("When called with `setBloomreachCookiesInitialLoad`", () => {
        it("should return the appropriate state", () => {
            const bloomreachCookiesInitialVal = {
                brUid2: "test_br_uid_2",
                brMtSearch: "test_br_mt_search",
            }
            const state = reducer(initialSearchState, setBloomreachCookiesInitialLoad(bloomreachCookiesInitialVal))
            expect(state).toEqual({
                ...initialSearchState,
                bloomreachCookiesInitialVal: {
                    brUid2: "test_br_uid_2",
                    brMtSearch: "test_br_mt_search",
                },
            })
        })
    })

    describe("When called with SET_ALL_FILTERS", () => {
        it(`should update the state`, () => {
            const variation = {
                facets: {
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1",
                        incompatibleWith: ["test2"],
                        d: false,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                },
            }
            expect(
                reducer(
                    {...initialSearchState, ...variation},
                    {
                        type: SET_ALL_FILTERS,
                        value: {
                            facets: {
                                test3: {
                                    n: "test3",
                                    c: 1,
                                    v: "test3",
                                    incompatibleWith: ["test2"],
                                    d: false,
                                },
                            },
                        },
                    },
                ),
            ).toEqual({
                ...initialSearchState,
                facets: {
                    ...variation.facets,
                    test3: {
                        n: "test3",
                        c: 1,
                        v: "test3",
                        incompatibleWith: ["test2"],
                        d: false,
                    },
                },
            })
        })
    })
    describe("When called with SET_CLEAR_TYPE_FILTER", () => {
        it(`should update the state`, () => {
            const newInitialSearchState: SearchState = {
                ...initialSearchState,
                facets: {
                    ...initialSearchState.facets,
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1",
                        s: true,
                        incompatibleWith: ["test2"],
                        d: false,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        s: true,
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                    anything: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        s: true,
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                    anything2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                },
            }
            expect(
                reducer(
                    {...newInitialSearchState},
                    {
                        type: SET_CLEAR_TYPE_FILTER,
                        payload: "test",
                    },
                ),
            ).toEqual({
                ...initialSearchState,
                facets: {
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1",
                        incompatibleWith: ["test2"],
                        d: false,
                        s: false,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                        s: false,
                    },
                    anything: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        s: true,
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                    anything2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                },
            })
        })
    })
    describe("When called with SET_CLEAR_ALL_FILTER", () => {
        it(`should update the state`, () => {
            const newInitialSearchState: SearchState = {
                ...initialSearchState,
                facets: {
                    ...initialSearchState.facets,
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1",
                        s: true,
                        incompatibleWith: ["test2"],
                        d: false,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                    anything: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        s: true,
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                },
            }
            expect(
                reducer(
                    {...newInitialSearchState},
                    {
                        type: SET_CLEAR_ALL_FILTER,
                    },
                ),
            ).toEqual({
                ...initialSearchState,
                facets: {
                    test1: {
                        n: "test1",
                        c: 1,
                        v: "test1",
                        incompatibleWith: ["test2"],
                        d: false,
                        s: false,
                    },
                    test2: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                    },
                    anything: {
                        n: "test2",
                        c: 1,
                        v: "test2",
                        incompatibleWith: ["test1"],
                        d: false,
                        s: false,
                    },
                },
            })
        })
    })
    describe("When called with SET_CLEAR_PRICE_FILTER", () => {
        it(`should update the state`, () => {
            const priceFilter = {
                min: 0,
                max: 100,
                selectedMin: 0,
                selectedMax: 60,
                currencyCode: "GBP",
                name: "Price",
                displayName: "Price",
                type: "price",
                isFilterOpen: false,
            } as FilterPrice
            const newInitialSearchState: SearchState = {
                ...initialSearchState,
                filters: {
                    ...initialSearchState.filters,
                    Price: priceFilter,
                },
            }
            expect(
                reducer(
                    {...newInitialSearchState},
                    {
                        type: SET_CLEAR_PRICE_FILTER,
                    },
                ),
            ).toEqual({
                ...initialSearchState,
                filters: {
                    ...initialSearchState.filters,
                    Price: {
                        min: 0,
                        max: 100,
                        selectedMin: 0,
                        selectedMax: 100,
                        currencyCode: "GBP",
                        name: "Price",
                        displayName: "Price",
                        type: "price",
                        isFilterOpen: false,
                    },
                },
            })
        })
    })

    describe("When called with SET_SELECTED_PRICE_FILTER", () => {
        const variation = {
            filters: {
                filter1: {
                    name: "Test2 with options",
                    displayName: "",
                    type: "price",
                    isFilterOpen: false,
                    max: 100,
                    min: 0,
                    selectedMax: 70,
                    selectedMin: 30,
                },
            },
        }
        it(`should update the state and call TrackPriceFilterChange`, () => {
            expect(
                reducer({...initialState, ...variation} as any, {
                    type: SET_SELECTED_PRICE_FILTER,
                    data: {facetName: "filter1", selectedMin: 15, selectedMax: 34},
                }),
            ).toEqual({
                ...initialState,
                filters: {
                    filter1: {
                        name: "Test2 with options",
                        displayName: "",
                        type: "price",
                        isFilterOpen: false,
                        max: 100,
                        min: 0,
                        selectedMax: 34,
                        selectedMin: 15,
                    },
                },
            })
            expect(TrackPriceFilterChange).toBeCalledWith(15, 34)
        })
    })

    describe("When called with SET_FILTER_IS_OPEN", () => {
        const mockInitialState = {
            ...expectedState,
        }

        mockInitialState.filters.Size = {
            name: "Size",
            type: "filter",
            isFilterOpen: false,
            isViewMoreOpen: false,
        } as FilterFacet

        const expectedFacetState = {
            ...mockInitialState,
        }
        expectedFacetState.filters.Size.isFilterOpen = true
        ;(expectedFacetState.filters.Size as FilterFacet).isViewMoreOpen = true

        const data = {isOpen: true, isViewMoreOpen: true, name: "Size"}
        it(`should update the state`, () => {
            expect(
                reducer(mockInitialState, {
                    type: SET_FILTER_IS_OPEN,
                    data,
                }),
            ).toEqual({
                ...expectedFacetState,
            })
        })
    })

    describe("When called with SET_SELECTED_SORTING", () => {
        const expectedSortingState = {
            ...expectedState,
        }
        expectedSortingState.sorting.selected = "beta"
        it(`should update the state`, () => {
            expect(
                reducer(expectedState, {
                    type: SET_SELECTED_SORTING,
                    value: "beta",
                }),
            ).toEqual({
                ...expectedSortingState,
            })
        })
    })
    describe("When called with SET_CURRENT_BREAKPOINT", () => {
        const expectedSortingState = {
            ...expectedState,
        }
        expectedSortingState.currentBreakpoint = "sm"
        it(`should update the state`, () => {
            expect(
                reducer(expectedState, {
                    type: SET_CURRENT_BREAKPOINT,
                    payload: "sm",
                }),
            ).toEqual({
                ...expectedSortingState,
            })
        })
    })
})

describe("Given the `selectTotalPages`", () => {
    it("should return to 6 pages", () => {
        const state = {
            ...initialState,
            search: {
                ...initialState.search,
                totalResults: 100,
                initialItemsPerPage: 10,
                currentBreakpoint: "md",
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
            },
        } as any

        expect(selectTotalPages(state)).toEqual(7)
    })
    it("should return to 9 pages", () => {
        const state = {
            ...initialState,
            search: {
                ...initialState.search,
                totalResults: 100,
                initialItemsPerPage: 20,
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
                currentBreakpoint: "sm",
            },
        } as any

        expect(selectTotalPages(state)).toEqual(9)
    })
})

describe("Given the `selectHasNextPage` selector", () => {
    it("should return true when there is a next page to fetch", () => {
        const result = selectHasNextPage({
            search: {
                ...initialSearchState,
                totalResults: 10,
                endPage: 1,
                initialItemsPerPage: 3,
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
                currentBreakpoint: "sm",
            },
        } as any)
        expect(result).toBe(true)
    })

    it("should return false when there is no next page to fetch", () => {
        const result = selectHasNextPage({
            search: {
                ...initialSearchState,
                totalResults: 5,
                endPage: 1,
                initialItemsPerPage: 5,
            },
        } as any)
        expect(result).toBe(false)
    })
})

describe("Given the `selectHasPreviousPage` selector", () => {
    it("should return true when there is a previous page to fetch", () => {
        const state = {
            search: {
                ...initialSearchState,
                totalResults: 10,
                itemsPerPage: 5,
                startPage: 2,
            },
        } as any
        expect(selectHasPreviousPage(state)).toBe(true)
    })

    it("should return false when there is no previous page to fetch", () => {
        const result = selectHasPreviousPage({
            search: {
                ...initialSearchState,
                totalResults: 5,
                itemsPerPage: 5,
                startPage: 1,
            },
        } as any)
        expect(result).toBe(false)
    })
})

describe("Given the fetchNextPageItemsThunk", () => {
    const pageToFetch = 2
    const items = [
        {itemNumber: "1", newIn: true},
        {itemNumber: "2", newIn: false},
    ]
    const itemsFragment = createProductsFragment(items, "http://www.test.com", false)
    const request = {
        headers: {foo: "bar"},
        siteUrl: "http://www.test.com",
        url: "http://www.test.co.uk",
        searchTerm: "red",
        type: SearchApiRequestTypes.Keyword,
    }

    describe("When the fetch is successful", () => {
        beforeAll(async () => {
            jest.clearAllMocks()
            mockTheGetStateFn({
                request,
                search: {
                    totalResults: 10,
                    endPage: 1,
                    isFetchingNextPage: true,
                    initialItemsPerPage: 5,
                    fetchTriggerOffset: {
                        xs: 4,
                        sm: 4,
                        md: 6,
                        lg: 6,
                        xl: 8,
                    },
                },
            })
            mockSuccessfulGetProductsFragmentFnCall(itemsFragment)
            await fetchNextPageItemsThunk()(mockStoreDispatch, mockGetState as any)
        })

        it("should flag as fetching the next page", () => {
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(1, setIsFetchingNextPageAction(true))
        })

        it("should fetch the next page of items", () => {
            expect(getProductsFragment).toHaveBeenCalledTimes(1)
            expect(getProductsFragment).toHaveBeenCalledWith({
                headers: request.headers,
                baseUrl: "http://www.test.com",
                start: 5,
                pageSize: 28,
                searchTerm: request.searchTerm,
                type: request.type,
                url: request.url,
                fields: ["items"],
                bloomreachCookiesInitialVal: {
                    brUid2: "",
                    brMtSearch: "",
                },
                bloomreachPersonalizationEnabled: false,
            })
        })

        it("should publish a PublishProductSummaryTrackPage event", () => {
            expect(PublishProductSummaryTrackPage).toHaveBeenCalledWith([
                {itemNumber: "1", index: 5},
                {itemNumber: "2", index: 6},
            ])
        })

        it("should publish a pushSearchResultsEvent", () => {
            expect(pushSearchResultsEvent).toHaveBeenCalled()
        })

        it("should dispatch an action to update the state with the next page of items", () => {
            const lazyloadItemIndexFrom = 2
            const fragmentItems = mapProductsFragmentToItems(itemsFragment, lazyloadItemIndexFrom, NEXT_PAGE)
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(
                2,
                nextPageItemsReadyAction(fragmentItems.items, pageToFetch),
            )
        })
    })

    describe("When the isFetchingNextPageItems is overwritten to false", () => {
        beforeAll(async () => {
            jest.clearAllMocks()
            mockTheGetStateFn({
                request,
                search: {
                    totalResults: 10,
                    endPage: 1,
                    isFetchingNextPage: false,
                    initialItemsPerPage: 5,
                    fetchTriggerOffset: {
                        xs: 4,
                        sm: 4,
                        md: 6,
                        lg: 6,
                        xl: 8,
                    },
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
                    currentBreakpoint: "sm",
                },
            })
            mockFailingGetProductsFragmentByPageFnCall(itemsFragment)
            await fetchNextPageItemsThunk()(mockStoreDispatch, mockGetState as any)
        })

        it("should fetch the next page of items", () => {
            expect(getProductsFragment).toHaveBeenCalledTimes(1)
            expect(getProductsFragment).toHaveBeenCalledWith({
                headers: request.headers,
                baseUrl: "http://www.test.com",
                start: 5,
                pageSize: 10,
                searchTerm: request.searchTerm,
                type: request.type,
                url: request.url,
                fields: ["items"],
                bloomreachCookiesInitialVal: {
                    brUid2: "",
                    brMtSearch: "",
                },
                bloomreachPersonalizationEnabled: false,
            })
        })

        it("should not dispatch an action to update the state with the next page of items", () => {
            const lazyloadItemIndexFrom = 2
            const fragmentItems = mapProductsFragmentToItems(itemsFragment, lazyloadItemIndexFrom, NEXT_PAGE)
            expect(mockStoreDispatch).not.toHaveBeenCalledWith(
                3,
                nextPageItemsReadyAction(fragmentItems.items, pageToFetch),
            )
        })
    })

    describe("When the fetch fails", () => {
        const error = new Error("Oops...")
        const {location} = window
        beforeEach(() => {
            jest.clearAllMocks()
            mockTheGetStateFn({
                request,
                search: {
                    totalResults: 10,
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
                    endPage: 1,
                },
            })
            mockFailingGetProductsFragmentFnCall(error)
        })

        beforeAll((): void => {
            delete window.location
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            window.location = {href: jest.fn()}
        })

        afterAll(() => {
            window.location = location
        })

        it("should flag as no longer fetching the next page", async () => {
            try {
                await fetchNextPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            } catch (e) {} // eslint-disable-line

            expect(mockStoreDispatch).toHaveBeenLastCalledWith(setIsFetchingNextPageAction(false))
        })

        it("should log the error", async () => {
            try {
                await fetchNextPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            } catch (e) {} // eslint-disable-line

            // eslint-disable-next-line
            expect(logger.error).toHaveBeenCalledWith(error, "fetch-next-products-page-error")
        })

        it("should rethrow the error", () => {
            const promise = fetchNextPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            // eslint-disable-next-line
            expect(promise).rejects.toEqual(error)
        })

        it("should have called window.location.href", () => {
            expect(window.location.href).toEqual("http://www.test.com/error")
        })
    })
})

describe("Given the fetchPreviousPageItemsThunk", () => {
    const pageToFetch = 1
    const items = [
        {itemNumber: "1", newIn: true},
        {itemNumber: "2", newIn: false},
    ]
    const itemsFragment = createProductsFragment(items, "http://www.test.com", false)
    const request = {
        headers: {foo: "bar"},
        url: "http://www.test.co.uk",
        siteUrl: "http://www.test.com",
        searchTerm: "red",
        type: SearchApiRequestTypes.Keyword,
    }

    describe("When the fetch is successful", () => {
        beforeAll(async () => {
            jest.clearAllMocks()
            mockTheGetStateFn({
                request,
                search: {
                    totalResults: 10,
                    startPage: 2,
                    isFetchingPreviousPage: true,
                    initialItemsPerPage: 5,
                    fetchTriggerOffset: {
                        xs: 4,
                        sm: 4,
                        md: 6,
                        lg: 6,
                        xl: 8,
                    },
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
                    currentBreakpoint: "xl",
                },
            })
            mockSuccessfulGetProductsByPageFragmentFnCall(itemsFragment)
            await fetchPreviousPageItemsThunk()(mockStoreDispatch, mockGetState as any)
        })

        it("should flag as fetching the previous page", () => {
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(1, setIsFetchingPreviousPageAction(true))
        })

        it("should publish a PublishProductSummaryTrackPage event", () => {
            expect(PublishProductSummaryTrackPage).toHaveBeenCalledWith([
                {itemNumber: "1", index: 0},
                {itemNumber: "2", index: 1},
            ])
        })
        it("should publish a pushSearchResultsEvent", () => {
            expect(pushSearchResultsEvent).toHaveBeenCalled()
        })
        it("should fetch the previous page of items", () => {
            expect(getProductsFragmentByPage).toHaveBeenCalledTimes(1)

            expect(getProductsFragmentByPage).toHaveBeenCalledWith({
                headers: request.headers,
                baseUrl: "http://www.test.com",
                startPage: pageToFetch,
                endPage: pageToFetch,
                pageSize: 28,
                searchTerm: request.searchTerm,
                type: request.type,
                url: request.url,
                fields: ["items"],
                bloomreachCookiesInitialVal: {
                    brUid2: "",
                    brMtSearch: "",
                },
                bloomreachPersonalizationEnabled: false,
            })
        })

        it("should dispatch an action to update the state with the previous page of items", () => {
            const lazyloadItemIndexFrom = 3
            const fragmentItems = mapProductsFragmentToItems(itemsFragment, lazyloadItemIndexFrom, PREV_PAGE)
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(
                2,
                previousPageItemsReadyAction(fragmentItems.items, pageToFetch),
            )
        })
    })

    describe("When the isFetchingPreviousPage is overwritten to false", () => {
        beforeAll(async () => {
            jest.clearAllMocks()
            mockTheGetStateFn({
                request,
                search: {
                    totalResults: 10,
                    startPage: 2,
                    isFetchingPreviousPage: false,
                    initialItemsPerPage: 5,
                    fetchTriggerOffset: {
                        xs: 4,
                        sm: 4,
                        md: 6,
                        lg: 6,
                        xl: 8,
                    },
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
                    currentBreakpoint: "md",
                },
            })
            mockSuccessfulGetProductsByPageFragmentFnCall(itemsFragment)
            await fetchPreviousPageItemsThunk()(mockStoreDispatch, mockGetState as any)
        })

        it("should fetch the previous page of items", () => {
            expect(getProductsFragmentByPage).toHaveBeenCalledTimes(1)
            expect(getProductsFragmentByPage).toHaveBeenCalledWith({
                headers: request.headers,
                baseUrl: "http://www.test.com",
                startPage: pageToFetch,
                endPage: pageToFetch,
                pageSize: 16,
                searchTerm: request.searchTerm,
                type: request.type,
                url: request.url,
                fields: ["items"],
                bloomreachCookiesInitialVal: {
                    brUid2: "",
                    brMtSearch: "",
                },
                bloomreachPersonalizationEnabled: false,
            })
        })

        it("not dispatch an action to update the state with the previous page of item", () => {
            const lazyloadItemIndexFrom = 3
            const fragmentItems = mapProductsFragmentToItems(itemsFragment, lazyloadItemIndexFrom, PREV_PAGE)
            expect(mockStoreDispatch).not.toHaveBeenCalledWith(
                previousPageItemsReadyAction(fragmentItems.items, pageToFetch),
            )
        })
    })

    describe("When the fetch fails", () => {
        const error = new Error("Oops...")
        const {location} = window
        beforeEach(() => {
            jest.clearAllMocks()
            mockTheGetStateFn({
                request,
                search: {
                    totalResults: 10,
                    startPage: 2,
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
                },
            })
            mockFailingGetProductsFragmentByPageFnCall(error)
        })

        beforeAll((): void => {
            delete window.location
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            window.location = {href: jest.fn()}
        })

        afterAll(() => {
            window.location = location
        })

        it("should flag as no longer fetching the previous page", async () => {
            try {
                await fetchPreviousPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            } catch (e) {} // eslint-disable-line

            expect(mockStoreDispatch).toHaveBeenLastCalledWith(setIsFetchingPreviousPageAction(false))
        })

        it("should log the error", async () => {
            try {
                await fetchPreviousPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            } catch (e) {} // eslint-disable-line

            // eslint-disable-next-line
            expect(logger.error).toHaveBeenCalledWith(error, "fetch-previous-products-page-error")
        })

        it("should rethrow the error", () => {
            const promise = fetchPreviousPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            // eslint-disable-next-line
            expect(promise).rejects.toEqual(error)
        })

        it("should have called window.location.href", () => {
            expect(window.location.href).toEqual("http://www.test.com/error")
        })
    })
})

describe("Given the setPageItemsThunk", () => {
    const pageToFetch = 1
    const items = [
        {itemNumber: "1", newIn: true},
        {itemNumber: "2", newIn: false},
    ]
    let itemsFragment = createProductsFragment(items, "http://www.test.com", false)

    itemsFragment = appendFilterData(itemsFragment, {...initialSearchState, totalResults: 10})

    const request = {
        headers: {foo: "bar"},
        url: "http://www.test.co.uk/",
        searchTerm: "red",
        type: SearchApiRequestTypes.Keyword,
        siteUrl: "http://www.test.com",
    }

    describe("When the fetch is successful", () => {
        const mockScrollTo = jest.fn()
        const mockPushState = jest.fn()
        const state = createMockState({
            request,
            search: {
                totalResults: 10,
                startPage: 2,
                initialItemsPerPage: 12,
                fetchTriggerOffset: {
                    xs: 4,
                    sm: 4,
                    md: 6,
                    lg: 6,
                    xl: 8,
                },
                currentBreakpoint: "md",
                initialItemsPerPageConfig: {
                    xs: 8,
                    sm: 8,
                    md: 12,
                    lg: 24,
                    xl: 24,
                },
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
            },

            tabbedFilters: {
                isOpen: true,
            },
        })
        const selectedSeoMetadata = {title: "foo..."}

        beforeAll(async () => {
            window.scrollTo = mockScrollTo
            window.history.pushState = mockPushState
            jest.clearAllMocks()

            mockTheGetStateFn(state)
            mockSuccessfulGetProductsByPageFragmentFnCall(itemsFragment)
            mockSelectSeoMetadataResult(selectedSeoMetadata)
            await setPageItemsThunk()(mockStoreDispatch, mockGetState as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should clear the current page items", () => {
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(1, setIsFetchingPageItems(true))
        })

        it("should fetch the new page items", () => {
            expect(getProductsFragmentByPage).toHaveBeenCalledTimes(1)
            expect(getProductsFragmentByPage).toHaveBeenCalledWith({
                headers: request.headers,
                baseUrl: "http://www.test.com",
                cancelToken: undefined,
                startPage: pageToFetch,
                endPage: pageToFetch,
                pageSize: 12,
                searchTerm: request.searchTerm,
                type: request.type,
                url: request.url,
                fields: [
                    "items",
                    "filters",
                    "totalResults",
                    "sorting",
                    "title",
                    "relaxedQuery",
                    "includedComponents",
                    "searchCategory",
                ],
                bloomreachCookiesInitialVal: {
                    brUid2: "",
                    brMtSearch: "",
                },
                bloomreachPersonalizationEnabled: false,
            })
        })

        it("should dispatch an action to update the state with the new page items", () => {
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(2, {
                type: SET_SEARCH_DATA,
                data: {...mockState.search},
            })
        })

        it("should scroll back to the top of the page", () => {
            expect(mockScrollTo).toHaveBeenCalledWith(0, 0)
        })

        it("should publish a PublishProductSummaryTrackPage event", () => {
            expect(PublishProductSummaryTrackPage).toHaveBeenCalledWith([
                {itemNumber: "111111", index: 0},
                {itemNumber: "222222", index: 1},
            ])
        })
        it("should publish a pushSearchResultsEvent", () => {
            expect(pushSearchResultsEvent).toHaveBeenCalled()
        })

        it("should the updated url to window history", () => {
            expect(mockPushState).toHaveBeenCalledWith(
                {url: "http://www.test.co.uk/", type: "PLP-FILTER-EVENT"},
                "",
                "http://www.test.co.uk/",
            )
        })

        it("should update the document seo metadata", () => {
            expect(selectSeoMetadata).toHaveBeenCalledWith(state)
            expect(updateDocumentSeoMetadata).toHaveBeenCalledWith(selectedSeoMetadata)
        })

        it("should sync the mobile filters", () => {
            expect(syncTabbedFiltersFromSearch).toHaveBeenCalledWith(true)
        })

        describe("when called with debounceEnabled", () => {
            it("should debounce and get cancel token", async () => {
                const spy = jest.spyOn(Debouncer, "debounceAndGetCancelToken")
                await setPageItemsThunk({enableDebounce: true})(mockStoreDispatch, mockGetState as any)

                expect(Debouncer.debounceAndGetCancelToken).toHaveBeenCalledWith(700)
                spy.mockRestore()
            })
        })

        describe("when called with historyUrl", () => {
            beforeAll(async () => {
                window.scrollTo = mockScrollTo
                window.history.pushState = mockPushState
                jest.clearAllMocks()

                mockTheGetStateFn(state)
                mockSuccessfulGetProductsByPageFragmentFnCall(itemsFragment)
                mockSelectSeoMetadataResult(selectedSeoMetadata)
                await setPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            })

            afterAll(() => {
                jest.clearAllMocks()
            })

            it("should fetch data with the correct params and scroll to the correct location", async () => {
                await setPageItemsThunk({historyUrl: "http://localhost:3009/search?w=red&p=1#350"})(
                    mockStoreDispatch,
                    mockGetState as any,
                )

                expect(getProductsFragmentByPage).toHaveBeenCalledWith({
                    headers: request.headers,
                    baseUrl: "http://www.test.com",
                    cancelToken: undefined,
                    startPage: 1,
                    endPage: 1,
                    pageSize: 12,
                    searchTerm: request.searchTerm,
                    type: request.type,
                    url: request.url,
                    fields: [
                        "items",
                        "filters",
                        "totalResults",
                        "sorting",
                        "title",
                        "relaxedQuery",
                        "includedComponents",
                        "searchCategory",
                    ],
                    bloomreachCookiesInitialVal: {
                        brUid2: "",
                        brMtSearch: "",
                    },
                    bloomreachPersonalizationEnabled: false,
                })
                expect(mockScrollTo).toHaveBeenCalledWith(0, 350)
            })
        })
    })

    describe("When the page has a price facet", () => {
        const mockScrollTo = jest.fn()
        const mockPushState = jest.fn()
        beforeAll(async () => {
            window.scrollTo = mockScrollTo
            window.history.pushState = mockPushState
            jest.clearAllMocks()
            mockTheGetStateFn({
                request,
                search: {
                    totalResults: 10,
                    startPage: 2,
                    facets: {
                        Price: {
                            name: "Price",
                            displayName: "Price",
                            type: "price",
                            isFilterOpen: false,
                            min: 0,
                            max: 600,
                            selectedMin: 0,
                            selectedMax: 600,
                        },
                    },
                    initialItemsPerPage: 12,
                    fetchTriggerOffset: {
                        xs: 4,
                        sm: 4,
                        md: 6,
                        lg: 6,
                        xl: 8,
                    },
                    currentBreakpoint: "md",
                    initialItemsPerPageConfig: {
                        xs: 8,
                        sm: 8,
                        md: 12,
                        lg: 24,
                        xl: 24,
                    },
                },
                tabbedFilters: {
                    isOpen: false,
                },
            })
            mockSuccessfulGetProductsByPageFragmentFnCall(itemsFragment)
            await setPageItemsThunk()(mockStoreDispatch, mockGetState as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should clear the current page items", () => {
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(1, setIsFetchingPageItems(true))
        })

        it("should fetch the new page items", () => {
            expect(getProductsFragmentByPage).toHaveBeenCalledTimes(1)
            expect(getProductsFragmentByPage).toHaveBeenCalledWith({
                headers: request.headers,
                baseUrl: "http://www.test.com",
                cancelToken: undefined,
                startPage: pageToFetch,
                endPage: pageToFetch,
                pageSize: 12,
                searchTerm: request.searchTerm,
                type: request.type,
                url: request.url,
                fields: [
                    "items",
                    "filters",
                    "totalResults",
                    "sorting",
                    "title",
                    "relaxedQuery",
                    "includedComponents",
                    "searchCategory",
                ],
                bloomreachCookiesInitialVal: {
                    brUid2: "",
                    brMtSearch: "",
                },
                bloomreachPersonalizationEnabled: false,
            })
        })

        it("should dispatch an action to update the state with the new page items", () => {
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(2, {
                type: SET_SEARCH_DATA,
                data: {...mockState.search},
            })
        })

        it("should dispatch an action to update the SEARCH state with the startPage, endPage, initialItemsPerPage", () => {
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(3, {
                type: ASSIGN_SEARCH_STATE,
                state: {
                    startPage: 1,
                    endPage: 1,
                    initialItemsPerPage: 12,
                },
            })
        })
        it("should dispatch an action to update the REQUEST state with the url", () => {
            expect(mockStoreDispatch).toHaveBeenNthCalledWith(4, {
                type: ASSIGN_REQUEST_STATE,
                state: {
                    url: "http://www.test.co.uk/",
                },
            })
        })
    })

    describe("When the fetch fails", () => {
        const error = new Error("Api error")
        const {location} = window

        beforeEach(() => {
            jest.clearAllMocks()
            mockTheGetStateFn({
                request,
                search: {
                    totalResults: 10,
                    startPage: 1,
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
                },
            })
            mockFailingGetProductsFragmentByPageFnCall(error)
        })

        beforeAll((): void => {
            delete window.location
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            window.location = {href: jest.fn()}
        })

        afterAll(() => {
            window.location = location
        })

        it("should flag as no longer fetching a new page", async () => {
            try {
                await setPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            } catch (e) {} // eslint-disable-line

            expect(mockStoreDispatch).toHaveBeenLastCalledWith(setPageItemsAction([]))
        })

        it("should log the error", async () => {
            try {
                await setPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            } catch (e) {} // eslint-disable-line

            // eslint-disable-next-line
            expect(logger.error).toHaveBeenCalledWith(error, "set-page-items-error")
        })

        it("should rethrow the error", () => {
            const promise = setPageItemsThunk()(mockStoreDispatch, mockGetState as any)
            // eslint-disable-next-line
            expect(promise).rejects.toEqual(error)
        })

        it("should have called window.location.href", () => {
            expect(window.location.href).toEqual("http://www.test.com/error")
        })

        describe("When it fails due to token cancellation", () => {
            it("should continue awaiting next fetch", async () => {
                mockFailingGetProductsFragmentByPageFnCall(new Error(TOKEN_CANCELLATION_FLAG))
                await setPageItemsThunk()(mockStoreDispatch, mockGetState as any)
                expect(mockStoreDispatch).not.toHaveBeenCalledWith(setPageItemsAction([]))
            })
        })
    })
})

describe("Given a setCurrentBreakpointAction", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it("should dispatch SET_CURRENT_BREAKPOINT", () => {
        setCurrentBreakpointAction("md")(mockStoreDispatch)

        expect(mockStoreDispatch).toHaveBeenNthCalledWith(1, {
            type: SET_CURRENT_BREAKPOINT,
            payload: "md",
        })
    })
})
describe("Given a setFilterClearTypeAction", () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })
    it("should dispatch SET_CLEAR_TYPE_FILTER", () => {
        setFilterClearTypeAction("category")(mockStoreDispatch)
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_CLEAR_TYPE_FILTER,
            payload: "category",
        })
    })
})
describe("Given a setFilterClearAllAction", () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })
    it("should dispatch SET_CLEAR_ALL_FILTER and SET_CLEAR_PRICE_FILTER", () => {
        setFilterClearAllAction()(mockStoreDispatch)
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_CLEAR_ALL_FILTER,
        })
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_CLEAR_PRICE_FILTER,
        })
    })
})
describe("Given a setSelectedSortingAction", () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })
    it("should create a SelectedSortingAction", () => {
        setSelectedSortingAction("alpha")(mockStoreDispatch)
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_SELECTED_SORTING,
            value: "alpha",
        })
    })
})

describe("Given setFilter is dispatched", () => {
    const value = "brand:amido"
    beforeAll(() => {
        jest.clearAllMocks()
    })

    it("should create dispatch a SET_FACET action", () => {
        setFilter(value)(mockStoreDispatch)
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_FACET,
            value,
        })
    })
})

describe("Given a setSelectedPriceFilterAction", () => {
    beforeAll(() => {
        jest.clearAllMocks()
    })
    it("should create a setSelectedPriceFilterAction", () => {
        setSelectedPriceFilterAction("facet1", 1, 2)(mockStoreDispatch)
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_SELECTED_PRICE_FILTER,
            data: {facetName: "facet1", selectedMin: 1, selectedMax: 2},
        })
    })
})

describe("Store: getProductsThunk() ", () => {
    const startPage = 3
    const endPage = 5
    const initialItemsPerPage = 12
    describe("When loading products", () => {
        beforeAll(async () => {
            jest.clearAllMocks()
            mockTheGetStateFn({search: {startPage, endPage, initialItemsPerPage}})
            await updateProducts({dispatch: mockStoreDispatch, getState: mockGetState} as any)
        })

        it("should call the `getProducts(...)` function properly", () => {
            expect(getProducts).toHaveBeenCalledWith(
                initialState.request.headers,
                initialState.request.url,
                initialState.request.searchTerm,
                initialState.request.type,
                {
                    brUid2: "",
                    brMtSearch: "",
                },
                false,
                startPage,
                endPage,
                initialItemsPerPage,
                [
                    "items",
                    "filters",
                    "totalResults",
                    "sorting",
                    "title",
                    "autoCorrectQuery",
                    "relaxedQuery",
                    "includedComponents",
                    "searchCategory",
                ],
            )
        })

        it("should call the store dispatch", () => {
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_SEARCH_DATA,
                data: expectedState,
            })
        })

        it("should return the search api data", () => {
            expect(mockStoreDispatch).toHaveBeenCalled()
        })
    })
    describe("When loading products with a filtered URL", () => {
        beforeAll(async () => {
            const filteredRequest = {
                headers: {"my-header": "test"},
                url: "http://www.test.co.uk/shop/gender-women-productaffiliation-alldenim/category-jeans",
                searchTerm: "",
                type: SearchApiRequestTypes.Category,
                category: "testCategory",
                siteUrl: "http://www.test.co.uk",
            }
            jest.clearAllMocks()
            mockTheGetStateFn({request: filteredRequest, search: {startPage, endPage, initialItemsPerPage}})
            await updateProducts({dispatch: mockStoreDispatch, getState: mockGetState} as any)
        })
        it("should call seo filters as the number of filters is below the config", () => {
            expect(getSEOFiltersHTML).toHaveBeenCalled()
        })
    })
    describe("When loading products with a none filtered", () => {
        beforeAll(async () => {
            const filteredRequest = {
                headers: {"my-header": "test"},
                url: "http://www.test.co.uk/shop/gender-women-productaffiliation-alldenim",
                searchTerm: "",
                type: SearchApiRequestTypes.Category,
                category: "testCategory",
                siteUrl: "http://www.test.co.uk",
            }
            jest.clearAllMocks()
            mockTheGetStateFn({request: filteredRequest, search: {startPage, endPage, initialItemsPerPage}})
            await updateProducts({dispatch: mockStoreDispatch, getState: mockGetState} as any)
        })
        it("should call seo filters as the number of filters is below the config", () => {
            expect(getSEOFiltersHTML).toHaveBeenCalled()
        })
    })
    describe("When loading products with a isort rev price applied", () => {
        beforeAll(async () => {
            const filteredRequest = {
                headers: {"my-header": "test"},
                url: "http://www.test.co.uk/shop/gender-women-productaffiliation-alldenim/isort-price%20rev",
                searchTerm: "",
                type: SearchApiRequestTypes.Category,
                category: "testCategory",
                siteUrl: "http://www.test.co.uk",
            }
            jest.clearAllMocks()
            mockTheGetStateFn({request: filteredRequest, search: {startPage, endPage, initialItemsPerPage}})
            await updateProducts({dispatch: mockStoreDispatch, getState: mockGetState} as any)
        })
        it("should call seo filters as the number of filters is below the config", () => {
            expect(getSEOFiltersHTML).toHaveBeenCalled()
        })
    })
    describe("When loading products with a filtered URL over the configured amount", () => {
        beforeAll(async () => {
            const filteredRequest = {
                headers: {"my-header": "test"},
                url:
                    "http://www.test.co.uk/shop/gender-women-productaffiliation-alldenim/gender-youngerboys-gender-newbornunisex-gender-olderboys-gender-youngerboys-colour-orange-style-zipthrough-benefit-reversible",
                searchTerm: "",
                type: SearchApiRequestTypes.Category,
                category: "testCategory",
                siteUrl: "http://www.test.co.uk",
            }
            jest.clearAllMocks()
            mockTheGetStateFn({request: filteredRequest, search: {startPage, endPage, initialItemsPerPage}})
            await updateProducts({dispatch: mockStoreDispatch, getState: mockGetState} as any)
        })
        it("should NOT call seo filters as the number of filters is below the config", () => {
            expect(getSEOFiltersHTML).not.toHaveBeenCalled()
        })
    })
    describe("When loading products with a filtered URL that contains duplicates", () => {
        beforeAll(async () => {
            const filteredRequest = {
                headers: {"my-header": "test"},
                url:
                    "http://www.test.co.uk/shop/gender-women-productaffiliation-alldenim/category-jeans-category-jackets",
                searchTerm: "",
                type: SearchApiRequestTypes.Category,
                category: "testCategory",
                siteUrl: "http://www.test.co.uk",
            }
            jest.clearAllMocks()
            mockTheGetStateFn({request: filteredRequest, search: {startPage, endPage, initialItemsPerPage}})
            await updateProducts({dispatch: mockStoreDispatch, getState: mockGetState} as any)
        })
        it("should NOT call seo filters", () => {
            expect(getSEOFiltersHTML).not.toHaveBeenCalled()
        })
    })
    describe("When loading products with a URL that contains duplicates in the baseline", () => {
        beforeAll(async () => {
            const filteredRequest = {
                headers: {"my-header": "test"},
                url: "http://www.test.co.uk/shop/productaffiliation-alldenim-productaffiliation-clothing/",
                searchTerm: "",
                type: SearchApiRequestTypes.Category,
                category: "testCategory",
                siteUrl: "http://www.test.co.uk",
            }
            jest.clearAllMocks()
            mockTheGetStateFn({request: filteredRequest, search: {startPage, endPage, initialItemsPerPage}})
            await updateProducts({dispatch: mockStoreDispatch, getState: mockGetState} as any)
        })
        it("should NOT call seo filters", () => {
            expect(getSEOFiltersHTML).not.toHaveBeenCalled()
        })
    })

    describe("When it is a redirect on successful response", () => {
        it("should return the correct response", async () => {
            const spy = jest.spyOn(TypeGuards, "isRedirectResponse").mockReturnValue(true)
            mockTheGetStateFn({search: {startPage, endPage}})
            const result = await updateProducts({dispatch: mockStoreDispatch, getState: mockGetState} as any)

            expect(result).toEqual(mockJson)
            spy.mockRestore()
        })
    })

    describe("When loading products throws an error", () => {
        const mockGetStateErrorHeaders = jest.fn(() => ({
            request: {
                headers: {throwError: true, "my-header": "test"},
                url: "http://www.test.co.uk",
                siteUrl: {url: "http://IamSiteUrl"},
            },
            dispatch: null,
            theme: null,
            search: {},
        }))

        it("should error when updateProducts is called", async () => {
            await expect(
                updateProducts({dispatch: mockStoreDispatch, getState: mockGetStateErrorHeaders} as any),
            ).rejects.toThrowError()
        })
    })

    describe("When there are no results", () => {
        beforeAll(() => {
            jest.clearAllMocks()
        })
        it("should dispatch an action to assign the category quick link items", async () => {
            const realm = "amido"
            const territory = "gb"
            const siteUrl = "http://site.url"
            const store = createMockStoreForRequest({
                siteUrl,
                headers: {
                    noResults: true,
                    [REALM_HEADER]: realm,
                    [TERRITORY_HEADER]: territory,
                } as any,
            })
            // eslint-disable-next-line @typescript-eslint/unbound-method
            await updateProducts({dispatch: store.dispatch, getState: store.getState} as any)
            expect(store.getActions()).toContainEqual(assignCategoryQuickLinks(realm, territory, siteUrl))
        })
    })
})

describe("Store: setFilterIsOpenThunk() ", () => {
    describe("When setting filter open", () => {
        beforeAll(() => {
            jest.clearAllMocks()
            mockTheGetStateFn({search: {filters: {Size: {name: "Size", isViewMoreOpen: false, isFilterOpen: false}}}})
            setFilterIsOpenThunk(true, "Size")(mockStoreDispatch, mockGetState)
        })

        it("should call setFilterCookie", () => {
            expect(setFilterCookie).toHaveBeenCalledWith(
                "red",
                SearchApiRequestTypes.Keyword,
                "http://www.test.co.uk/testCategory",
                "http://www.test.co.uk",
                "Size",
                true,
                false,
            )
        })

        it("should call the store dispatch", () => {
            const data = {isOpen: true, isViewMoreOpen: false, name: "Size"}
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_FILTER_IS_OPEN,
                data,
            })
        })
    })

    describe("When setting price filter", () => {
        beforeAll(() => {
            jest.clearAllMocks()
            mockTheGetStateFn({search: {filters: {Price: {name: "Price", isFilterOpen: false, type: "price"}}}})
            setFilterIsOpenThunk(true, "Price")(mockStoreDispatch, mockGetState)
        })

        it("should call setFilterCookie", () => {
            expect(setFilterCookie).toHaveBeenCalledWith(
                "red",
                SearchApiRequestTypes.Keyword,
                "http://www.test.co.uk/testCategory",
                "http://www.test.co.uk",
                "Price",
                true,
                false,
            )
        })

        it("should call the store dispatch", () => {
            const data = {isViewMoreOpen: false, isOpen: true, name: "Price"}
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_FILTER_IS_OPEN,
                data,
            })
        })
    })
})

describe("Store: setViewMoreIsOpenThunk() ", () => {
    describe("When setting viewMore open", () => {
        beforeAll(() => {
            jest.clearAllMocks()
            mockTheGetStateFn({search: {filters: {Size: {name: "Size", isViewMoreOpen: false, isFilterOpen: false}}}})
            setViewMoreIsOpenThunk(true, "Size")(mockStoreDispatch, mockGetState)
        })

        it("should call the store dispatch", () => {
            const data = {isOpen: false, isViewMoreOpen: true, name: "Size"}
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_FILTER_IS_OPEN,
                data,
            })
        })

        it("should call setFilterCookie", () => {
            expect(setFilterCookie).toHaveBeenCalledWith(
                "red",
                SearchApiRequestTypes.Keyword,
                "http://www.test.co.uk/testCategory",
                "http://www.test.co.uk",
                "Size",
                false,
                true,
            )
        })
    })
})

describe("Given `mapToInitialPageRange`", () => {
    describe("When the value is greater than 1", () => {
        it("should return the correct page range", () => {
            expect(mapToInitialPageRange(2)).toEqual({startPage: 1, endPage: 2})
        })
    })

    describe("When the value is less than 2", () => {
        it("should return a page range for page 1", () => {
            expect(mapToInitialPageRange(1)).toEqual({startPage: 1, endPage: 1})
            expect(mapToInitialPageRange(0)).toEqual({startPage: 1, endPage: 1})
        })
    })
})

describe("Give a selectItems() selector", () => {
    it("should return the total pages", () => {
        expect(selectItems(mockState)).toBe(mockState.search.items)
    })
})

describe("Given `fixFacets`", () => {
    it("should flag the facets as fixed", () => {
        const state = reducer({...initialSearchState, shouldFacetsBeFixed: false}, fixFacets())
        expect(state).toEqual(expect.objectContaining({shouldFacetsBeFixed: true}))
    })
})

describe("Given `unfixFacets`", () => {
    it("should flag the facets as not fixed", () => {
        const state = reducer({...initialSearchState, shouldFacetsBeFixed: true}, unfixFacets())
        expect(state).toEqual(expect.objectContaining({shouldFacetsBeFixed: false}))
    })
})

describe("Given `selectShouldFacetsBeFixed`", () => {
    it("should return whether the facets should be fixed", () => {
        const state = {...initialState, search: {...initialState.search, shouldFacetsBeFixed: "foo"}} as any
        const result = selectShouldFacetsBeFixed(state)
        expect(result).toBe("foo")
    })
})

describe("Given a selectIsFetchingNextPage()", () => {
    it("should return fetching next page state", () => {
        const state = {...initialState, search: {...initialState.search, isFetchingNextPage: true}} as any
        expect(selectIsFetchingNextPage(state)).toBe(true)
    })
})
