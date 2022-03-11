import {SettingsSdkKeys} from "../../models/settings"
import getBloomreachPersonalizationCookieConfigStatus from "."

describe("Utils: getBloomreachPersonalizationCookieConfigStatus() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = undefined
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getBloomreachPersonalizationCookieConfigStatus(configuration)).toThrowError()
        })
    })
    describe("When SDK `territoryDescription` Value is undefined", () => {
        const configuration = {
            [SettingsSdkKeys.BloomreachPersonalizationCookies]: {bloomreachPersonalizationEnabled: undefined},
        }
        it("should return undefined", () => {
            expect(getBloomreachPersonalizationCookieConfigStatus(configuration)).toBe(undefined)
        })
    })
    describe("When SDK `territoryDescription` Value is set", () => {
        const configuration = {
          [SettingsSdkKeys.BloomreachPersonalizationCookies]: {bloomreachPersonalizationEnabled: true},
        }
        it("should return the value", () => {
            expect(getBloomreachPersonalizationCookieConfigStatus(configuration)).toBe(true)
        })
    })
})
