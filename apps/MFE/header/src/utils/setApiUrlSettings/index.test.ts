import {SettingsSdkKeys} from "../../models/settings"
import {setApiUrlSettings} from "."
import {mockAutoComplete} from "../../../__mocks__/mockStore"

describe("Utils: setAPIUrlSettings - ", () => {
    describe("When Settings SDK gives valid data", () => {
        const configuration = {
            [SettingsSdkKeys.direction]: {Value: "ltr"},
            [SettingsSdkKeys.realm]: {Value: "Amido"},
            [SettingsSdkKeys.territory]: {Value: "GB"},
            [SettingsSdkKeys.language]: {Value: "en"},
            [SettingsSdkKeys.direction]: {Value: "test"},
            [SettingsSdkKeys.autoComplete]: mockAutoComplete,
            [SettingsSdkKeys.enableFavourites]: {enableFavourites: false},
        }
        const expectedValidObject = {
            realm: "Amido",
            territory: "GB",
            language: "en",
            alignment: "test",
            autocomplete: mockAutoComplete,
            favourites: {enableFavourites: false},
        }
        it("should return a valid api settings object", () => {
            expect(setApiUrlSettings(configuration)).toEqual(expectedValidObject)
        })
    })
    describe("Mock Settings SDK Error Catching", () => {
        describe("When Settings SDK is has no data", () => {
            const configuration = undefined
            it("should throw an error when settings SDK had missing data", () => {
                expect(() => setApiUrlSettings(configuration)).toThrowError()
            })
        })
        describe("When Settings SDK is has no Realm", () => {
            it("should throw an error when settings SDK returns no key realm", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: "GB"},
                    [SettingsSdkKeys.language]: {Value: "en"},
                }
                expect(() => setApiUrlSettings(configuration)).toThrowError()
            })
            it("should throw an error when settings SDK returns realm as empty string", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: "GB"},
                    [SettingsSdkKeys.realm]: {Value: ""},
                    [SettingsSdkKeys.language]: {Value: "en"},
                }
                expect(() => setApiUrlSettings(configuration)).toThrowError()
            })
        })
        describe("When Settings SDK is has no Territory", () => {
            it("should throw an error when settings SDK returns no key territory", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.realm]: {Value: "Amido"},
                    [SettingsSdkKeys.language]: {Value: "en"},
                }
                expect(() => setApiUrlSettings(configuration)).toThrowError()
            })
            it("should throw an error when settings SDK returns Territory as empty string", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: ""},
                    [SettingsSdkKeys.realm]: {Value: "Amido"},
                    [SettingsSdkKeys.language]: {Value: "en"},
                }
                expect(() => setApiUrlSettings(configuration)).toThrowError()
            })
        })
        describe("When Settings SDK is has no Language", () => {
            it("should throw an error when settings SDK returns no key language", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: "GB"},
                    [SettingsSdkKeys.realm]: {Value: "Amido"},
                }
                expect(() => setApiUrlSettings(configuration)).toThrowError()
            })
            it("should throw an error when settings SDK returns language as empty string", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: "GB"},
                    [SettingsSdkKeys.realm]: {Value: "Amido"},
                    [SettingsSdkKeys.language]: {Value: ""},
                }
                expect(() => setApiUrlSettings(configuration)).toThrowError()
            })
        })
    })
})
