import {SettingsSdkKeys} from "../../config/settings"
import getTextAlignment from "."

describe("Utils: getTextAlignment() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = undefined
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getTextAlignment(configuration)).toThrowError()
        })
    })
    describe("When SDK Direction Value is undefined", () => {
        const configuration = {
            [SettingsSdkKeys.Direction]: {Value: undefined},
        }
        it("should return undefined", () => {
            expect(getTextAlignment(configuration)).toEqual(undefined)
        })
    })
    describe("When SDK Direction Value is ltr", () => {
        const configuration = {
            [SettingsSdkKeys.Direction]: {Value: "ltr"},
        }
        it("should return ltr", () => {
            expect(getTextAlignment(configuration)).toEqual("ltr")
        })
    })
    describe("When SDK Direction Value is rtl", () => {
        const configuration = {
            [SettingsSdkKeys.Direction]: {Value: "rtl"},
        }
        it("should return ltr", () => {
            expect(getTextAlignment(configuration)).toEqual("rtl")
        })
    })
})
