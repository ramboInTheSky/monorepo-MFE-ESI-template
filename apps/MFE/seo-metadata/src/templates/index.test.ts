import {SEO_HEADING_TEMPLATE, SEO_METADATA_TEMPLATE} from "."

describe("Templates", () => {
    it("should return the HTML for SEO_HEADING_TEMPLATE", () => {
        const data = {
            seoHeading: "EXAMPLE_heading",
        }
        expect(SEO_HEADING_TEMPLATE(data)).toMatchSnapshot()
    })
    it("should return the HTML for SEO_METADATA_TEMPLATE", () => {
        const data = {
            seoTitle: "EXAMPLE_heading",
            seoDescription: "EXAMPLE_description",
            seoKeywords: "EXAMPLE_keywords",
            seoRobots: "EXAMPLE_robots",
            seoCanonical: "EXAMPLE_canonical"
        }
        expect(SEO_METADATA_TEMPLATE(data)).toMatchSnapshot()
    })
})
