import {SettingsSdkKeys} from "../../models/settings"
import getHideSearchFilterModalElements from "."

describe("Utils: getHideSearchFilterModalElements() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = null
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getHideSearchFilterModalElements(configuration)).toThrowError()
        })
    })
    describe("When SDK `HideSearchFilterModalElements` Value is not defined", () => {
        const configuration = {
            [SettingsSdkKeys.HideSearchFilterModalElements]: null,
        }
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getHideSearchFilterModalElements(configuration)).toThrowError()
        })
    })
    describe("When SDK `HideSearchFilterModalElements` Value is set", () => {
        const configuration = {
            [SettingsSdkKeys.HideSearchFilterModalElements]: {
                letterNav: true,
                searchBox: true,
            },
        }
        it("should return the value", () => {
            expect(getHideSearchFilterModalElements(configuration)).toEqual({
                letterNav: true,
                searchBox: true,
            })
        })
    })
})
