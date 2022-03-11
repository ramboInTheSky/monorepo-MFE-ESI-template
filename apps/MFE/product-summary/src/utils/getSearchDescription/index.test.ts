import {SettingsSdkKeys} from "../../config/settings"
import getEnableSearchDescription from "."

describe("Utils: getEnableSearchDescription() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getEnableSearchDescription(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is null", () => {
        const configuration = {
            [SettingsSdkKeys.enableSearchDescription]: null,
        }
        it("should throw an error", () => {
            expect(() => getEnableSearchDescription(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is set", () => {
        const configuration = {
            [SettingsSdkKeys.enableSearchDescription]: {
                Value: true,
            },
        }
        it("should return the value", () => {
            expect(getEnableSearchDescription(configuration)).toBe(true)
        })
    })
})
