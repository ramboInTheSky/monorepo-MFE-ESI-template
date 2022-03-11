import thunk from "redux-thunk"
import configureMockStore from "redux-mock-store"
import {ThemeColor, mockColors} from "../../../../libs/framework/themes/src"
import State from "../src/models/State"
import themeDimensions from "./themeDimensions.json"
import TextAlignment from "../src/models/textAlignment"
import {Dimensions} from "../src/models/Dimensions"
import {TextModel} from "../src/models/Text"
import {Theme} from "../src/models/theme"
import {SearchApiRequestTypes} from "../src/config/constants"
import {RequestDuckState} from "../src/ducks/request/types"
import text from "./default-text.json"

export const mockColours: ThemeColor = mockColors
export const mockDimensions: Dimensions = themeDimensions
export const mockText: TextModel = text

export const mockState: State = {
    text,
    textAlignment: TextAlignment.Ltr,
    request: {
        headers: {"x-monorepo-territory": "gb", "x-monorepo-language": "en"},
        url: "/",
        siteUrl: "",
        searchTerm: null,
        category: null,
        gender: null,
        territoryName: "",
        page: 6,
        type: SearchApiRequestTypes.Category,
        useDevEsi: false,
        viewportSize: "desktop",
        bloomreachPersonalizationEnabled: false,
    },
    search: {
        seoFilters: "",
        singleOptionFacetList: ["personalised", "feat", "sizetype", "deliverby"],
        searchBannerHtml: null,
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
        itemsPerRow: {
            inPageFiltersEnabled: {
                xs: 4,
                sm: 4,
                md: 6,
                lg: 6,
                xl: 8,
            },
            default: {
                xs: 4,
                sm: 4,
                md: 6,
                lg: 6,
                xl: 8,
            },
        },
        currentBreakpoint: "md",
        fetchTriggerOffsetRows: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
        },
        subsequentPagesNonLazyloadRows: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
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
        relaxedQuery: "",
        includedComponents: [],
        searchCategory: {
            id: "",
            name: "",
        },
        bloomreachCookiesInitialVal: {
            brUid2: "",
            brMtSearch: "",
        },
    },
    viewAllModal: {
        displayName: "",
        name: "",
        isOpen: false,
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
    },
    seoFilters: {
        filterDepthCount: 6,
    },
    features: {
        enablePageInFilters: false,
        enableSearchBanners: false,
        enableTooltips: false,
    },
    categoryQuickLinks: {
        items: [
            {
                href: "/women",
                title: "Women",
                description: "Womens description...",
                imageSrc: "/some/image/src.jpg",
                imageAlt: "women",
            },
            {
                href: "/men",
                title: "Men",
                description: "Mens description...",
                imageSrc: "/some/image/src.jpg",
                imageAlt: "men",
            },
        ],
    },
    tabbedFilters: {
        isOpen: false,
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
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", incompatibleWith: ["opt3"], d: false},
            opt3: {n: "opt3", c: 1, v: "opt3", incompatibleWith: ["opt2"], d: false},
        },
        items: [
            {itemNumber: "111111", newIn: true},
            {itemNumber: "222222", newIn: true},
        ],
        selectedFilter: null,
        brandSearch: "",
        historicFacetFilter: {},
        isPerformingKeyFilterSearch: false,
        canSync: true,
        isPriceFacetChanged: false,
    },
}

export const mockTextAlignment = {Value: "ltr"}

export const mockTheme: Theme = {colours: mockColours, dimensions: mockDimensions, direction: "ltr"}
export const mockConfigureStore = configureMockStore([thunk])
export const createMockStoreForRequest = (request: Partial<RequestDuckState>) => {
    return mockConfigureStore({...mockState, request: {...mockState.request, ...request}})
}
const mockStore = mockConfigureStore(mockState)

export default mockStore
