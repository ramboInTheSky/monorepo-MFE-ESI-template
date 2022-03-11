import getABPlatformConfig from "."
import BFFLogger from "../../server/core/BFFLogger"

jest.mock("../../server/core/BFFLogger", () => ({
    __esModule: true,
    default: {error: jest.fn()},
}))

jest.mock("../getRegExValue", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    getRegExValue: () => "fakeamido.com",
}))

describe("Given a getABPlatformConfig", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    let siteUrl = "https://fakeamido.com"
    let configuration = {
        "header.frontend.abPlatformTesting.enabled": {
            Value: true,
        },
    }

    describe("When getting for a valid configuration", () => {
        describe("feature is enabled", () => {
            it("should return config with siteurl", () => {
                expect(getABPlatformConfig(configuration, siteUrl)).toEqual({
                    abPlatformTesting: true,
                    config: "/configs/abplatform/fakeamido.com-abplatformconfig.js",
                })
            })

            it("should return config without siteurl for local dev and integratin tests", () => {
                siteUrl = "http://ab.localhost:3333"
                expect(getABPlatformConfig(configuration, siteUrl)).toEqual({
                    abPlatformTesting: true,
                    config: "/configs/abplatform/abplatformconfig.js",
                })
            })
        })
        describe("feature is disabled", () => {
            it("should return expected values", () => {
                configuration = {
                    "header.frontend.abPlatformTesting.enabled": {
                        Value: false,
                    },
                }
                expect(getABPlatformConfig(configuration, siteUrl)).toEqual({
                    abPlatformTesting: false,
                    config: "",
                })
            })
        })
    })

    describe("When getting for a invalid configuration", () => {
        describe("feature setting value isn't an acceptable value", () => {
            it("should return false config", () => {
                const mockConfig = {
                    "header.frontend.abPlatformTesting.enabled": {
                        Value: 4,
                    },
                }
                expect(getABPlatformConfig(mockConfig, siteUrl)).toEqual({
                    abPlatformTesting: false,
                    config: "",
                })
            })
        })
        describe("siteurl is missing", () => {
            it("should return false config", () => {
                siteUrl = ""
                expect(getABPlatformConfig(configuration, siteUrl)).toEqual({
                    abPlatformTesting: false,
                    config: "",
                })
                expect(BFFLogger.error).toHaveBeenCalled()
            })
        })
    })
})
