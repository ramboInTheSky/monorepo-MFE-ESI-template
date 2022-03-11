import noTranslationText from "."

describe("Util - noTranslationText,: ", () => {
    it("should match the snapshot template", () => {
        expect(noTranslationText("en")).toMatchSnapshot()
    })
})
