import {SeoMetadata} from "../types"

export function updateDocumentSeoMetadata(seoMetadata: SeoMetadata) {
    const metaTitle = document.querySelector("title")!
    const metaKeywords = document.querySelector('meta[name="keywords"]')!
    const metaDescription = document.querySelector('meta[name="description"]')!
    const metaRobots = document.querySelector('meta[name="robots"]')!

    metaTitle.innerHTML = seoMetadata.title
    metaKeywords.setAttribute("content", seoMetadata.keywords)
    metaDescription.setAttribute("content", seoMetadata.description)
    metaRobots.setAttribute("content", seoMetadata.robots)
}
