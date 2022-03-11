import {ThemeColor, mockColors} from "@monorepo/themes"
import {PRELOAD, PRELOAD_VENDOR, PRELOAD_JSS, PRELOAD_JSS_VENDOR, BUNDLE, BUNDLE_VENDOR} from "./assets"

jest.mock("../../../../package.json", () => ({
    version: "1.2.3.4",
}))

describe(" Assets Middleware", () => {
    describe("PRELOAD", () => {
        const testColours: ThemeColor = mockColors
        it("match snapshot", () => {
            expect(PRELOAD(testColours, "v1.4.4", "https://www.amido.com")).toMatchSnapshot()
        })
    })
    describe("PRELOAD_VENDOR", () => {
        const testColours: ThemeColor = mockColors
        it("match snapshot", () => {
            expect(PRELOAD_VENDOR(testColours, "v1.4.4", "https://www.amido.com")).toMatchSnapshot()
        })
    })
    describe("PRELOAD_JSS", () => {
        const testColours: ThemeColor = mockColors
        it("match snapshot", () => {
            expect(PRELOAD_JSS(testColours, "v1.4.4", "https://www.amido.com")).toMatchSnapshot()
        })
    })
    describe("PRELOAD_JSS_VENDOR", () => {
        const testColours: ThemeColor = mockColors
        it("match snapshot", () => {
            expect(PRELOAD_JSS_VENDOR(testColours, "v1.4.4", "https://www.amido.com")).toMatchSnapshot()
        })
    })
    describe("BUNDLE", () => {
        it("match snapshot", () => {
            expect(BUNDLE("https://www.amido.com")).toMatchSnapshot()
        })
    })
    describe("BUNDLE_VENDOR", () => {
        it("match snapshot", () => {
            expect(BUNDLE_VENDOR("https://www.amido.com")).toMatchSnapshot()
        })
    })
})
