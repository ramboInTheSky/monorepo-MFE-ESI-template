import configUrlPath from "."

describe("Util: configUrlPath", () => {
    const siteUrl = "http://abc.com"
    it(`should return siteurl + url ${siteUrl}/help `, () => {
        const url = "/help"
        expect(configUrlPath(url, siteUrl)).toEqual(`${siteUrl}${url}`)
    })

    it(`should return only url`, () => {
        const url = "http://dfg.com/help"
        expect(configUrlPath(url, siteUrl)).toEqual(url)
    })
    it(`should return only url when url is tel: `, () => {
        const url = "tel: 0000 0000 000"
        expect(configUrlPath(url, siteUrl)).toEqual(url)
    })
})
