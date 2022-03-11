import {Country, CountryLanguage} from "."

describe("Model - Country Selector: ", () => {
    it("should match the Country", () => {
        expect(new Country()).toMatchSnapshot()
    })
    it("should match the CountryLanguage", () => {
        expect(new CountryLanguage()).toMatchSnapshot()
    })
})
