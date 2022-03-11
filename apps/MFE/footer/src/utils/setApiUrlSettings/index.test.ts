import {SettingsSdkKeys} from "../../models/settings"
import {isSettingsError} from "."

describe("Utils: isSettingsError - ", () => {
    describe("When Settings SDK gives valid data", () => {
        const configuration = {
            [SettingsSdkKeys.direction]: {Value: "ltr"},
            [SettingsSdkKeys.realm]: {Value: "Amido"},
            [SettingsSdkKeys.territory]: {Value: "GB"},
            [SettingsSdkKeys.language]: {Value: "en"},
        }

        it("should return a valid api settings object", () => {
            expect(isSettingsError(configuration)).toBeFalsy()
        })
    })
    describe("Mock Settings SDK Error Catching", () => {
        describe("When Settings SDK is has no data", () => {
            const configuration = undefined
            it("should throw an error when settings SDK had missing data", () => {
                expect(isSettingsError(configuration)).toBeTruthy()
            })
        })
        describe("When Settings SDK is has no Realm", () => {
            it("should throw an error when settings SDK returns no key realm", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: "GB"},
                    [SettingsSdkKeys.language]: {Value: "en"},
                }
                expect(isSettingsError(configuration)).toBeTruthy()
            })
            it("should throw an error when settings SDK returns realm as empty string", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: "GB"},
                    [SettingsSdkKeys.realm]: {Value: ""},
                    [SettingsSdkKeys.language]: {Value: "en"},
                }
                expect(isSettingsError(configuration)).toBeTruthy()
            })
        })
        describe("When Settings SDK is has no Territory", () => {
            it("should throw an error when settings SDK returns no key territory", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.realm]: {Value: "Amido"},
                    [SettingsSdkKeys.language]: {Value: "en"},
                }
                expect(isSettingsError(configuration)).toBeTruthy()
            })
            it("should throw an error when settings SDK returns Territory as empty string", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: ""},
                    [SettingsSdkKeys.realm]: {Value: "Amido"},
                    [SettingsSdkKeys.language]: {Value: "en"},
                }
                expect(isSettingsError(configuration)).toBeTruthy()
            })
        })
        describe("When Settings SDK is has no Language", () => {
            it("should throw an error when settings SDK returns no key language", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: "GB"},
                    [SettingsSdkKeys.realm]: {Value: "Amido"},
                }
                expect(isSettingsError(configuration)).toBeTruthy()
            })
            it("should throw an error when settings SDK returns language as empty string", () => {
                const configuration = {
                    [SettingsSdkKeys.direction]: {Value: "ltr"},
                    [SettingsSdkKeys.territory]: {Value: "GB"},
                    [SettingsSdkKeys.realm]: {Value: "Amido"},
                    [SettingsSdkKeys.language]: {Value: ""},
                }
                expect(isSettingsError(configuration)).toBeTruthy()
            })
        })
    })
})
