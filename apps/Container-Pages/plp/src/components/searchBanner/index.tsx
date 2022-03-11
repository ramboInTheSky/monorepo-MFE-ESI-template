/* eslint-disable react/no-danger */
import React, {useEffect} from "react"
import { TextModel } from "models/Text"
import {IS_BROWSER} from "../../utils/window"
import connect from "./connect"
import {setupReadMore} from "./readmore"
import createSearchBannerEsiTag from "../../utils/createSearchBannerEsiTag"
import {SearchApiRequestTypes, SEARCH_BANNER_INCLUDE_COMPONENTS} from "../../config/constants"

const getExistingHtml = (selector: string) => {
    const element = document.getElementById(selector)
    return element ? element.innerHTML : ""
}

interface SearchBannerProps {
    siteUrl: string
    url: string
    useDevEsi: boolean
    html: string | null
    requestType: SearchApiRequestTypes
    includedComponents: string[]
    enableSearchBanners: boolean
    text: TextModel
}

export const SearchBanner = ({
    siteUrl,
    url,
    useDevEsi,
    html,
    requestType,
    includedComponents,
    enableSearchBanners,
    text
}: SearchBannerProps) => {
    useEffect(() => {
        setupReadMore(text)
    }, [html, text])
    if (!enableSearchBanners) {
        return null
    }

    if (!IS_BROWSER()) {
        let esiHtml = ""
        if (includedComponents.includes(SEARCH_BANNER_INCLUDE_COMPONENTS)) {
            esiHtml = createSearchBannerEsiTag(siteUrl, useDevEsi, url, requestType)
        }
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: esiHtml,
                }}
                id="plp-search-banner-entrypoint"
            />
        )
    }

    if (html) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: html,
                }}
                id="plp-search-banner-entrypoint"
            />
        )
    }

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: getExistingHtml("plp-search-banner-entrypoint"),
            }}
            id="plp-search-banner-entrypoint"
        />
    )
}

export default connect(SearchBanner)
