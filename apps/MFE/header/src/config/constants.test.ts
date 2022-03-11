import {
    MODAL_TIMEOUT,
    DEBOUNCE_TIME,
    STICKY_HEADER_SCROLL_TRIGGER,
    LIMIT_AUTO_COMPLETE_SUGGESTIONS,
    BASELINECSS_MATERIALUI,
    BASELINECSS_CUSTOM,
    JSS_SERVERSIDE,
    SUPPORTED_QUICKLINK_TYPES,
    SUPPORTED_MY_ACCOUNT_TYPES,
    TYPING_STATE,
    SITE_URL_HEADER,
    REALM_HEADER,
    TERRITORY_HEADER,
    LANGUAGE_HEADER,
    SITE_LAYOUT_HEADER,
    DEV_ESI_HEADER,
    LOCALHOST,
    AMIDO_REALM,
    MIN_NUMBER_CHAR_TO_SHOW_AUTOCOMPLETE,
    COUNTRY_GB,
    REGION_UK,
    REGION_INTERNATIONAL,
    RPID_COOKIE,
    COUNTRY_SELECTOR_DRAWER_BREAKPOINT,
    SOLD_OUT,
    IN_STOCK,
    CHEVRON_ICON_URL,
    CLOSE_ICON_URL,
    SOFA_CATEGORY,
    IMAGE,
    UNDERSCORE,
    SOFA_CONTENT,
    COMMON_ITEM_IMAGE_URL,
    ITEM_ADD_TO_BAG_URL,
    JPG,
    DEFAULT_HEADER_FILE_NAME,
    BFPO,
    ENGLISH_LANGUAGE_CODE,
    GTM_BLOOMREACH_INFO,
    GTM_MONETATE_INFO,
    GTM_UCM_INFO,
    SEARCH_DATA_GA,
    SEARCH_DATA_GA_RECENT_SEARCH,
    SEARCH_ICON_DATA_GA,
    OPEN_SEARCH_DATA_GA,
    CLOSE_SEARCH_DATA_GA,
    SEARCH_DELETE_CURRENT_SEARCH_DATA_GA,
    SEARCH_PREVIOUS_SEARCH_DATA_GA,
    SEARCH_CLEAR_PREVIOUS_SEARCH_DATA_GA,
    SEARCH_KEY_PRESS_ENTER_DATA_GA,
    HEADER_AUTOCOMPLETE_SEE_ALL_RESULTS_DATA_GA,
    HEADER_AUTOCOMPLETE_LIST_ITEM_DATA_GA,
    HEADER_AUTOCOMPLETE_IMAGE_DATA_GA,
    COUNTRY_LANG_SELECTOR_DATA_GA,
    COUNTRY_SELECT_DROPDOWN_DATA_GA,
    SEARCH_BLUR_BREAKPOINT,
    HEADER_NAV_BAR_QUICK_LINKS,
    HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG,
    HEADER_NAV_BAR_QUICK_LINKS_FAVOURITES,
    HEADER_NAV_BAR_QUICK_LINKS_MY_ACCOUNT,
    HEADER_NAV_BAR_SHOPPING_BAG_VIEW_BAG,
    HEADER_NAV_BAR_SHOPPING_BAG_CHECKOUT,
    HEADER_NAV_BAR_HELP,
    HEADER_NAV_BAR_STORE_LOCATOR,
    MY_ACCOUNT_URL,
    NO_FOLLOW,
    AMIDO_COOKIE,
    AMIDO_DIRECT_COOKIE,
    COOKIE_VALUE,
    LOCAL_STORAGE_ACTIVE_DEPT_NAME,
    VISITED_PAGES,
    BR_COOKIE_COOKIE_PARTS_LENGTH,
    BR_COOKIE_COOKIE_UID_PARTS,
    BR_COOKIE_COOKIE_UID_LENGTH,
    BR_COOKIE_COOKIE_FULL_RANGE,
    BR_COOKIE_COOKIE_NAME,
    BR_COOKIE_COOKIE_NUMBER_OF_DAYS,
    BR_COOKIE_COOKIE_CACHING_ID,
    TIME_MACHINE_DATE_COOKIE,
    COUNTRY_SELECTOR_TYPING_DELAY_TIME,
    RPID,
    ACCOUNT_TYPE,
    UNLIMITED_CUSTOMER,
    BURGER_MENU_TEMPLATE,
    DEFAULT_TEMPLATE,
    PLP_ENTRYPOINT_ID,
} from "./constants"

describe("Constants", () => {
    it("should match DEBOUNCE_TIME", () => {
        expect(DEBOUNCE_TIME).toMatchSnapshot()
    })
    it("should match LIMIT_AUTO_COMPLETE_SUGGESTIONS", () => {
        expect(LIMIT_AUTO_COMPLETE_SUGGESTIONS).toMatchSnapshot()
    })
    it("should match MODAL_TIMEOUT", () => {
        expect(MODAL_TIMEOUT).toMatchSnapshot()
    })
    it("should match BASELINECSS_MATERIALUI", () => {
        expect(BASELINECSS_MATERIALUI).toMatchSnapshot()
    })
    it("should match BASELINECSS_CUSTOM", () => {
        expect(BASELINECSS_CUSTOM).toMatchSnapshot()
    })
    it("should match JSS_SERVERSIDE", () => {
        expect(JSS_SERVERSIDE).toMatchSnapshot()
    })
    it("should match SUPPORTED_QUICKLINK_TYPES", () => {
        expect(SUPPORTED_QUICKLINK_TYPES).toMatchSnapshot()
    })
    it("should match SUPPORTED_MY_ACCOUNT_TYPES", () => {
        expect(SUPPORTED_MY_ACCOUNT_TYPES).toMatchSnapshot()
    })
    it("should match TYPING_STATE", () => {
        expect(TYPING_STATE).toMatchSnapshot()
    })
    it("should match STICKY_HEADER_SCROLL_TRIGGER", () => {
        expect(STICKY_HEADER_SCROLL_TRIGGER).toMatchSnapshot()
    })
    it("should match SITE_URL_HEADER", () => {
        expect(SITE_URL_HEADER).toMatchSnapshot()
    })
    it("should match REALM_HEADER", () => {
        expect(REALM_HEADER).toMatchSnapshot()
    })
    it("should match TERRITORY_HEADER", () => {
        expect(TERRITORY_HEADER).toMatchSnapshot()
    })
    it("should match SITE_LAYOUT_HEADER", () => {
        expect(SITE_LAYOUT_HEADER).toMatchSnapshot()
    })
    it("should match AMIDO_REALM", () => {
        expect(AMIDO_REALM).toMatchSnapshot()
    })
    it("should match MIN_NUMBER_CHAR_TO_SHOW_AUTOCOMPLETE", () => {
        expect(MIN_NUMBER_CHAR_TO_SHOW_AUTOCOMPLETE).toMatchSnapshot()
    })
    it("should match COUNTRY_GB", () => {
        expect(COUNTRY_GB).toMatchSnapshot()
    })
    it("should match REGION_UK", () => {
        expect(REGION_UK).toMatchSnapshot()
    })
    it("should match REGION_INTERNATIONAL", () => {
        expect(REGION_INTERNATIONAL).toMatchSnapshot()
    })
    it("should match RPID_COOKIE", () => {
        expect(RPID_COOKIE).toMatchSnapshot()
    })
    it("should match COUNTRY_SELECTOR_DRAWER_BREAKPOINT", () => {
        expect(COUNTRY_SELECTOR_DRAWER_BREAKPOINT).toMatchSnapshot()
    })
    it("should match LANGUAGE_HEADER", () => {
        expect(LANGUAGE_HEADER).toMatchSnapshot()
    })
    it("should match DEV_ESI_HEADER", () => {
        expect(DEV_ESI_HEADER).toMatchSnapshot()
    })
    it("should match LOCALHOST", () => {
        expect(LOCALHOST).toMatchSnapshot()
    })
    it("should match CHEVRON_ICON_URL", () => {
        expect(CHEVRON_ICON_URL).toMatchSnapshot()
    })
    it("should match CLOSE_ICON_URL", () => {
        expect(CLOSE_ICON_URL).toMatchSnapshot()
    })
    it("should match SOFA_CATEGORY", () => {
        expect(SOFA_CATEGORY).toMatchSnapshot()
    })
    it("should match SOFA_CONTENT", () => {
        expect(SOFA_CONTENT).toMatchSnapshot()
    })
    it("should match COMMON_ITEM_IMAGE_URL", () => {
        expect(COMMON_ITEM_IMAGE_URL).toMatchSnapshot()
    })
    it("should match ITEM_ADD_TO_BAG_URL", () => {
        expect(ITEM_ADD_TO_BAG_URL).toMatchSnapshot()
    })
    it("should match JPG", () => {
        expect(JPG).toMatchSnapshot()
    })
    it("should match IMAGE", () => {
        expect(IMAGE).toMatchSnapshot()
    })
    it("should match SOLD_OUT", () => {
        expect(SOLD_OUT).toMatchSnapshot()
    })
    it("should match IN_STOCK", () => {
        expect(IN_STOCK).toMatchSnapshot()
    })
    it("should match UNDERSCORE", () => {
        expect(UNDERSCORE).toMatchSnapshot()
    })
    it("should match BFPO", () => {
        expect(BFPO).toMatchSnapshot()
    })
    it("should match ENGLISH_LANGUAGE_CODE", () => {
        expect(ENGLISH_LANGUAGE_CODE).toMatchSnapshot()
    })
    it("should match GTM_BLOOMREACH_INFO", () => {
        expect(GTM_BLOOMREACH_INFO).toMatchSnapshot()
    })
    it("should match GTM_MONETATE_INFO", () => {
        expect(GTM_MONETATE_INFO).toMatchSnapshot()
    })
    it("should match GTM_UCM_INFO", () => {
        expect(GTM_UCM_INFO).toMatchSnapshot()
    })
    it("should match SEARCH_DATA_GA", () => {
        expect(SEARCH_DATA_GA).toMatchSnapshot()
    })
    it("should match SEARCH_DATA_GA_RECENT_SEARCH", () => {
        expect(SEARCH_DATA_GA_RECENT_SEARCH).toMatchSnapshot()
    })
    it("should match SEARCH_ICON_DATA_GA", () => {
        expect(SEARCH_ICON_DATA_GA).toMatchSnapshot()
    })
    it("should match OPEN_SEARCH_DATA_GA", () => {
        expect(OPEN_SEARCH_DATA_GA).toMatchSnapshot()
    })
    it("should match CLOSE_SEARCH_DATA_GA", () => {
        expect(CLOSE_SEARCH_DATA_GA).toMatchSnapshot()
    })
    it("should match SEARCH_DELETE_CURRENT_SEARCH_DATA_GA", () => {
        expect(SEARCH_DELETE_CURRENT_SEARCH_DATA_GA).toMatchSnapshot()
    })
    it("should match SEARCH_PREVIOUS_SEARCH_DATA_GA", () => {
        expect(SEARCH_PREVIOUS_SEARCH_DATA_GA).toMatchSnapshot()
    })
    it("should match SEARCH_CLEAR_PREVIOUS_SEARCH_DATA_GA", () => {
        expect(SEARCH_CLEAR_PREVIOUS_SEARCH_DATA_GA).toMatchSnapshot()
    })
    it("should match SEARCH_KEY_PRESS_ENTER_DATA_GA", () => {
        expect(SEARCH_KEY_PRESS_ENTER_DATA_GA).toMatchSnapshot()
    })
    it("should match HEADER_AUTOCOMPLETE_SEE_ALL_RESULTS_DATA_GA", () => {
        expect(HEADER_AUTOCOMPLETE_SEE_ALL_RESULTS_DATA_GA).toMatchSnapshot()
    })
    it("should match HEADER_AUTOCOMPLETE_LIST_ITEM_DATA_GA", () => {
        expect(HEADER_AUTOCOMPLETE_LIST_ITEM_DATA_GA).toMatchSnapshot()
    })
    it("should match HEADER_AUTOCOMPLETE_IMAGE_DATA_GA", () => {
        expect(HEADER_AUTOCOMPLETE_IMAGE_DATA_GA).toMatchSnapshot()
    })
    it("should match COUNTRY_LANG_SELECTOR_DATA_GA", () => {
        expect(COUNTRY_LANG_SELECTOR_DATA_GA).toMatchSnapshot()
    })
    it("should match COUNTRY_SELECT_DROPDOWN_DATA_GA", () => {
        expect(COUNTRY_SELECT_DROPDOWN_DATA_GA).toMatchSnapshot()
    })
    it("should match DEFAULT_HEADER_FILE_NAME", () => {
        expect(DEFAULT_HEADER_FILE_NAME).toMatchSnapshot()
    })
    it("should match HEADER_NAV_BAR_QUICK_LINKS", () => {
        expect(HEADER_NAV_BAR_QUICK_LINKS).toMatchSnapshot()
    })
    it("should match HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG", () => {
        expect(HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG).toMatchSnapshot()
    })
    it("should match HEADER_NAV_BAR_QUICK_LINKS_FAVOURITES", () => {
        expect(HEADER_NAV_BAR_QUICK_LINKS_FAVOURITES).toMatchSnapshot()
    })
    it("should match HEADER_NAV_BAR_QUICK_LINKS_MY_ACCOUNT", () => {
        expect(HEADER_NAV_BAR_QUICK_LINKS_MY_ACCOUNT).toMatchSnapshot()
    })
    it("should match HEADER_NAV_BAR_SHOPPING_BAG_VIEW_BAG", () => {
        expect(HEADER_NAV_BAR_SHOPPING_BAG_VIEW_BAG).toMatchSnapshot()
    })
    it("should match HEADER_NAV_BAR_SHOPPING_BAG_CHECKOUT", () => {
        expect(HEADER_NAV_BAR_SHOPPING_BAG_CHECKOUT).toMatchSnapshot()
    })
    it("should match SEARCH_BLUR_BREAKPOINT", () => {
        expect(SEARCH_BLUR_BREAKPOINT).toMatchSnapshot()
    })
    it("should match HEADER_NAV_BAR_HELP", () => {
        expect(HEADER_NAV_BAR_HELP).toMatchSnapshot()
    })
    it("should match HEADER_NAV_BAR_STORE_LOCATOR", () => {
        expect(HEADER_NAV_BAR_STORE_LOCATOR).toMatchSnapshot()
    })
    it("should match MY_ACCOUNT_URL", () => {
        expect(MY_ACCOUNT_URL).toMatchSnapshot()
    })
    it("should match NO_FOLLOW", () => {
        expect(NO_FOLLOW).toMatchSnapshot()
    })
    it("should match AMIDO_COOKIE", () => {
        expect(AMIDO_COOKIE).toMatchSnapshot()
    })
    it("should match AMIDO_DIRECT_COOKIE", () => {
        expect(AMIDO_DIRECT_COOKIE).toMatchSnapshot()
    })
    it("should match COOKIE_VALUE", () => {
        expect(COOKIE_VALUE).toMatchSnapshot()
    })
    it("should match LOCAL_STORAGE_ACTIVE_DEPT_NAME", () => {
        expect(LOCAL_STORAGE_ACTIVE_DEPT_NAME).toMatchSnapshot()
    })

    it("should match VISITED_PAGES", () => {
        expect(VISITED_PAGES).toMatchSnapshot()
    })
    it("should match BR_COOKIE_COOKIE_PARTS_LENGTH", () => {
        expect(BR_COOKIE_COOKIE_PARTS_LENGTH).toMatchSnapshot()
    })
    it("should match BR_COOKIE_COOKIE_UID_PARTS", () => {
        expect(BR_COOKIE_COOKIE_UID_PARTS).toMatchSnapshot()
    })
    it("should match BR_COOKIE_COOKIE_UID_LENGTH", () => {
        expect(BR_COOKIE_COOKIE_UID_LENGTH).toMatchSnapshot()
    })
    it("should match BR_COOKIE_COOKIE_FULL_RANGE", () => {
        expect(BR_COOKIE_COOKIE_FULL_RANGE).toMatchSnapshot()
    })
    it("should match BR_COOKIE_COOKIE_NAME", () => {
        expect(BR_COOKIE_COOKIE_NAME).toMatchSnapshot()
    })
    it("should match BR_COOKIE_COOKIE_NUMBER_OF_DAYS", () => {
        expect(BR_COOKIE_COOKIE_NUMBER_OF_DAYS).toMatchSnapshot()
    })
    it("should match BR_COOKIE_COOKIE_CACHING_ID", () => {
        expect(BR_COOKIE_COOKIE_CACHING_ID).toMatchSnapshot()
    })
    it("should match TIME_MACHINE_DATE_COOKIE", () => {
        expect(TIME_MACHINE_DATE_COOKIE).toMatchSnapshot()
    })
    it("should match COUNTRY_SELECTOR_TYPING_DELAY_TIME", () => {
        expect(COUNTRY_SELECTOR_TYPING_DELAY_TIME).toMatchSnapshot()
    })
    it("should match RPID", () => {
        expect(RPID).toMatchSnapshot()
    })
    it("should match ACCOUNT_TYPE", () => {
        expect(ACCOUNT_TYPE).toMatchSnapshot()
    })
    it("should match UNLIMITED_CUSTOMER", () => {
        expect(UNLIMITED_CUSTOMER).toMatchSnapshot()
    })
    it("should match BURGER_MENU_TEMPLATE", () => {
        expect(BURGER_MENU_TEMPLATE).toMatchSnapshot()
    })
    it("should match DEFAULT_TEMPLATE", () => {
        expect(DEFAULT_TEMPLATE).toMatchSnapshot()
    })
    it("should match PLP_ENTRYPOINT_ID", () => {
        expect(PLP_ENTRYPOINT_ID).toMatchSnapshot()
    })
})
