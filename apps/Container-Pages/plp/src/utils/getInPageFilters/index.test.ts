import {SettingsSdkKeys} from "../../models/settings"
import getInPageFilters from "."

describe("Utils: getInPageFilters() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getInPageFilters(configuration)).toThrowError()
        })
    })
    describe("When SDK `InPageFilters` is null", () => {
        const configuration = {
            [SettingsSdkKeys.InPageFilters]: null,
        }
        it("should throw an error when there is undefined", () => {
            expect(() => getInPageFilters(configuration)).toThrowError()
        })
    })
    describe("When SDK `InPageFilters` is set", () => {
        const data = {
            enabled: {
                breakpoint: "md",
            },
            disabled: {
                breakpoint: "lg",
            },
        }
        const configuration = {
            [SettingsSdkKeys.InPageFilters]: data,
        }
        it("should return the value", () => {
            expect(getInPageFilters(configuration)).toBe(data)
        })
    })
})
