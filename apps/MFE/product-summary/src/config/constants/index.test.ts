import {
    LG_IMAGE_PATH,
    PRODUCT_SCROLLBAR_SIZE,
    IMAGE_EXTENSION,
    SHOW_INITIAL_COLOURCHIPS,
    COLOURCHIP_GREY_PLACEHOLDER_URL,
    PRODUCT_IMAGE_GREY_PLACEHOLDER_URL,
    FIT_ICON_PLACEHOLDER_URL,
    LAZY_SIZES_CLASSNAME,
    SWIPER_LAZYLOAD_CLASSNAME,
    COLOURCHIP_UNEXPANDED_HEIGHT,
    FAV_TIMER_LENGTH,
    LANGUAGE_HEADER,
    LANG_EN,
    DEPARTMENT_MENSWEAR,
    DEPARTMENT_HOMEWARE,
    GTM_PRODUCT_IMPRESSIONS_EVENT,
    GTM_PRODUCT_CLICK_EVENT,
    GTM_FAVOURITES,
    GTM_ADD_FAVOURITES,
    GTM_ERROR_ADD_FAVOURITES,
    GTM_ERROR_REMOVE_FAVOURITES,
    GTM_REMOVE_FAVOURITES,
    Fits,
    FitsIcons,
    SaleSashPosition,
    PRODUCT_SUMMARY_ID,
    PRODUCT_SUMMARY_CACHE_TAG,
    CACHE_HEADER_LAST_MODIFIED,
    CACHE_HEADER_CACHE_TAGS,
    MAX_LIMIT_FAVOURITES_FALLBACK,
    LTR,
    PLP_DEFAULT_TITLE_CONTAINER,
    SofaType,
    SOFA_COLOUR_CHIP_PREFIX,
    COLOUR_CHIP_PREFIX,
    MADE_TO_MEASURE,
} from "."

describe("Given Constants", () => {
    describe("Should match expected", () => {
        it("should match expected LG_IMAGE_PATH", () => {
            expect(LG_IMAGE_PATH).toMatchSnapshot()
        })
        it("should match expected PRODUCT_SCROLLBAR_SIZE", () => {
            expect(PRODUCT_SCROLLBAR_SIZE).toMatchSnapshot()
        })
        it("should match expected IMAGE_EXTENSION", () => {
            expect(IMAGE_EXTENSION).toMatchSnapshot()
        })
        it("should match expected SHOW_INITIAL_COLOURCHIPS", () => {
            expect(SHOW_INITIAL_COLOURCHIPS).toMatchSnapshot()
        })
        it("should match expected COLOURCHIP_GREY_PLACEHOLDER_URL", () => {
            expect(COLOURCHIP_GREY_PLACEHOLDER_URL).toMatchSnapshot()
        })
        it("should match expected PRODUCT_IMAGE_GREY_PLACEHOLDER_URL", () => {
            expect(PRODUCT_IMAGE_GREY_PLACEHOLDER_URL).toMatchSnapshot()
        })
        it("should match expected FIT_ICON_PLACEHOLDER_URL", () => {
            expect(FIT_ICON_PLACEHOLDER_URL).toMatchSnapshot()
        })
        it("should match expected LAZY_SIZES_CLASSNAME", () => {
            expect(LAZY_SIZES_CLASSNAME).toMatchSnapshot()
        })
        it("should match expected SWIPER_LAZYLOAD_CLASSNAME", () => {
            expect(SWIPER_LAZYLOAD_CLASSNAME).toMatchSnapshot()
        })
        it("should match expected COLOURCHIP_UNEXPANDED_HEIGHT", () => {
            expect(COLOURCHIP_UNEXPANDED_HEIGHT).toMatchSnapshot()
        })
        it("should match expected FAV_TIMER_LENGTH", () => {
            expect(FAV_TIMER_LENGTH).toMatchSnapshot()
        })
        it("should match expected LANGUAGE_HEADER", () => {
            expect(LANGUAGE_HEADER).toMatchSnapshot()
        })
        it("should match expected LANG_EN", () => {
            expect(LANG_EN).toMatchSnapshot()
        })
        it("should match expected DEPARTMENT_MENSWEAR", () => {
            expect(DEPARTMENT_MENSWEAR).toMatchSnapshot()
        })
        it("should match expected DEPARTMENT_HOMEWARE", () => {
            expect(DEPARTMENT_HOMEWARE).toMatchSnapshot()
        })
        it("should match expected GTM_FAVOURITES", () => {
            expect(GTM_FAVOURITES).toMatchSnapshot()
        })        
        it("should match expected GTM_ADD_FAVOURITES", () => {
            expect(GTM_ADD_FAVOURITES).toMatchSnapshot()
        })
        it("should match expected GTM_ERROR_ADD_FAVOURITES", () => {
            expect(GTM_ERROR_ADD_FAVOURITES).toMatchSnapshot()
        })        
        it("should match expected GTM_ERROR_REMOVE_FAVOURITES", () => {
            expect(GTM_ERROR_REMOVE_FAVOURITES).toMatchSnapshot()
        })        
        it("should match expected GTM_REMOVE_FAVOURITES", () => {
            expect(GTM_REMOVE_FAVOURITES).toMatchSnapshot()
        })
        it("should match expected GTM_PRODUCT_IMPRESSIONS_EVENT", () => {
            expect(GTM_PRODUCT_IMPRESSIONS_EVENT).toMatchSnapshot()
        })
        it("should match expected GTM_PRODUCT_CLICK_EVENT", () => {
            expect(GTM_PRODUCT_CLICK_EVENT).toMatchSnapshot()
        })
        it("should match expected Fits", () => {
            expect(Fits).toMatchSnapshot()
        })
        it("should match expected FitsIcons", () => {
            expect(FitsIcons).toMatchSnapshot()
        })
        it("should match expected SaleSashPosition", () => {
            expect(SaleSashPosition).toMatchSnapshot()
        })
        it("should match PRODUCT_SUMMARY_ID", () => {
            expect(PRODUCT_SUMMARY_ID).toMatchSnapshot()
        })
        it("should match expected PRODUCT_SUMMARY_CACHE_TAG", () => {
            expect(PRODUCT_SUMMARY_CACHE_TAG).toMatchSnapshot()
        })
        it("should match expected CACHE_HEADER_LAST_MODIFIED", () => {
            expect(CACHE_HEADER_LAST_MODIFIED).toMatchSnapshot()
        })
        it("should match expected CACHE_HEADER_CACHE_TAGS", () => {
            expect(CACHE_HEADER_CACHE_TAGS).toMatchSnapshot()
        })
        it("should match expected MAX_LIMIT_FAVOURITES_FALLBACK", () => {
            expect(MAX_LIMIT_FAVOURITES_FALLBACK).toMatchSnapshot()
        })
        it("should match expected LTR", () => {
            expect(LTR).toMatchSnapshot()
        })
        it("should match expected PLP_DEFAULT_TITLE_CONTAINER", () => {
            expect(PLP_DEFAULT_TITLE_CONTAINER).toMatchSnapshot()
        })
        it("should match expected SofaType", () => {
            expect(SofaType).toMatchSnapshot()
        })
        it("should match expected SOFA_COLOUR_CHIP_PREFIX", () => {
            expect(SOFA_COLOUR_CHIP_PREFIX).toMatchSnapshot()
        })
        it("should match expected COLOUR_CHIP_PREFIX", () => {
            expect(COLOUR_CHIP_PREFIX).toMatchSnapshot()
        })
        it("should match expected MADE_TO_MEASURE", () => {
            expect(MADE_TO_MEASURE).toMatchSnapshot()
        })
    })
})
