import {SettingsSdkKeys} from "../../models/settings"
import {getItemsPerRowConfig} from "."

describe("Utils: getItemsPerPage() - ", () => {
    describe("getItemsPerRowConfig() - ", () => {
        describe("When Settings SDK has no data", () => {
            const configuration = undefined
            it("should throw an error when settings SDK had missing data", () => {
                expect(() => getItemsPerRowConfig(configuration)).toThrowError()
            })
        })
        describe("When SDK `RowsPerPage` is undefined", () => {
            const configuration = {
                [SettingsSdkKeys.ItemsPerRow]: undefined,
            }
            it("should return undefined", () => {
                expect(getItemsPerRowConfig(configuration)).toBe(undefined)
            })
        })
        describe("When SDK `ItemsPerRow` is set", () => {
            const data = {
                subsequent: {
                    xs: 4,
                    sm: 5,
                    md: 4,
                    lg: 6,
                    xl: 8,
                },
            }
            const configuration = {
                [SettingsSdkKeys.ItemsPerRow]: data,
            }
            it("should return the value", () => {
                expect(getItemsPerRowConfig(configuration)).toBe(data)
            })
        })
    })
})
