import {Router} from "express"
import {getSettingsHeadersAsObject} from "@monorepo/utils"

import axios from "../../core/xhr"
import BFFLogger from "../../core/BFFLogger"
import SeoHeadingsApi from "../../../config/api"

import {SEO_HEADING_TEMPLATE} from "../../../templates"

import fallbackSeo from "../../render/fallbackSEO"

import SetLastModifiedResponseHeader from "../../last-modified"
import SetCacheTagsResponseHeader from "../../cache-tag"

const seoHeadings = SeoHeadingsApi("getSeoHeadings")

export const getHeadingTemplate = async (req: any, res: any) => {
    try {
        const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
        const apiResponse = await axios({
            method: seoHeadings.method,
            url: seoHeadings.url(apiUrlSettings)(req.query.urlPath),
        })

        const {data, headers} = apiResponse

        if (!data) {
            return fallbackSeo(res)
        }

        const headingsTemplate = SEO_HEADING_TEMPLATE(apiResponse.data)
        SetLastModifiedResponseHeader(res, headers)
        SetCacheTagsResponseHeader(res, headers)
        res.set({
            "x-monorepo-override-seo": "true",
            "Content-Length": Buffer.byteLength(headingsTemplate),
            "Content-Type": "text/html",
        })
        res.send(headingsTemplate)
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).end()
    }
}

export default (router: Router) => {
    router.get(seoHeadings.routeDefinition, getHeadingTemplate)
}
