import redirectErrorPage from "."

describe("Util: redirectErrorPage", () => {
    it("should return a url string", () => {
        const siteUrl = "http://smoethingabv"
        expect(redirectErrorPage(siteUrl)).toEqual(`${siteUrl}/error`)
    })
})
