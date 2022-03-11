import {
    COUNTRY_SELECTOR_DRAWER_BREAKPOINT,
    CHEVRON_ICON_URL,
    COUNTRY_SELECTOR_URL,
    COUNTRY_LANG_SELECTOR_DATA_GA,
    COUNTRY_SELECT_DROPDOWN_DATA_GA,
} from "./constants"

describe("Constants", () => {
    it("should match COUNTRY_SELECTOR_DRAWER_BREAKPOINT", () => {
        expect(COUNTRY_SELECTOR_DRAWER_BREAKPOINT).toMatchSnapshot()
    })

    it("should match CHEVRON_ICON_URL", () => {
        expect(CHEVRON_ICON_URL).toMatchSnapshot()
    })

    it("should match COUNTRY_SELECTOR_URL", () => {
        expect(COUNTRY_SELECTOR_URL).toMatchSnapshot()
    })

    it("should match COUNTRY_LANG_SELECTOR_DATA_GA", () => {
        expect(COUNTRY_LANG_SELECTOR_DATA_GA).toMatchSnapshot()
    })

    it("should match COUNTRY_SELECT_DROPDOWN_DATA_GA", () => {
        expect(COUNTRY_SELECT_DROPDOWN_DATA_GA).toMatchSnapshot()
    })
})
