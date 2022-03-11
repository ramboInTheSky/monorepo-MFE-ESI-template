import {SeoHeadingsProps} from "../models/Headings"
import {SeoMetadataProps} from "../models/Metadata"

const SEO_HEADING_TEMPLATE = ({seoHeading}: SeoHeadingsProps) => `<h1>${seoHeading}</h1>`
const SEO_METADATA_TEMPLATE = ({seoTitle, seoDescription, seoKeywords, seoRobots, seoCanonical}: SeoMetadataProps) =>
    `
<title>${seoTitle}</title>
<meta name="description" content="${seoDescription}"/>
<meta name="keywords" content="${seoKeywords}"/>
<meta name="robots" content="${seoRobots}"/>
<link rel="canonical" href="${seoCanonical}"/>
`

export {SEO_HEADING_TEMPLATE, SEO_METADATA_TEMPLATE}
