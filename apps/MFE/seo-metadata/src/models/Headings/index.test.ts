import {SeoHeadingsProps} from "."

describe("Models: Headings", () => {
    const mockHeadings: SeoHeadingsProps = {
        seoHeading: "heading",
    }
    it("should match the SeoHeadingsProps", () => {
        expect(mockHeadings).toMatchSnapshot()
    })
})
