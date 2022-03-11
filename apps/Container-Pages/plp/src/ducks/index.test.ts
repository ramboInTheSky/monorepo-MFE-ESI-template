import {rootReducer, makeStore} from "."
import {mockState, mockText as text} from "../../__mocks__/mockStore"

const SET_REQUEST = "SET_REQUEST"

jest.mock("./request", () =>
    jest.fn(() => ({
        headers: {"x-monorepo-territory": "gb", "x-monorepo-language": "en"},
        category: null,
        gender: null,
        url: "/",
        siteUrl: "",
        page: 6,
        searchTerm: null,
        territoryName: "",
        type: "Category",
        useDevEsi: false,
        viewportSize: "desktop",
        bloomreachPersonalizationEnabled: false,
    })),
)
jest.mock("./text-alignment", () => () => "ltr")
jest.mock("./search", () => () => ({
    totalResults: 1234,
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
        brand: {
            name: "Brand",
            facets: [
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
            ],
            displayName: "Test 1",
            type: "filter",
            isFilterOpen: true,
            isViewMoreOpen: true,
        },
        Price: {
            currencyCode: "GBP",
            displayName: "",
            isFilterOpen: false,
            max: 100,
            min: 0,
            name: "Test2 with options",
            selectedMax: 70,
            selectedMin: 30,
            type: "price",
        },
    },
    filtersSort: ["Test1", "Test2"],
    facets: {
        opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
        opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
        opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
    },
    items: [
        {itemNumber: "111111", newIn: true},
        {itemNumber: "222222", newIn: true},
    ],
    sorting: {
        selected: "score",
        options: [
            {
                name: "Most Relevant",
                value: "score",
            },
            {
                name: "Most Popular",
                value: "newpop",
            },
            {
                name: "Alphabetical",
                value: "alpha",
            },
            {
                name: "Price: Low - High",
                value: "pricelow",
            },
            {
                name: "Price: High - Low",
                value: "pricehi",
            },
        ],
    },
    startPage: 1,
    endPage: 1,
    isFetchingNextPage: false,
    isFetchingPreviousPage: false,
    isFetchingPageItems: false,
    debounceTime: 300,
    shouldFacetsBeFixed: false,
    autoCorrectQuery: null,
    title: "",
    initialItemsPerPage: 8,
    fetchTriggerOffset: {
        xs: 4,
        sm: 4,
        md: 6,
        lg: 6,
        xl: 8,
    },
    fetchTriggerOffsetRows: {
        lg: 2,
        md: 2,
        sm: 2,
        xl: 2,
        xs: 2,
    },
    itemsPerRow: {
        default: {
            lg: 6,
            md: 6,
            sm: 4,
            xl: 8,
            xs: 4,
        },
        inPageFiltersEnabled: {
            lg: 6,
            md: 6,
            sm: 4,
            xl: 8,
            xs: 4,
        },
    },
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
    subsequentPagesNonLazyloadRows: {
        lg: 2,
        md: 2,
        sm: 2,
        xl: 2,
        xs: 2,
    },
    relaxedQuery: "",
    includedComponents: [],
    searchCategory: {id: "", name: ""},
    searchBannerHtml: null,
    seoFilters: "",
    singleOptionFacetList: ["personalised", "feat", "sizetype", "deliverby"],
    bloomreachCookiesInitialVal: {
        brUid2: "",
        brMtSearch: "",
    },
}))

jest.mock("./viewAllModal", () => () => ({
    displayName: "",
    isOpen: false,
    name: "",
    activeCharacter: "All",
    facets: {
        opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
        opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
        opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
    },
    hideSearchFilterModalElements: {
        letterNav: false,
        searchBox: false,
    },
}))

jest.mock("../config/env", () => ({
    DEVELOPMENT: "true",
}))

const expectedInitialState = mockState

describe("combined reducers", () => {
    it("generates the correct state", () => {
        const result = rootReducer(
            {
                request: mockState.request,
                textAlignment: mockState.textAlignment,
                search: mockState.search,
                viewAllModal: mockState.viewAllModal,
                seoFilters: mockState.seoFilters,
                features: {
                    enablePageInFilters: false,
                    enableSearchBanners: false,
                    enableTooltips: false,
                },
                categoryQuickLinks: mockState.categoryQuickLinks,
                tabbedFilters: mockState.tabbedFilters,
                text,
            },
            {
                type: SET_REQUEST,
                request: mockState.request,
            },
        )
        expect(result).toEqual(expectedInitialState)
    })

    describe("Store => makeStore ", () => {
        it("Generates the store correctly with no errors", () => {
            const store = makeStore(expectedInitialState)
            const initialState = store.getState()
            expect(initialState).toEqual(expectedInitialState)
        })
    })
})
