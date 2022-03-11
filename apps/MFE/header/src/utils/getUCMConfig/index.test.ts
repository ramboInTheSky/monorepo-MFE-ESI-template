import getUCMConfig from "."
import BFFLogger from "../../server/core/BFFLogger"

jest.mock("../../server/core/BFFLogger", () => ({
    __esModule: true,
    default: {error: jest.fn()},
}))

describe("Given a getUCMConfig", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("When getting for a valid configuration", () => {
        describe("feature is enabled", () => {
            it("should return expected values", () => {
                const mockConfig = {
                    "header.frontend.userConsentManagement.enabled": {
                        Value: true,
                        options: {
                            autoLanguageDetection: true,
                            dataDomainScriptGuid: {
                                conv: "f7b25b1a-13f6-481c-8cc7-175280b707d8-test",
                                live: "f7b25b1a-13f6-481c-8cc7-175280b707d8",
                            },
                        },
                    },
                }
                expect(getUCMConfig(mockConfig)).toEqual({
                    enableucmSDK: true,
                    autoLanguageDetection: true,
                    dataDomainScriptGuid: "f7b25b1a-13f6-481c-8cc7-175280b707d8-test",
                })
            })
            it("if dataDomainScriptGuid is missing it should throw an error", () => {
                const mockConfig = {
                    "header.frontend.userConsentManagement.enabled": {
                        Value: true,
                        options: {
                            autoLanguageDetection: true,
                            dataDomainScriptGuid: null,
                        },
                    },
                }
                expect(getUCMConfig(mockConfig)).toEqual({
                    enableucmSDK: false,
                    dataDomainScriptGuid: "",
                    autoLanguageDetection: false,
                })
                expect(BFFLogger.error).toBeCalledTimes(1)
            })
        })

        describe("when not enabled", () => {
            it("should return expected values", () => {
                const mockConfig = {
                    "header.frontend.userConsentManagement.enabled": {
                        Value: false,
                        options: {
                            autoLanguageDetection: true,
                            dataDomainScriptGuid: {
                                conv: "f7b25b1a-13f6-481c-8cc7-175280b707d8-test",
                                live: "f7b25b1a-13f6-481c-8cc7-175280b707d8",
                            },
                        },
                    },
                }
                expect(getUCMConfig(mockConfig)).toEqual({
                    enableucmSDK: false,
                    dataDomainScriptGuid: "",
                    autoLanguageDetection: false,
                })
            })
        })
    })
})
