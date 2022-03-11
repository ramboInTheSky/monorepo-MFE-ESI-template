import {updateDocumentSeoMetadata} from "."

function createElement(elementString: string) {
    return document.createRange().createContextualFragment(elementString)
}

describe("Given `updateDocumentSeoMetadata()`", () => {
    const seoMetadata = {
        title: "foo",
        keywords: "bar",
        description: "baz",
        robots: "foo bar",
    }

    beforeAll(() => {
        const headElement = document.querySelector("head")!
        const titleElement = createElement(`<title>Hello world</title>`)
        const metaKeywordsElement = createElement(`<meta name="keywords" content="some,keywords" />`)
        const metaDescriptionElement = createElement(`<meta name="description" content="Some description" />`)
        const metaRobotsElement = createElement(`<meta name="robots" content="noindex, nofollow" />`)

        headElement.appendChild(titleElement)
        headElement.appendChild(metaKeywordsElement)
        headElement.appendChild(metaDescriptionElement)
        headElement.appendChild(metaRobotsElement)

        updateDocumentSeoMetadata(seoMetadata)
    })

    afterAll(() => {
        const headElement = document.querySelector("head")!
        headElement.innerHTML = ""
    })

    it("should correctly update the meta title", () => {
        const metaTitle = document.querySelector("title")!
        expect(metaTitle.innerHTML).toBe(seoMetadata.title)
    })

    it("should correctly update the meta keywords", () => {
        const metaKeywords = document.querySelector('meta[name="keywords"]')
        expect(metaKeywords).toHaveAttribute("content", seoMetadata.keywords)
    })

    it("should correctly update the meta description", () => {
        const metaDescription = document.querySelector('meta[name="description"]')
        expect(metaDescription).toHaveAttribute("content", seoMetadata.description)
    })

    it("should correctly update the meta robots", () => {
        const metaRobots = document.querySelector('meta[name="robots"]')
        expect(metaRobots).toHaveAttribute("content", seoMetadata.robots)
    })
})
