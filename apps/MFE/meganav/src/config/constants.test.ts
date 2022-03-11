import {
    BASELINECSS_MATERIALUI,
    COUNTRY_GB,
    DRAWER_RESET_HEIGHT_SCROLL_TRIGGER,
    Direction,
    NEXT_REALM,
    OVERLAY_TIMEOUT,
    PRIMARY_NAV_ITEM_HOVER_DELAY,
    PRIMARY_NAV_ITEM_ACTIVE_HOVER_DELAY,
    DRAWER_GAP,
    CHEVRON_WIDTH,
    DEFAULT_IMAGE_PLACEHOLDER,
    LTR,
    NAV_BAR,
    SELECTED_DEPARTMENT_DETAILS,
    VISITED_PAGES,
    RTL,
    NEXT_DIRECT_PATH,
} from "./constants"

describe("config: constants", () => {
    it("should match the snapshot for BASELINECSS_MATERIALUI", () => {
        expect(BASELINECSS_MATERIALUI).toMatchSnapshot()
    })
    it("should match the snapshot for NEXT_REALM", () => {
        expect(NEXT_REALM).toMatchSnapshot()
    })
    it("should match the snapshot for COUNTRY_GB", () => {
        expect(COUNTRY_GB).toMatchSnapshot()
    })
    it("should match the snapshot for Direction", () => {
        expect(Direction).toMatchSnapshot()
    })
    it("should match the snapshot for PRIMARY_NAV_ITEM_ACTIVE_HOVER_DELAY", () => {
        expect(PRIMARY_NAV_ITEM_ACTIVE_HOVER_DELAY).toMatchSnapshot()
    })
    it("should match the snapshot for PRIMARY_NAV_ITEM_HOVER_DELAY", () => {
        expect(PRIMARY_NAV_ITEM_HOVER_DELAY).toMatchSnapshot()
    })
    it("should match DRAWER_RESET_HEIGHT_SCROLL_TRIGGER", () => {
        expect(DRAWER_RESET_HEIGHT_SCROLL_TRIGGER).toMatchSnapshot()
    })
    it("should match OVERLAY_TIMEOUT", () => {
        expect(OVERLAY_TIMEOUT).toMatchSnapshot()
    })
    it("should match DRAWER_GAP", () => {
        expect(DRAWER_GAP).toMatchSnapshot()
    })
    it("should match CHEVRON_WIDTH", () => {
        expect(CHEVRON_WIDTH).toMatchSnapshot()
    })
    it("should match DEFAULT_IMAGE_PLACEHOLDER", () => {
        expect(DEFAULT_IMAGE_PLACEHOLDER).toMatchSnapshot()
    })
    it("should match LTR", () => {
        expect(LTR).toMatchSnapshot()
    })
    it("should match NAV_BAR", () => {
        expect(NAV_BAR).toMatchSnapshot()
    })
    it("should match SELECTED_DEPARTMENT_DETAILS", () => {
        expect(SELECTED_DEPARTMENT_DETAILS).toMatchSnapshot()
    })
    it("should match VISITED_PAGES", () => {
        expect(VISITED_PAGES).toMatchSnapshot()
    })
    it("should match RTL", () => {
        expect(RTL).toMatchSnapshot()
    })
    it("should match NEXT_DIRECT_PATH", () => {
        expect(NEXT_DIRECT_PATH).toMatchSnapshot()
    })
})
