import logger from "@monorepo/core-logger"
import getSwitchLanguageUrl from "."

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

describe("getSwitchLanguageUrl: ", () => {
    it("should determine the correct country redirect url with no suffix in site url", () => {
        const siteUrl = "http://amido.com"
        const altLanguage = "/ar"
        expect(getSwitchLanguageUrl(siteUrl, altLanguage)).toEqual("http://amido.com")
    })
    it("should determine an empty url with no site url", () => {
        const siteUrl = ""
        const altLanguage = "/ar"
        expect(getSwitchLanguageUrl(siteUrl, altLanguage)).toEqual("/ar")
    })
    it("should determine the correct country redirect url with language suffix in site url", () => {
        const siteUrl = "http://amido.com/en"
        const altLanguage = "/ar"
        expect(getSwitchLanguageUrl(siteUrl, altLanguage)).toEqual("http://amido.com/ar")
    })
    it("should determine the correct country redirect url with country and langauge suffix in site url", () => {
        const siteUrl = "http://amido.com/sa/en"
        const altLanguage = "/ar"
        expect(getSwitchLanguageUrl(siteUrl, altLanguage)).toEqual("http://amido.com/sa/ar")
    })
    it("should return /ar when siteUrl is without and calls logger.error", () => {
        const siteUrl = "abc123"
        const altLanguage = "/ar"
        expect(getSwitchLanguageUrl(siteUrl, altLanguage)).toEqual("/ar")
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(logger.error).toHaveBeenCalled()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(logger.error).toHaveBeenCalledWith("Language Selector Quick link: No site Url site or not valid siteurl")
    })
})
