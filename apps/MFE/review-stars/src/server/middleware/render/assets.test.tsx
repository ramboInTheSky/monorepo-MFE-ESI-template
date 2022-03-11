import {PRELOAD, PRELOAD_VENDOR, BUNDLE, BUNDLE_VENDOR} from "./assets"

jest.mock("../../../../package.json", () => ({
    version: "1.2.3.4",
}))

describe(" Assets Middleware", () => {
    describe("PRELOAD", () => {
        it("match snapshot", () => {
            expect(PRELOAD("A_URL", "{}", "v1.4.4")).toMatchSnapshot()
        })
    })
    describe("PRELOAD_VENDOR", () => {
        it("match snapshot", () => {
            expect(PRELOAD_VENDOR("A_URL", "{}", "v1.4.4")).toMatchSnapshot()
        })
    })

    describe("BUNDLE", () => {
        it("match snapshot", () => {
            expect(BUNDLE("A_URL")).toMatchSnapshot()
        })
    })
    describe("BUNDLE_VENDOR", () => {
        it("match snapshot", () => {
            expect(BUNDLE_VENDOR("A_URL")).toMatchSnapshot()
        })
    })
})
