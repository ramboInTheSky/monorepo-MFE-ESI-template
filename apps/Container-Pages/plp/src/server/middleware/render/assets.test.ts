import {mockColors} from "@monorepo/themes"
import {
    BUNDLE,
    PRODUCT_SUMMARY_BUNDLES,
    PRELOAD,
    THEME,
    VENDORS,
    FAV_ICON_PATH,
    HEADER,
} from "./assets"

jest.mock("../../../../package.json", () => ({
    version: "1.2.3.4",
}))

describe(" Assets Middleware", () => {
    describe("VENDORS", () => {
        it("match snapshot", () => {
            expect(VENDORS).toMatchSnapshot()
        })
    })
    describe("BUNDLE", () => {
        it("match snapshot", () => {
            expect(BUNDLE).toMatchSnapshot()
        })
    })
    describe("HEADER", () => {
        it("When using dev esi, it should match snapshot", () => {
            expect(HEADER("ww.test.co.uk", true)).toMatchSnapshot()
        })

        it("When not using dev esi, it should not match snapshot", () => {
            expect(HEADER("ww.test.co.uk", false)).toMatchSnapshot()
        })
    })
    describe("PRODUCT_SUMMARY_BUNDLES", () => {
        it("When using dev esi, it should match snapshot", () => {
            expect(PRODUCT_SUMMARY_BUNDLES("ww.test.co.uk", true)).toMatchSnapshot()
        })

        it("When not using dev esi, it should not match snapshot", () => {
            expect(PRODUCT_SUMMARY_BUNDLES("ww.test.co.uk", false)).toMatchSnapshot()
        })
    })
    describe("PRELOAD", () => {
        it("When using dev esi, it should match snapshot", () => {
            expect(PRELOAD("www.test.co.uk", true, mockColors)).toMatchSnapshot()
        })
        it("not using dev esi, it should match snapshot", () => {
            expect(PRELOAD("www.test.co.uk", false, mockColors)).toMatchSnapshot()
        })
    })
    describe("THEME", () => {
        it("match snapshot", () => {
            expect(THEME("{}", "v1.1.0")).toMatchSnapshot()
        })
    })
    describe("FAV_ICON_PATH", () => {
        it("should match snapshot", () => {
            expect(FAV_ICON_PATH("http://superman.cdn.amido", "amido")).toMatchSnapshot()
        })
    })
})
