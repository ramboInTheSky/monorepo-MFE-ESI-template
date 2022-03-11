import {SettingsSdkKeys} from "../../config/settings"
import getEnableFavourites from "."

describe("Utils: getEnableFavourites() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getEnableFavourites(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is null", () => {
        const configuration = {
            [SettingsSdkKeys.enableFavourites]: null,
        }
        it("should throw an error", () => {
            expect(() => getEnableFavourites(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is set", () => {
        const configuration = {
            [SettingsSdkKeys.enableFavourites]: {
                Value: true,
            },
        }
        it("should return the value", () => {
            expect(getEnableFavourites(configuration)).toBe(true)
        })
    })
})
