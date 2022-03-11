import {SettingsSdkKeys} from "../../models/settings"
import getFetchTriggerOffset from "."

describe("Utils: getFetchTriggerOffset() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getFetchTriggerOffset(configuration)).toThrowError()
        })
    })

    describe("When SDK `FetchTriggerOffset` is null", () => {
        const configuration = {
            [SettingsSdkKeys.FetchTriggerOffset]: null,
        }
        it("should throw an error", () => {
            expect(() => getFetchTriggerOffset(configuration)).toThrowError()
        })
    })
    describe("When SDK `FetchTriggerOffset` is set", () => {
        const data = {
            inPageFiltersEnabled: {
                xs: 4,
                sm: 4,
                md: 4,
                lg: 6,
                xl: 8,
            },
            default: {
                xs: 4,
                sm: 4,
                md: 6,
                lg: 6,
                xl: 8,
            },
        }
        const configuration = {
            [SettingsSdkKeys.FetchTriggerOffset]: data,
        }
        it("should return the value", () => {
            expect(getFetchTriggerOffset(configuration)).toBe(data)
        })
    })
})
