import {SettingsSdkKeys} from "../../config/settings"
import getEnableBrandDisplay from "."

describe("Utils: getEnableBrandDisplay() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getEnableBrandDisplay(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is null", () => {
        const configuration = {
            [SettingsSdkKeys.enableBrandsDisplay]: null,
        }
        it("should throw an error", () => {
            expect(() => getEnableBrandDisplay(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is set", () => {
        const configuration = {
            [SettingsSdkKeys.enableBrandsDisplay]: {
                Value: true,
            },
        }
        it("should return the value", () => {
            expect(getEnableBrandDisplay(configuration)).toBe(true)
        })
    })
})
