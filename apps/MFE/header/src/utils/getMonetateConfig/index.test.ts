import getMonetateConfig from "."
import BFFLogger from "../../server/core/BFFLogger"

jest.mock("../../server/core/BFFLogger", () => ({
    __esModule: true,
    default: {error: jest.fn()},
}))

const mockConfig = {
    "header.frontend.monetateSDK": {
        enabled: true,
        environmentKeys: {
            uat: "//monetate-uk-uat/entry.js",
            conv: "//monetate-uk-conv/entry.js",
            live: "//monetate-uk-live/entry.js",
        },
    },
    "header.frontend.territoryName": {
        Value: "gb",
    },
}

describe("Given a getMonetateConfig", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("When getting for a valid configuration", () => {
        describe("When enabled for UK", () => {
            it("should return expected values", () => {
                expect(getMonetateConfig(mockConfig)).toEqual({
                    enableMonetateSDK: true,
                    accountMonetateSDK: "//monetate-uk-uat/entry.js",
                })
            })
        })

        describe("When enabled for MX and Dev", () => {
            it("should return expected values", () => {
                const mxConfig = {
                    "header.frontend.monetateSDK": {
                        enabled: true,
                        environmentKeys: {
                            uat: "//monetate-mx-uat/entry.js",
                            conv: "//monetate-mx-conv/entry.js",
                            live: "//monetate-mx-live/entry.js",
                        },
                    },
                    "header.frontend.territoryName": {
                        Value: "mx",
                    },
                }
                expect(getMonetateConfig(mxConfig)).toEqual({
                    enableMonetateSDK: true,
                    accountMonetateSDK: "//monetate-mx-uat/entry.js",
                })
            })
        })
    })

    describe("When the monetate env keys are not passed", () => {
        const mockMissingConfig = {
            "header.frontend.monetateSDK": {
                enabled: true,
            },
            "header.frontend.territoryName": {
                Value: "gb",
            },
        }
        it("should return default values", () => {
            expect(getMonetateConfig(mockMissingConfig)).toEqual({
                enableMonetateSDK: false,
                accountMonetateSDK: "",
            })
        })

        it("should call the logger", () => {
            getMonetateConfig(mockMissingConfig)
            expect(BFFLogger.error).toHaveBeenCalled()
        })
    })

    describe("When the monetate env keys are not passed and monetate disabled", () => {
        const mockMissingConfig = {
            "header.frontend.monetateSDK": {
                enabled: false,
            },
            "header.frontend.territoryName": {
                Value: "gb",
            },
        }
        it("should return default values", () => {
            expect(getMonetateConfig(mockMissingConfig)).toEqual({
                enableMonetateSDK: false,
                accountMonetateSDK: "",
            })
        })

        it("should not call the logger", () => {
            getMonetateConfig(mockMissingConfig)
            expect(BFFLogger.error).toBeCalledTimes(0)
        })
    })

    describe("When the monetate feature settings are not passed", () => {
        const mockMissingConfig = {
            "header.frontend.territoryName": {
                Value: "gb",
            },
        }
        it("should return default values", () => {
            expect(getMonetateConfig(mockMissingConfig)).toEqual({
                enableMonetateSDK: false,
                accountMonetateSDK: "",
            })
        })
        it("should not call the logger", () => {
            getMonetateConfig(mockMissingConfig)
            expect(BFFLogger.error).toBeCalledTimes(0)
        })
    })
})
