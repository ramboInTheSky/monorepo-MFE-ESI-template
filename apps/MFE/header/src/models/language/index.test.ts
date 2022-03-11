import {Language, ReturnLanguage, LanguageOptions} from "."

describe("Model - Autocomplete: ", () => {
    it("should match the Language", () => {
        expect(new Language()).toMatchSnapshot()
    })
    it("should match the ReturnLanguage", () => {
        expect(new ReturnLanguage()).toMatchSnapshot()
    })
    it("should match the LanguageOptions", () => {
        expect(new LanguageOptions()).toMatchSnapshot()
    })
})
