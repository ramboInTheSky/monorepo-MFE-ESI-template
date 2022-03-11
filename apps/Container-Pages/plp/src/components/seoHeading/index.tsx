/* eslint-disable react/no-danger */
import React, {useMemo, useRef, useState} from "react"
import {IS_BROWSER} from "../../utils/window"
import connect from "./connect"
import createHeadingEsiTag from "../../utils/createHeadingEsiTag"

const getExistingHtml = (selector: string) => {
    const element = document.getElementById(selector)
    return element ? element.innerHTML : ""
}

interface SeoHeadingProps {
    siteUrl: string
    url: string
    useDevEsi: boolean
    totalResults: number
    title: string
}

export const SeoHeading = ({siteUrl, url, useDevEsi, totalResults, title}: SeoHeadingProps) => {
    const oldUrl = useRef(url)
    const [html, setUpdateHTML] = useState(false)
    useMemo(() => {
        if (oldUrl.current !== url) {
            setUpdateHTML(true)
        }
    }, [url])

    if (!IS_BROWSER()) {
        const esiHeadingHtml = createHeadingEsiTag(siteUrl, useDevEsi, url, totalResults, title)
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: esiHeadingHtml,
                }}
                id="plp-seo-heading"
            />
        )
    }

    if (html) {
        const esiHeadingHtml = createHeadingEsiTag(siteUrl, useDevEsi, url, totalResults, title)
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: esiHeadingHtml,
                }}
                id="plp-seo-heading"
            />
        )
    }
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: getExistingHtml("plp-seo-heading"),
            }}
            id="plp-seo-heading"
        />
    )
}

export default connect(SeoHeading)
