import {generateSeoMetaTagsHtml} from "."

describe("Given `generateSeoMetaTagsHtml`", () => {
    it("should correctly generate the seo meta tags as a html string", () => {
        const seoMetadata = {
            title: "foo",
            keywords: "bar",
            description: "baz",
            robots: "foo bar",
        }
        const siteUrl = "https://amido.com"
        const urlPath = "/shop/gender-Women-productaffiliation-coatsandjackets-0"
        const result = generateSeoMetaTagsHtml(seoMetadata, siteUrl, urlPath)

        expect(result).toContain("<title>foo</title>")
        expect(result).toContain('<meta name="keywords" content="bar" />')
        expect(result).toContain('<meta name="description" content="baz" />')
        expect(result).toContain('<meta name="robots" content="foo bar" />')
        expect(result).toContain(
            '<link rel="canonical" href="https://amido.com/shop/gender-women-productaffiliation-coatsandjackets-0" />',
        )
    })
})
