/* eslint-disable @typescript-eslint/unbound-method */
import BFFLogger from "../../../server/core/BFFLogger"
import {SettingsSdkKeys} from "../../../config/settings"
import areFeatureSettingsValid from "."

jest.mock("../../../server/core/BFFLogger", () => ({
    error: jest.fn(),
}))

jest.mock("@monorepo/themes", () => ({
    isThemeValid: jest.fn(theme => {
        return !theme.isNotValid
    }),
}))
const configuration = {
    [SettingsSdkKeys.Direction]: {Value: "ltr"},
    [SettingsSdkKeys.imageCdnUrl]: {Value: "http://www.test.com"},
    [SettingsSdkKeys.imageCdnUrlProduct]: {Value: "search"},
}

describe("Utils: validateFeatureSettings - ", () => {
    describe("When Settings SDK gives valid data", () => {
        it("should return a valid api settings object", () => {
            expect(areFeatureSettingsValid(configuration)).toEqual(true)
        })
    })

    describe("When settings are not provided", () => {
        const nullConfiguration = null

        it("should return a valid api settings object", () => {
            expect(areFeatureSettingsValid(nullConfiguration)).toEqual(false)
            expect(BFFLogger.error).toHaveBeenCalledWith(
                "Feature Settings has not been set up correctly, check request headers",
            )
        })
    })

    describe("When alignment is not provided", () => {
        const testConfiguration = {
            ...configuration,
            [SettingsSdkKeys.Direction]: null,
        }

        it("should return a valid api settings object", () => {
            expect(areFeatureSettingsValid(testConfiguration)).toEqual(false)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith("Feature Settings - Alignment is not provided")
        })
    })

    describe("When imageCdnUrl is not provided", () => {
        const testConfiguration = {
            ...configuration,
            [SettingsSdkKeys.imageCdnUrl]: null,
        }

        it("should return a valid api settings object", () => {
            expect(areFeatureSettingsValid(testConfiguration)).toEqual(false)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith("Feature Settings - Image CDN Url is not provided")
        })
    })

    describe("When imageCdnUrlProduct is not provided", () => {
        const testConfiguration = {
            ...configuration,
            [SettingsSdkKeys.imageCdnUrlProduct]: null,
        }

        it("should return a valid api settings object", () => {
            expect(areFeatureSettingsValid(testConfiguration)).toEqual(false)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith("Feature Settings - Product Image CDN Url is not provided")
        })
    })
})
