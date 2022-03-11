import { urlSanitiser } from "../httpUrlTrimmer"
import env from "../../config/env"

const {REACT_APP_PROD_SUMM_BASEURL} = env

const productSummaryEsiBaseUrl = (SITEURL: string, useDevEsi: boolean) =>
    REACT_APP_PROD_SUMM_BASEURL && useDevEsi ? REACT_APP_PROD_SUMM_BASEURL : SITEURL

export default function createProductSummaryEsiTag(
    itemNumber: string,
    newIn: boolean,
    siteUrl: string,
    useDevEsi: boolean,
    type: string | undefined,
) {
    const fwdSlashType = `/${type}`

    return `<esi:include src="${productSummaryEsiBaseUrl(
        urlSanitiser(siteUrl),
        useDevEsi,
    )}/product-summary${type ? fwdSlashType : ""}/${itemNumber}?show-new-in=${newIn}" onerror="continue" dca="none" />`
}
