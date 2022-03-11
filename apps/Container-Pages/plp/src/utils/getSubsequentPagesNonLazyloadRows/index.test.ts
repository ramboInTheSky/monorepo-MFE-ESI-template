import {SettingsSdkKeys} from "../../models/settings"
import getSubsequentPagesNonLazyloadRows from "."

describe("Utils: getItemsPerPage() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = undefined
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getSubsequentPagesNonLazyloadRows(configuration)).toThrowError()
        })
    })
    describe("When SDK `RowsPerPage` is undefined", () => {
        const configuration = {
            [SettingsSdkKeys.SubsequentPagesNonLazyloadRows]: undefined,
        }
        it("should return undefined", () => {
            expect(getSubsequentPagesNonLazyloadRows(configuration)).toBe(undefined)
        })
    })
    describe("When SDK `ItemsPerRow` is set", () => {
        const data = {
            xs: 4,
            sm: 5,
            md: 4,
            lg: 6,
            xl: 8,
        }
        const configuration = {
            [SettingsSdkKeys.SubsequentPagesNonLazyloadRows]: data,
        }
        it("should return the value", () => {
            expect(getSubsequentPagesNonLazyloadRows(configuration)).toBe(data)
        })
    })
})
