import React from "react"
import {IS_BROWSER} from "../../utils/window"
import {SEOLinkComponent} from "./components"

export interface SeoLinkProps {
    url: string
    hasNextPage?: boolean
    title: string
}

export const buildUrl = ({url, hasNextPage}) => {
    const pageRegex = /(p=.*)+/g
    const pageFragment = url.match(pageRegex)?.[0] || ""
    let returnUrl = ""
    const page = parseInt(pageFragment.split("=")[1], 10)
    // going forward
    if (hasNextPage) {
        if (Number.isNaN(page)) {
            returnUrl = url.concat(`${url.includes("?") ? "&" : "?"}p=2`)
        } else {
            returnUrl = url.replace(pageRegex, `p=${page + 1}`)
        }
        // going backwards
    } else if (Number.isNaN(page) || page === 1) {
        return null
    } else {
        const prevPage = page - 1
        returnUrl = url.replace(pageRegex, prevPage === 1 ? "" : `p=${prevPage}`)
        // strip trailing ? and &
        returnUrl = returnUrl.replace(/\?$/, "")
        returnUrl = returnUrl.replace(/&$/, "")
    }

    return returnUrl
}

export const SeoLink = ({url, hasNextPage = false, title}: SeoLinkProps) => {
    if (IS_BROWSER()) return <></>

    const returnUrl = buildUrl({url, hasNextPage})
    if (!returnUrl) return <></>

    return (
        <noscript>
            <SEOLinkComponent href={returnUrl}>{title}</SEOLinkComponent>
        </noscript>
    )
}
