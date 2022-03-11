/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import {SettingsSdkKeys} from "../../../models/settings"
import areFeatureSettingsValid from "."

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("@monorepo/themes", () => ({
    isThemeValid: jest.fn(theme => {
        return !theme.isNotValid
    }),
}))

describe("Utils: validateFeatureSettings - ", () => {
    describe("When Settings SDK gives valid data", () => {
        const configuration = {
            [SettingsSdkKeys.Direction]: {Value: "ltr"},
        }

        it("should return a valid api settings object", () => {
            expect(areFeatureSettingsValid(configuration)).toEqual(true)
        })
    })

    describe("When settings are not provided", () => {
        const configuration = null

        it("should return a valid api settings object", () => {
            expect(areFeatureSettingsValid(configuration)).toEqual(false)
            expect(logger.error).toHaveBeenCalledWith(
                "Feature Settings has not been set up correctly, check request headers",
            )
        })
    })

    describe("When alignment is not provided", () => {
        const configuration = {
            [SettingsSdkKeys.Direction]: null,
        }

        it("should return a valid api settings object", () => {
            expect(areFeatureSettingsValid(configuration)).toEqual(false)
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith("Feature Settings - Alignment is not provided")
        })
    })
})
