export const BASELINECSS_MATERIALUI = "materialui"
export const BASELINECSS_CUSTOM = "custom"
export const JSS_SERVERSIDE = "plp-jss-server-side-"

export enum Horizontal {
    ltr = "left",
    rtl = "right",
}

export type FilterType = "filter" | "price" | "feat"

export const FILTER_SETTINGS_COOKIE = "filterSettings"

export enum SearchApiRequestTypes {
    Category = "Category",
    Keyword = "Keyword",
}

export const SEARCH_CATEGORY_SEGMENT = "shop"

export enum ViewLinkOptions {
    none,
    viewMore,
    viewAll,
}

export const FILTERS_SHOW_VIEW_ALL_COUNT = 20
export const FILTERS_SHOW_VIEW_MORE_COUNT = 8
export const FILTERS_SHOW_VIEW_MORE_COUNT_EXTENDED = 30

export const REALM_HEADER = "x-monorepo-realm"
export const TERRITORY_HEADER = "x-monorepo-territory"
export const LANGUAGE_HEADER = "x-monorepo-language"
export const DEV_ESI_HEADER = "test-with-local-esi"
export const VIEWPORT_SIZE_HEADER = "x-monorepo-viewport-size"
export const TIME_MACHINE_DATE_HEADER = "x-monorepo-time-machine-date"
export const SEARCH_BANNER_HEADER = "x-monorepo-banner-format"
export const SEARCH_BANNER_HEADER_DEFAULT = "html"
export const LOCAL_STORAGE_ACTIVE_DEPT_NAME = "PrimaryNavDeptSelector"
export const GTM_SEARCH_RESULTS = "searchResults"

export const FILTER_GRID_SCROLL_HEIGHT = 690
export const FILTER_GRID_TOP_SPACER_HEIGHT = 25

export const DIGIT_REGEX = RegExp(/^\d/)

export const HISTORY_EVENT = "PLP-FILTER-EVENT"

export const STICKY_HEADER_SCROLL_TRIGGER = 44

export const TOKEN_CANCELLATION_FLAG = "TOKEN_CANCELLATION"

export const TERRITORY_GB = "gb"

export const REGION_UK = "uk"

export const REGION_INTERNATIONAL = "international"

export const LANGUAGE_ENGLISH = "en"

export const DEFAULT_FILTER_SPINNER_TIMEOUT = 5000

export const BRAND = "brand"
export const BRAND_0_9 = "0-9"

export const GENDER = "gender"

export const CLEARANCE = "Clearance"

export enum ESISeparator {
    ProductFragment = "<=ProductFragment=>",
    SearchBanner = "<=SearchBanner=>",
}
export const FOOTER_ID = "footer-entrypoint"
export const PLP_ID = "plp-entrypoint"

export const FACETS_CONTAINER_OFFSET = 25

export const SEARCH_BANNER_INCLUDE_COMPONENTS = "search-banner"
export const SEO_METADATA_INCLUDE_COMPONENTS = "seo-metadata"

export const CACHE_HEADERS_CACHE_CONTROL = "cache-control"
export const CACHE_HEADERS_EDGE_CACHE_TAG = "edge-cache-tag"
export const CACHE_HEADERS_LAST_MODIFIED = "last-modified"
export const SEARCH_BANNER_CACHE_TAG = "searchbannerui"
export const SEARCH_CACHE_TAG = "plpui"

export const ITEM_NUMBER_REGEX = RegExp("^\\s?\\w\\d{2}-?\\d{3}\\s?$")
export const BR_UID_2 = "_br_uid_2"
export const BR_MT_SEARCH = "_br_mt_search"
export const BR_UID_DEFAULT_VALUE = "uid%3D9624001141133%3Av%3D13.0%3Ats%3D1578565383488%3Ahc%3D138"
export const CATEGORY_FILTERS_REGEX = /(([a-z, 0-9]*).-[a-z, 0-9,%]*)+/g

export const GTM_PRODUCT_IMPRESSIONS_EVENT = "ee-productImpression"
export const SWIPER_ITEMS_PER_PAGE = 4

export const featAvailable = "feat:available"
export const featDeliverBy = "feat:deliveryby"
export const featBackInStock = "feat:backinstock"
