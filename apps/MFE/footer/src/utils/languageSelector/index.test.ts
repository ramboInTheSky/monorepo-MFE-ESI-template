import {Store} from "redux"
import logger from "@monorepo/core-logger"
import {LanguageOptions} from "../../models/language"
import {updateLanguage, initialState} from "../../ducks/languages"

import {setLanguageSettings, pullLanguagesFromConfig, extractLanguageSelectorData} from "."

const mockStoreDispatch = jest.fn()
const store = {dispatch: mockStoreDispatch} as unknown as Store

jest.mock(
    "./languagesconfig.json",
    () => ({
        languages: [
            {
                id: "1",
                displayText: "Bahasa Melayu",
                name: "ms",
                url: "/ms",
            },
            {
                id: "2",
                displayText: "български",
                name: "bg",
                url: "/bg",
            },
        ],
    }),
    {virtual: true},
)

jest.mock("../../ducks/languages", () => {
    return {updateLanguage: jest.fn()}
})

const currentLanguageName = "ms"
const direction = "ltr"
const siteUrl = "amido.com"

describe("Utils: languageSelector - ", () => {
    describe("setLanguageSelector() - ", () => {
        describe("When Props are correct", () => {
            const configuration = {
                "footer.frontend.territoryName": {Value: "GB"},
                "footer.frontend.direction": {Value: "ltr"},
                "footer.alternativeLanguages": [{Value: "1"}, {Value: "2"}],
                "footer.frontend.languageName": {Value: "ms"},
            }
            it("should call Update Langauage to apply to redux store", () => {
                setLanguageSettings(store, configuration, siteUrl)
                expect(updateLanguage).toHaveBeenCalled()
            })
        })
        describe("When language props are missing", () => {
            const configuration = {
                "footer.frontend.territoryName": {Value: "GB"},
                "footer.frontend.languageName": {Value: "ms"},
                "footer.frontend.direction": {Value: "ltr"},
            }
            const spyLoggerWarning = jest.spyOn(logger, "warn")
            it("should log an error", () => {
                setLanguageSettings(store, configuration, siteUrl)
                expect(spyLoggerWarning).toHaveBeenCalled()
                expect(spyLoggerWarning).toHaveBeenCalledWith(`Missing language IDs from GB`)
            })
        })
    })
    describe("pullLanguagesFromConfig() - ", () => {
        describe("When parameters are correct", () => {
            const languageIds = ["1", "2"]
            const activeLanguage = "ms"

            it("should return a valid langauge settings object", () => {
                const expectedResult: LanguageOptions = {
                    Languages: [
                        {
                            Language: {
                                id: "1",
                                displayText: "Bahasa Melayu",
                                name: "ms",
                                url: "/ms",
                            },
                            isActiveLanguage: true,
                        },
                        {
                            Language: {
                                id: "2",
                                displayText: "български",
                                name: "bg",
                                url: "/bg",
                            },
                            isActiveLanguage: false,
                        },
                    ],
                }

                const sut = pullLanguagesFromConfig(languageIds, activeLanguage)
                expect(sut).toMatchObject(expectedResult)
            })
        })
        describe("When parameters incorrect", () => {
            const languageIds = ["4", "5"]
            const activeLanguage = "gb"

            it("should return a valid langauge settings object", () => {
                const expectedResult: LanguageOptions = {
                    Languages: [],
                }

                const sut = pullLanguagesFromConfig(languageIds, activeLanguage)
                expect(sut).toMatchObject(expectedResult)
            })
        })
    })
    describe("ExtractLanguageSelectorData() - ", () => {
        describe("When a valid collection of languages is submitted", () => {
            const availableLanguages = {
                Languages: [
                    {
                        Language: {
                            id: "1",
                            displayText: "Bahasa Melayu",
                            name: "ms",
                            url: "/ms",
                        },
                        isActiveLanguage: true,
                    },
                    {
                        Language: {
                            id: "2",
                            displayText: "български",
                            name: "bg",
                            url: "/bg",
                        },
                        isActiveLanguage: false,
                    },
                ],
            }

            it("should return a valid object to use for language selector ", () => {
                const expectedResult = {
                    currentLanguageText: "Bahasa Melayu",
                    altLanguageName: "bg",
                    altLanguageUrl: "/bg",
                    currentLanguageName,
                    direction,
                    siteUrl,
                }
                const sut = extractLanguageSelectorData(
                    availableLanguages.Languages,
                    currentLanguageName,
                    direction,
                    siteUrl,
                )
                expect(sut).toEqual(expectedResult)
            })
        })
        describe("When a collection of languages is submitted with no Active Language", () => {
            const availableLanguages = {
                Languages: [
                    {
                        Language: {
                            id: "1",
                            displayText: "Bahasa Melayu",
                            name: "ms",
                            url: "/ms",
                        },
                        isActiveLanguage: false,
                    },
                    {
                        Language: {
                            id: "2",
                            displayText: "български",
                            name: "bg",
                            url: "/bg",
                        },
                        isActiveLanguage: false,
                    },
                ],
            }
            it("should return the redux object initial state", () => {
                const sut = extractLanguageSelectorData(
                    availableLanguages.Languages,
                    currentLanguageName,
                    direction,
                    siteUrl,
                )
                expect(sut).toEqual({
                    ...initialState,
                    siteUrl,
                })
            })
        })
        describe("When an empty collection of languages is submitted", () => {
            const availableLanguages = {
                Languages: [],
            }
            it("should return the redux object initial state ", () => {
                const sut = extractLanguageSelectorData(
                    availableLanguages.Languages,
                    currentLanguageName,
                    direction,
                    siteUrl,
                )
                expect(sut).toEqual({
                    ...initialState,
                    siteUrl,
                })
            })
        })
    })
})
