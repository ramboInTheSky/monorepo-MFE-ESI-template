/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {getSettingsHeaders, getSettingsHeadersAsObject} from "@monorepo/utils"
import {CORSMiddleware} from "@monorepo/middlewares"
import BFFLogger from "../../core/BFFLogger"
import MegaNavApiConfig from "../../../config/api/appdata"
import {SEOData} from "../../../models/seo"
import {configRelativePathURL} from "../../../utils/configUrlPath"
import axios from "../../core/xhr"

export const getSecondaryNavData = MegaNavApiConfig("getSeoData")

export const getSquarePixelHTML = (json: SEOData, siteUrl: string) => {
    const getMainSection = ({title, items}) => {
        return `<section><h4 data-category-name="${title}">${title}</h4><ul>${items
            .map(item => getListItem(item))
            .join("")}</ul></section>`
    }

    const getListItem = ({title, target}) => {
        const sanitisedTarget = target?.replace(/-0/g, "")
        return `<li><a href="${configRelativePathURL(sanitisedTarget, siteUrl)}">${title}</a></li>`
    }

    let HTMLResponse = ""
    if (json.items.length) {
        HTMLResponse = `<noscript id="embeddedDeptMenuContent"><nav>`
        json.items.forEach(item => {
            HTMLResponse += getMainSection(item)
        })
        HTMLResponse += "</nav></noscript>"
    }

    return HTMLResponse
}

export const getSEOContentHandler = async (req: any, res: any) => {
    const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
    const headers = getSettingsHeaders(req.headers)

    const {
        params: {page, department},
        siteUrl,
    } = req

    try {
        let filteredDep = ""
        if (department) {
            const index = department.indexOf("/")
            filteredDep = index > 0 ? department.substring(0, index - 1) : department
        }
        const response = await (axios as any)[getSecondaryNavData.method](
            getSecondaryNavData.url(apiUrlSettings)(page, filteredDep),
            {
                headers,
                params: req.query,
            },
        )
        const {data} = response
        res.send(getSquarePixelHTML(data, siteUrl.url))
    } catch (err) {
        BFFLogger.error(err)
        res.send(null).end()
    }
}

export default (router: Router) => {
    router.options(getSecondaryNavData.routeDefinition, CORSMiddleware)
    router.get(getSecondaryNavData.routeDefinition, CORSMiddleware, getSEOContentHandler)
}
