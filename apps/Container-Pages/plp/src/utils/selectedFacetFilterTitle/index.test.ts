import {selectedFacetFilterTitle} from "."
import {SearchState} from "../../models/SearchState"
import {Filters} from "../../models/Filter"
import {FacetsState} from "../../models/FacetsState"

describe("Given a selectedFacetFilterTitle util", () => {
    it("should return the correct value depending on the selected filter facets", () => {
        const initialStateSearch: SearchState = {
            seoFilters: "",
            singleOptionFacetList: ["personalised", "feat", "sizetype", "deliverby"],
            totalResults: 0,
            filters: new Filters(),
            filtersSort: [],
            facets: new FacetsState(),
            items: [],
            sorting: {
                selected: "",
                options: [],
            },
            startPage: 1,
            endPage: 1,
            isFetchingNextPage: false,
            isFetchingPreviousPage: false,
            isFetchingPageItems: false,
            debounceTime: 700,
            shouldFacetsBeFixed: false,
            autoCorrectQuery: null,
            title: "",
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
            itemsPerRow: {
                default: {
                    xs: 0,
                    sm: 0,
                    md: 0,
                    lg: 0,
                    xl: 0,
                },
                inPageFiltersEnabled: {
                    xs: 0,
                    sm: 0,
                    md: 0,
                    lg: 0,
                    xl: 0,
                },
            },
            initialItemsPerPage: 0,
            fetchTriggerOffset: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
                xl: 0,
            },
            fetchTriggerOffsetRows: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
                xl: 0,
            },
            subsequentPagesNonLazyloadRows: {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 0,
                xl: 0,
            },
            relaxedQuery: "",
            currentBreakpoint: "lg",
            includedComponents: [],
            searchCategory: {id: "", name: ""},
            searchBannerHtml: null,
            bloomreachCookiesInitialVal: {
                brUid2: "",
                brMtSearch: "",
            },
        }
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
        const resultOfUtil = selectedFacetFilterTitle({...initialStateSearch, ...variation})
        expect(resultOfUtil).toBe("Brand: test1, test2 | Category: test3")
    })
})
