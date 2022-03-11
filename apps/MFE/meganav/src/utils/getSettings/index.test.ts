import {getSettings} from "."
import {mockState} from "../../../__mocks__/mockStore"
import {SettingsSdkKeys} from "../../models/settings"
import BFFLogger from "../../server/core/BFFLogger"

jest.mock("../../server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockConfiguration = {
    [SettingsSdkKeys.direction]: {Value: "ltr"},
    [SettingsSdkKeys.realm]: {Value: "amido"},
    [SettingsSdkKeys.territory]: {Value: "gb"},
    [SettingsSdkKeys.language]: {Value: "en"},
    [SettingsSdkKeys.CorrelationHeaderName]: {Value: ""},
    [SettingsSdkKeys.appCache]: {Value: 3600},
    [SettingsSdkKeys.themeVersion]: {Value: ""},
    [SettingsSdkKeys.cacheControl]: {Value: ""},
    [SettingsSdkKeys.template]: {Value: "default"},
} as any

describe("Utils: getSettings() - ", () => {
    describe("When configuration is valid", () => {
        it("should transform configuration to a Settings object", () => {
            expect(getSettings(mockConfiguration)).toEqual(mockState.settings)
        })
    })

    describe("Given configuration is invalid", () => {
        describe("When configuration is missing", () => {
            it("should log an error and return an empty object", () => {
                const configuration = undefined as any
                const actual = getSettings(configuration)
                const expected = {}
                expect(actual).toEqual(expected)
                expect(BFFLogger.error).toBeCalled()
            })
        })
        describe("When a configuration value is missing", () => {
            it("should log an error and return an object containing the valid settings values", () => {
                const mockInvalidConfiguration = {
                    [SettingsSdkKeys.template]: {Value: "amido"} as any,
                } as any
                const actual = getSettings(mockInvalidConfiguration)
                const expected = {template: "amido"}
                expect(actual).toEqual(expected)
                expect(BFFLogger.error).toBeCalled()
            })
        })
    })
})
