import {
    Horizontal,
    SearchApiRequestTypes,
    BASELINECSS_CUSTOM,
    BASELINECSS_MATERIALUI,
    JSS_SERVERSIDE,
    ViewLinkOptions,
    FILTER_SETTINGS_COOKIE,
    SEARCH_CATEGORY_SEGMENT,
    FILTERS_SHOW_VIEW_ALL_COUNT,
    FILTERS_SHOW_VIEW_MORE_COUNT,
    FILTER_GRID_SCROLL_HEIGHT,
    FILTER_GRID_TOP_SPACER_HEIGHT,
    STICKY_HEADER_SCROLL_TRIGGER,
    TOKEN_CANCELLATION_FLAG,
    TERRITORY_GB,
    REGION_UK,
    REGION_INTERNATIONAL,
    REALM_HEADER,
    TIME_MACHINE_DATE_HEADER,
    SEARCH_BANNER_HEADER,
    SEARCH_BANNER_HEADER_DEFAULT,
    LOCAL_STORAGE_ACTIVE_DEPT_NAME,
    GTM_SEARCH_RESULTS,
    DEFAULT_FILTER_SPINNER_TIMEOUT,
    BRAND,
    GENDER,
    ESISeparator,
    FOOTER_ID,
    FACETS_CONTAINER_OFFSET,
    SEARCH_BANNER_INCLUDE_COMPONENTS,
    SEO_METADATA_INCLUDE_COMPONENTS,
    CACHE_HEADERS_CACHE_CONTROL,
    CACHE_HEADERS_EDGE_CACHE_TAG,
    CACHE_HEADERS_LAST_MODIFIED,
    SEARCH_BANNER_CACHE_TAG,
    BR_UID_2,
    BR_MT_SEARCH,
    BR_UID_DEFAULT_VALUE,
    ITEM_NUMBER_REGEX,
    GTM_PRODUCT_IMPRESSIONS_EVENT,
    SWIPER_ITEMS_PER_PAGE,
    BRAND_0_9,
    CATEGORY_FILTERS_REGEX,
    SEARCH_CACHE_TAG,
    featAvailable,
    featBackInStock,
    featDeliverBy
} from "./constants"

describe("Given Constants", () => {
    describe("Should match expected", () => {
        it("should match expected Horizontal", () => {
            expect(Horizontal).toMatchSnapshot()
        })
        it("should match the expected search request types", () => {
            expect(SearchApiRequestTypes).toMatchSnapshot()
        })
        it("should match BASELINECSS_CUSTOM", () => {
            expect(BASELINECSS_CUSTOM).toMatchSnapshot()
        })
        it("should match BASELINECSS_MATERIALUI", () => {
            expect(BASELINECSS_MATERIALUI).toMatchSnapshot()
        })
        it("should match JSS_SERVERSIDE", () => {
            expect(JSS_SERVERSIDE).toMatchSnapshot()
        })
        it("should match ViewLinkOptions", () => {
            expect(ViewLinkOptions).toMatchSnapshot()
        })
        it("should match FILTER_SETTINGS_COOKIE", () => {
            expect(FILTER_SETTINGS_COOKIE).toMatchSnapshot()
        })
        it("should match SEARCH_CATEGORY_SEGMENT", () => {
            expect(SEARCH_CATEGORY_SEGMENT).toMatchSnapshot()
        })
        it("should match FILTERS_SHOW_VIEW_ALL_COUNT", () => {
            expect(FILTERS_SHOW_VIEW_ALL_COUNT).toMatchSnapshot()
        })
        it("should match FILTERS_SHOW_VIEW_MORE_COUNT", () => {
            expect(FILTERS_SHOW_VIEW_MORE_COUNT).toMatchSnapshot()
        })
        it("should match FILTER_GRID_SCROLL_HEIGHT", () => {
            expect(FILTER_GRID_SCROLL_HEIGHT).toMatchSnapshot()
        })
        it("should match FILTER_GRID_TOP_SPACER_HEIGHT", () => {
            expect(FILTER_GRID_TOP_SPACER_HEIGHT).toMatchSnapshot()
        })
        it("should match STICKY_HEADER_SCROLL_TRIGGER", () => {
            expect(STICKY_HEADER_SCROLL_TRIGGER).toMatchSnapshot()
        })
        it("should match REALM_HEADER", () => {
            expect(REALM_HEADER).toMatchSnapshot()
        })
        it("should match TOKEN_CANCELLATION_FLAG", () => {
            expect(TOKEN_CANCELLATION_FLAG).toMatchSnapshot()
        })
        it("should match TERRITORY_GB", () => {
            expect(TERRITORY_GB).toMatchSnapshot()
        })
        it("should match REGION_UK", () => {
            expect(REGION_UK).toMatchSnapshot()
        })
        it("should match REGION_INTERNATIONAL", () => {
            expect(REGION_INTERNATIONAL).toMatchSnapshot()
        })

        it("should match TIME_MACHINE_DATE_HEADER", () => {
            expect(TIME_MACHINE_DATE_HEADER).toMatchSnapshot()
        })

        it("should match SEARCH_BANNER_HEADER", () => {
            expect(SEARCH_BANNER_HEADER).toMatchSnapshot()
        })

        it("should match SEARCH_BANNER_HEADER_DEFAULT", () => {
            expect(SEARCH_BANNER_HEADER_DEFAULT).toMatchSnapshot()
        })

        it("should match LOCAL_STORAGE_ACTIVE_DEPT_NAME", () => {
            expect(LOCAL_STORAGE_ACTIVE_DEPT_NAME).toMatchSnapshot()
        })

        it("should match GTM_SEARCH_RESULTS", () => {
            expect(GTM_SEARCH_RESULTS).toMatchSnapshot()
        })

        it("should match DEFAULT_FILTER_SPINNER_TIMEOUT", () => {
            expect(DEFAULT_FILTER_SPINNER_TIMEOUT).toMatchSnapshot()
        })

        it("should match BRAND", () => {
            expect(BRAND).toMatchSnapshot()
        })

        it("should match GENDER", () => {
            expect(GENDER).toMatchSnapshot()
        })

        it("should match ESISeparator", () => {
            expect(ESISeparator).toMatchSnapshot()
        })

        it("should match FOOTER_ID", () => {
            expect(FOOTER_ID).toMatchSnapshot()
        })

        it("should match FACETS_CONTAINER_OFFSET", () => {
            expect(FACETS_CONTAINER_OFFSET).toMatchSnapshot()
        })

        it("should match SEARCH_BANNER_INCLUDE_COMPONENTS", () => {
            expect(SEARCH_BANNER_INCLUDE_COMPONENTS).toMatchSnapshot()
        })

        it("should match SEO_METADATA_INCLUDE_COMPONENTS", () => {
            expect(SEO_METADATA_INCLUDE_COMPONENTS).toMatchSnapshot()
        })

        it("should match CACHE_HEADERS_CACHE_CONTROL", () => {
            expect(CACHE_HEADERS_CACHE_CONTROL).toMatchSnapshot()
        })

        it("should match CACHE_HEADERS_EDGE_CACHE_TAG", () => {
            expect(CACHE_HEADERS_EDGE_CACHE_TAG).toMatchSnapshot()
        })

        it("should match CACHE_HEADERS_LAST_MODIFIED", () => {
            expect(CACHE_HEADERS_LAST_MODIFIED).toMatchSnapshot()
        })

        it("should match SEARCH_BANNER_CACHE_TAG", () => {
            expect(SEARCH_BANNER_CACHE_TAG).toMatchSnapshot()
        })

        it("should match BR_UID_2", () => {
            expect(BR_UID_2).toMatchSnapshot()
        })
        it("should match BR_MT_SEARCH", () => {
            expect(BR_MT_SEARCH).toMatchSnapshot()
        })
        it("should match BR_UID_DEFAULT_VALUE", () => {
            expect(BR_UID_DEFAULT_VALUE).toMatchSnapshot()
        })
        it("should match ITEM_NUMBER_REGEX", () => {
            expect(ITEM_NUMBER_REGEX).toMatchSnapshot()
        })

        it("should match GTM_PRODUCT_IMPRESSIONS_EVENT", () => {
            expect(GTM_PRODUCT_IMPRESSIONS_EVENT).toMatchSnapshot()
        })
        it("should match SWIPER_ITEMS_PER_PAGE", () => {
            expect(SWIPER_ITEMS_PER_PAGE).toMatchSnapshot()
        })

        it("should match BRAND_0_9", () => {
            expect(BRAND_0_9).toMatchSnapshot()
        })
        it("should match CATEGORY_FILTERS_REGEX", () => {
            expect(CATEGORY_FILTERS_REGEX).toMatchSnapshot()
        })
        it("should match SEARCH_CACHE_TAG", () => {
            expect(SEARCH_CACHE_TAG).toMatchSnapshot()
        })
        it("should match featAvailable", () => {
            expect(featAvailable).toMatchSnapshot()
        })
        it("should match featBackInStock", () => {
            expect(featBackInStock).toMatchSnapshot()
        })
        it("should match featDeliverBy", () => {
            expect(featDeliverBy).toMatchSnapshot()
        })
    })
})
