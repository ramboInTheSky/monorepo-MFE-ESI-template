import {urlSanitiser} from "../../../../utils/httpUrlTrimmer"
import {SeoMetadata} from "../../../../utils/seo/types"

const OVERRIDE_SEO_METADATA = (SITEURL: string, urlPath: string, seoMetadata: SeoMetadata, baseUrl: string) => {
    const sanitisedPath = urlSanitiser(urlPath)
    const canonicalUrl = (SITEURL + baseUrl).toLowerCase()
    return `
    <esi:try>
      <esi:attempt> 
        <esi:include src="${SITEURL}/seo/seo-metadata?urlPath=${sanitisedPath}" alt="${SITEURL}/seo/seo-metadata?urlPath=${sanitisedPath}" dca="none"/>
      </esi:attempt> 
      <esi:except> 
        <title>${seoMetadata?.title}</title>
        <meta name="description" content="${seoMetadata?.description}"/>
        <meta name="keywords" content="${seoMetadata?.keywords}"/>
        <meta name="robots" content="${seoMetadata?.robots}"/>
        <link rel="canonical" href="${canonicalUrl}" />
      </esi:except>
    </esi:try>
    `
}

export default OVERRIDE_SEO_METADATA
