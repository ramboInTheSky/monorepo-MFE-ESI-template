import {SeoMetadata} from "../types"

export function generateSeoMetaTagsHtml(seoMetadata: SeoMetadata, SITEURL: string, baseUrl: string) {
    const canonicalUrl = (SITEURL + baseUrl).toLowerCase()
    return `
        <title>${seoMetadata?.title}</title>
        <meta name="keywords" content="${seoMetadata?.keywords}" />
        <meta name="description" content="${seoMetadata?.description}" />
        <meta name="robots" content="${seoMetadata?.robots}" />
        <link rel="canonical" href="${canonicalUrl}" />
    `
}
