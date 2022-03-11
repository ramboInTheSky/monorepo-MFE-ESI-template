import {SettingsSdkKeys} from "../../models/settings"
import getFeatureSwitch from "."

describe("Utils: getFeatureSwitch() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getFeatureSwitch(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is null", () => {
        const configuration = {
            [SettingsSdkKeys.FeatureSwitch]: null,
        }
        it("should throw an error", () => {
            expect(() => getFeatureSwitch(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is set", () => {
        const data = {
            enablePageInFilters: false,
            enableSearchBanners: false,
        }
        const configuration = {
            [SettingsSdkKeys.FeatureSwitch]: data,
        }
        it("should return the value", () => {
            expect(getFeatureSwitch(configuration)).toBe(data)
        })
    })
})
