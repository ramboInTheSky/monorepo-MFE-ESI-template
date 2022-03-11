import {SettingsSdkKeys} from "../../models/settings"
import getTerritoryDescription from "."

describe("Utils: getTerritoryDescription() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = undefined
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getTerritoryDescription(configuration)).toThrowError()
        })
    })
    describe("When SDK `territoryDescription` Value is undefined", () => {
        const configuration = {
            [SettingsSdkKeys.TerritoryDescription]: {Value: undefined},
        }
        it("should return undefined", () => {
            expect(getTerritoryDescription(configuration)).toBe(undefined)
        })
    })
    describe("When SDK `territoryDescription` Value is set", () => {
        const configuration = {
            [SettingsSdkKeys.TerritoryDescription]: {Value: "Foo"},
        }
        it("should return the value", () => {
            expect(getTerritoryDescription(configuration)).toBe("Foo")
        })
    })
})
