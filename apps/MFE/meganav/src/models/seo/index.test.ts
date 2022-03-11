import {SEOData, SEOItems, SecondarySEOItems} from "."

describe("Model: SEOData", () => {
    it("should match the SEOData", () => {
        expect(new SEOData()).toMatchSnapshot()
    })
    it("should match the SEOItems", () => {
        expect(new SEOItems()).toMatchSnapshot()
    })
    it("should match the SecondarySEOItems", () => {
        expect(new SecondarySEOItems()).toMatchSnapshot()
    })
})
