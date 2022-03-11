import {getBaseSiteUrl} from "."

describe("Format Cdn path", () => {
    it("Should have base site url for different territory and language than GB", () => {
        const siteUrl = "https://amido-uat22.test.ecomm.systems/it/en"
        const territory = "it"
        const language = "en"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(`https://amido-uat22.test.ecomm.systems`)
    })
    it("Should have base site url for different for MX and English language", () => {
        const siteUrl = "https://mx-uat22.test.ecomm.systems/en"
        const territory = "mx"
        const language = "en"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(`https://mx-uat22.test.ecomm.systems`)
    })
    it("Should have base direct site url for different for GB", () => {
        const siteUrl = "https://amido.co.uk"
        const territory = "gb"
        const language = "en"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(`https://amido.co.uk`)
    })
    it("Should have base site url for different for GB", () => {
        const siteUrl = "https://amido.com"
        const territory = "gb"
        const language = "en"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(`https://amido.com`)
    })
})
