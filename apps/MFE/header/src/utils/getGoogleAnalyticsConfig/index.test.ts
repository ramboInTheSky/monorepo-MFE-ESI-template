import getGoogleAnalyticsConfig from "."
import BFFLogger from "../../server/core/BFFLogger"

jest.mock("../../server/core/BFFLogger", () => ({
    __esModule: true,
    default: {error: jest.fn()},
}))

const mockConfig = {
    "header.frontend.googleAnalytics": {
        uk: {
            account: "GTM-KMS4Q5K",
            environmentKeys: {
                dev: "&gtm_auth=7xkG6xPKrPxzzEeB3hLFHw&gtm_preview=env-3",
                uat: "&gtm_auth=_ZZUNtBhFJmC1r_2qjDKpA&gtm_preview=env-4",
                conv: "&gtm_auth=ZYi9RiutEBKmsbZIzt8Pmw&gtm_preview=env-5",
                live: "",
            },
        },
        international: {
            account: "GTM-5PD9K7X",
            environmentKeys: {
                dev: "&gtm_auth=9C_ZAUEPwLw_N5RsUhs-IA&gtm_preview=env-3",
                uat: "&gtm_auth=4mX7BBT-8se_dZx_VVTnzg&gtm_preview=env-5",
                conv: "&gtm_auth=gxD-oQhbB6SZCtzV-rPUXA&gtm_preview=env-6",
                live: "",
            },
        },
    },
    "header.frontend.enableGoogleAnalyticsSDK": {
        Value: true,
    },
    "header.frontend.territoryName": {
        Value: "GB",
    },
}

describe("Given a getGoogleAnalyticsConfig", () => {
    describe("When getting for a valid configuration", () => {
        it("When UK and Dev and enabled, it should return expected values", () => {
            expect(getGoogleAnalyticsConfig(mockConfig)).toEqual({
                account: "GTM-KMS4Q5K",
                environmentKey: "&gtm_auth=7xkG6xPKrPxzzEeB3hLFHw&gtm_preview=env-3",
                useGoogleAnalytics: true,
            })
        })

        it("When MX and Dev and enabled, it should return expected values", () => {
            const mxConfig = {...mockConfig}
            mxConfig["header.frontend.territoryName"].Value = "MX"
            expect(getGoogleAnalyticsConfig(mxConfig)).toEqual({
                account: "GTM-5PD9K7X",
                environmentKey: "&gtm_auth=9C_ZAUEPwLw_N5RsUhs-IA&gtm_preview=env-3",
                useGoogleAnalytics: true,
            })
        })

        it("When MX and Dev and disabled, it should return expected values", () => {
            const mockDisabledConfig = {
                "header.frontend.enableGoogleAnalyticsSDK": {
                    Value: false,
                },
                "header.frontend.territoryName": {
                    Value: "gb",
                },
            }
            mockDisabledConfig["header.frontend.territoryName"].Value = "MX"
            expect(getGoogleAnalyticsConfig(mockDisabledConfig)).toEqual({
                account: "",
                environmentKey: "",
                useGoogleAnalytics: false,
            })
        })

        it("When MX and Dev and disabled, it should not throw an error", () => {
            const mockDisabledConfig = {
                "header.frontend.enableGoogleAnalyticsSDK": {
                    Value: false,
                },
                "header.frontend.territoryName": {
                    Value: "gb",
                },
            }
            getGoogleAnalyticsConfig(mockDisabledConfig)
            expect(BFFLogger.error).toHaveBeenCalledTimes(0)
        })
    })

    describe("When getting for an  invalid configuration", () => {
        const mockMissingConfig = {
            "header.frontend.enableGoogleAnalyticsSDK": {
                Value: true,
            },
            "header.frontend.territoryName": {
                Value: "gb",
            },
        }
        it("should return default values", () => {
            expect(getGoogleAnalyticsConfig(mockMissingConfig)).toEqual({
                account: "",
                environmentKey: "",
                useGoogleAnalytics: false,
            })
        })

        it("should call the logger", () => {
            getGoogleAnalyticsConfig(mockMissingConfig)
            expect(BFFLogger.error).toHaveBeenCalled()
        })
    })
})
