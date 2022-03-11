import {getBaseSiteUrl} from "."

describe("Format Cdn path", () => {
    it("Should have base site url for different territory and language than GB", () => {
        const siteUrl = "https://amidodirect-uat22.test.ecomm.systems/it/en"
        const territory = "it"
        const language = "en"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(
            `https://amidodirect-uat22.test.ecomm.systems`,
        )
    })
    it("Should have base site url for different for MX and English language", () => {
        const siteUrl = "https://mx-uat22.test.ecomm.systems/en"
        const territory = "mx"
        const language = "en"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(`https://mx-uat22.test.ecomm.systems`)
    })
    it("Should have base site url for different for ru and Russian language", () => {
        const siteUrl = "https://ruconv.amido.com/ru"
        const territory = "ru"
        const language = "ru"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(`https://ruconv.amido.com`)
    })
    it("Should have base amido direct site url for different for GB", () => {
        const siteUrl = "https://amidodirect.co.uk"
        const territory = "gb"
        const language = "en"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(`https://amidodirect.co.uk`)
    })
    it("Should have base next site url for different for GB", () => {
        const siteUrl = "https://amido.com"
        const territory = "gb"
        const language = "en"
        expect(getBaseSiteUrl(siteUrl, territory, language)).toEqual(`https://amido.com`)
    })
})
