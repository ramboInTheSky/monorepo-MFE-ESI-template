import {SettingsSdkKeys} from "../../config/settings"
import getImageCdnUrl from "."

describe("Utils: getImageCdnUrl() - ", () => {
    describe("When Settings SDK has no data", () => {
        const configuration = undefined
        it("should throw an error when settings SDK had missing data", () => {
            expect(() => getImageCdnUrl(configuration)).toThrowError()
        })
    })
    describe("When SDK imageCdnUrl Value is http://imagecdn.url/", () => {
        const configuration = {
            [SettingsSdkKeys.imageCdnUrl]: {Value: "http://imagecdn.url/"},
            [SettingsSdkKeys.imageCdnUrlProduct]: {Value: "/search/"},
        }
        it("should return http://imagecdn.url/", () => {
            expect(getImageCdnUrl(configuration)).toEqual({
                rootUrl: "http://imagecdn.url",
                productUrlPart: "search",
            })
        })
    })
})
