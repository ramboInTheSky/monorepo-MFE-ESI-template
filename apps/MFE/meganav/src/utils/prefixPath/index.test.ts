import {prefixImagePath} from "."

describe("Util: prefixPath", () => {
    describe("prefixImagePath", () => {
        describe("siteurl no territory or language", () => {
            const siteUrl = "http://test.com"
            it("should set the siteurl + /test", () => {
                const url = "/test"
                const expectedResult = `${siteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set the siteurl + /test.jpg", () => {
                const url = "/test.jpg"
                const expectedResult = `${siteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /abc/123/relative", () => {
                const url = "/abc/123/relative"
                const expectedResult = `${siteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /eeee/http/asda", () => {
                const url = "/eeee/http/asda"
                const expectedResult = `${siteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /eeee/http/asda-am-i-hello-yes", () => {
                const url = "/eeee/http/asda-am-i-hello-yes"
                const expectedResult = `${siteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /something//a.jpg", () => {
                const url = "/something//a.jpg"
                const expectedResult = `${siteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path //preview", () => {
                const url = "//preview"
                const expectedResult = `${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path http://something/a.jpg", () => {
                const url = "http://something/a.jpg"
                const expectedResult = `${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should return ''", () => {
                const url = ""
                const expectedResult = ""
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
        })

        describe("siteurl with territory", () => {
            const siteUrl = "http://test.com/gb"
            const expectedSiteUrl = "http://test.com"
            it("should set the siteurl + /test", () => {
                const url = "/test"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set the siteurl + /test.jpg", () => {
                const url = "/test.jpg"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /abc/123/relative", () => {
                const url = "/abc/123/relative"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /eeee/http/asda", () => {
                const url = "/eeee/http/asda"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /eeee/http/asda-am-i-hello-yes", () => {
                const url = "/eeee/http/asda-am-i-hello-yes"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /something//a.jpg", () => {
                const url = "/something//a.jpg"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path //preview", () => {
                const url = "//preview"
                const expectedResult = `${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path http://something/a.jpg", () => {
                const url = "http://something/a.jpg"
                const expectedResult = `${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should return ''", () => {
                const url = ""
                const expectedResult = ""
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
        })
        describe("siteurl with territory and language", () => {
            const siteUrl = "http://test.com/gb/en"
            const expectedSiteUrl = "http://test.com"
            it("should set the siteurl + /test", () => {
                const url = "/test"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set the siteurl + /test.jpg", () => {
                const url = "/test.jpg"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /abc/123/relative", () => {
                const url = "/abc/123/relative"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /eeee/http/asda", () => {
                const url = "/eeee/http/asda"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /eeee/http/asda-am-i-hello-yes", () => {
                const url = "/eeee/http/asda-am-i-hello-yes"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path /something//a.jpg", () => {
                const url = "/something//a.jpg"
                const expectedResult = `${expectedSiteUrl}${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path //preview", () => {
                const url = "//preview"
                const expectedResult = `${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should set only the path http://something/a.jpg", () => {
                const url = "http://something/a.jpg"
                const expectedResult = `${url}`
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
            it("should return ''", () => {
                const url = ""
                const expectedResult = ""
                expect(prefixImagePath(siteUrl)(url)).toEqual(expectedResult)
            })
        })
    })
})
