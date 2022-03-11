import { urlSanitiser } from "../httpUrlTrimmer"
import env from "../../config/env"

const {REACT_APP_APP_URL} = env

const headingEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    REACT_APP_APP_URL && useDevEsi ? REACT_APP_APP_URL : SITEURL

export default function createHeadingEsiTag(
    siteUrl: string,
    useDevEsi: boolean,
    url: string,
    totalResults: number,
    title: string,
) {
    const sanitisedUrl = urlSanitiser(url)
    const encodedUrl = encodeURIComponent(sanitisedUrl.replace(siteUrl, ""))

    const esiInclude = `<esi:include src="${headingEsiBaseUrl(
        urlSanitiser(siteUrl),
        useDevEsi,
    )}/seo/seo-headings?urlPath=${encodedUrl}"/>`

    const esiWrapper = `<esi:try>
        <esi:attempt> 
            ${esiInclude}
        </esi:attempt> 
        <esi:except> 
            <h1>${totalResults}&nbsp;${title}</h1>
        </esi:except>
    </esi:try>`

    return esiWrapper
}
