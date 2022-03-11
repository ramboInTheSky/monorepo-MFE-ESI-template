import {SettingsSdkKeys} from "../../models/settings"
import getDebounceTime from "."

describe("Utils: getDebounceTime() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = undefined
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getDebounceTime(configuration)).toThrowError()
        })
    })
    describe("When SDK `DebounceTime` Value is undefined", () => {
        const configuration = {
            [SettingsSdkKeys.DebounceTime]: {Value: undefined},
        }
        it("should return undefined", () => {
            expect(getDebounceTime(configuration)).toBe(undefined)
        })
    })
    describe("When SDK `DebounceTime` Value is set", () => {
        const configuration = {
            [SettingsSdkKeys.DebounceTime]: {Value: 15},
        }
        it("should return the value", () => {
            expect(getDebounceTime(configuration)).toBe(15)
        })
    })
})
