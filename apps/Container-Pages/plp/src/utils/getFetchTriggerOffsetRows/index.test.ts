import {SettingsSdkKeys} from "../../models/settings"
import getFetchTriggerOffsetRows from "."

describe("Utils: getFetchTriggerOffsetRows() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getFetchTriggerOffsetRows(configuration)).toThrowError()
        })
    })

    describe("When SDK `FetchTriggerOffsetRows` is null", () => {
        const configuration = {
            [SettingsSdkKeys.FetchTriggerOffsetRows]: null,
        }
        it("should throw an error", () => {
            expect(() => getFetchTriggerOffsetRows(configuration)).toThrowError()
        })
    })
    describe("When SDK `FetchTriggerOffsetRows` is set", () => {
        const data = {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 2,
            xl: 2,
        }
        const configuration = {
            [SettingsSdkKeys.FetchTriggerOffsetRows]: data,
        }
        it("should return the value", () => {
            expect(getFetchTriggerOffsetRows(configuration)).toBe(data)
        })
    })
})
