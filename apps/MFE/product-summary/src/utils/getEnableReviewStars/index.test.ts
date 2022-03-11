import {SettingsSdkKeys} from "../../config/settings"
import getEnablingReviewStars from "."

describe("Utils: getEnablingReviewStars() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getEnablingReviewStars(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is null", () => {
        const configuration = {
            [SettingsSdkKeys.enableReviewStars]: null,
        }
        it("should throw an error", () => {
            expect(() => getEnablingReviewStars(configuration)).toThrowError()
        })
    })
    describe("When SDK `FeatureSwitch` is set", () => {
        const configuration = {
            [SettingsSdkKeys.enableReviewStars]: {
                Value: true,
            },
        }
        it("should return the value", () => {
            expect(getEnablingReviewStars(configuration)).toBe(true)
        })
    })
})
