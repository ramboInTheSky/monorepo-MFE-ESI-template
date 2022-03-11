import {SeoMetadataProps} from "."

describe("Models: Metadata", () => {
    const mockMetadata: SeoMetadataProps = {
        seoTitle: "title",
        seoDescription: "descr",
        seoRobots: "robots",
        seoKeywords: "keywords",
        seoCanonical: "Canonical"
    }
    it("should match the SeoMetadataProps", () => {
        expect(mockMetadata).toMatchSnapshot()
    })
})
