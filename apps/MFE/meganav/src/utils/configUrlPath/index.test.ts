import {configRelativePathURL} from "."

describe("Util: configRelativePathURL", () => {
    it(`should add language and territory to a relative url when they exist`, () => {
        const url = "/shop/my-category-page"
        const siteUrl = "http://amido.com/en/gb"
        const ret = "/en/gb/shop/my-category-page"
        expect(configRelativePathURL(url, siteUrl)).toEqual(ret)
    })

    it(`should not add language and territory to a relative url when they don't exist`, () => {
        const url = "/shop/my-category-page"
        const siteUrl = "http://amido.com"
        const ret = "/shop/my-category-page"
        expect(configRelativePathURL(url, siteUrl)).toEqual(ret)
    })

    it(`should not add language and territory to a relative url when it's an absolute path`, () => {
        const url = "http://amido/my-category-page"
        const siteUrl = "http://amido.com"
        expect(configRelativePathURL(url, siteUrl)).toEqual(url)
    })

    it(`should not add language and territory to a relative url when it's an absolute path without protocol`, () => {
        const url = "//amido/my-category-page"
        const siteUrl = "http://amido.com"
        expect(configRelativePathURL(url, siteUrl)).toEqual(url)
    })

    it(`should return only url when url is tel: `, () => {
        const url = "tel: 0000 0000 000"
        const siteUrl = "http://amido.com"
        expect(configRelativePathURL(url, siteUrl)).toEqual(url)
    })
})
