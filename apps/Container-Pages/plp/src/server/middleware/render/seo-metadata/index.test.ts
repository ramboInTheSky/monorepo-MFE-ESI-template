import OVERRIDE_SEO_METADATA from "."

describe("Given a OVERRIDE_SEO_METADATA", () => {
    it("should return the esi html", () => {
        const siteurl = "SITEURL"
        const urlPath = "/URLPATH/SHOES"
        const seoMetadata = {
            title: "TITLE",
            description: "DESCRIPTION",
            keywords: "KEYWORDS",
            robots: "ROOBOTS",
        }
        const baseUrl = "/URLPATH/SHOES"

        expect(OVERRIDE_SEO_METADATA(siteurl, urlPath, seoMetadata, baseUrl)).toMatchSnapshot()
    })

    it("should return the canonical url in lowercase", () => {
        const siteurl = "SITEURL"
        const urlPath = "/URLPATH/SHOES"
        const seoMetadata = {
            title: "TITLE",
            description: "DESCRIPTION",
            keywords: "KEYWORDS",
            robots: "ROOBOTS",
        }
        const baseUrl = "/URLPATH/SHOES"

        expect(OVERRIDE_SEO_METADATA(siteurl, urlPath, seoMetadata, baseUrl)).toContain(
            '<link rel="canonical" href="siteurl/urlpath/shoes" />',
        )
    })
})
