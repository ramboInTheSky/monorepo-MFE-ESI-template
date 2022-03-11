import {Router} from "express"

import {getSettingsHeadersAsObject} from "@monorepo/utils"

import axios from "../../core/xhr"
import BFFLogger from "../../core/BFFLogger"
import SeoMetaDataApi from "../../../config/api"
import {SEO_METADATA_TEMPLATE} from "../../../templates"

import fallbackSeo from "../../render/fallbackSEO"

import SetLastModifiedResponseHeader from "../../last-modified"
import SetCacheTagsResponseHeader from "../../cache-tag"

const seoMetadata = SeoMetaDataApi("getSeoMetadata")

export const getMetadataTemplate = async (req: any, res: any) => {
    try {
        const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
        const apiResponse = await axios({
            method: seoMetadata.method,
            url: seoMetadata.url(apiUrlSettings)(req.query.urlPath),
        })
        const {data, headers} = apiResponse

        if (!data) {
            return fallbackSeo(res)
        }

        const metadataTemplate = SEO_METADATA_TEMPLATE(apiResponse.data)

        SetLastModifiedResponseHeader(res, headers)
        SetCacheTagsResponseHeader(res, headers)

        res.set({
            "x-monorepo-override-seo": "true",
            "Content-Length": Buffer.byteLength(metadataTemplate),
            "Content-Type": "text/html",
        })
        res.send(metadataTemplate)
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).end()
    }
}

export default (router: Router) => {
    router.get(seoMetadata.routeDefinition, getMetadataTemplate)
}
