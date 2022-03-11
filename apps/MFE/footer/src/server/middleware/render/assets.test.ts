import {ThemeColor, mockColors} from "@monorepo/themes"
import {BUNDLE, BUNDLE_VENDOR, PRELOAD_VENDOR, PRELOAD} from "./assets"

jest.mock("../../../../package.json", () => ({
    version: "1.1.0",
}))

describe(" Assets Middleware", () => {
    describe("BUNDLE", () => {
        it("match snapshot", () => {
            expect(BUNDLE("http://amido.com/en")).toMatchSnapshot()
        })
    })
    describe("BUNDLE_VENDOR", () => {
        it("match snapshot", () => {
            expect(BUNDLE_VENDOR("http://amido.com/en")).toMatchSnapshot()
        })
    })
    describe("PRELOAD_VENDOR", () => {
        const testColours: ThemeColor = mockColors
        it("match snapshot", () => {
            expect(PRELOAD_VENDOR(testColours, "v1.1.9")).toMatchSnapshot()
        })
    })
    describe("PRELOAD", () => {
        const testColours: ThemeColor = mockColors
        it("match snapshot", () => {
            expect(PRELOAD(testColours, "v1.1.9")).toMatchSnapshot()
        })
    })
})
