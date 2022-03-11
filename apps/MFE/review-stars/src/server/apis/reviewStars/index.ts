/* eslint-disable import/no-extraneous-dependencies */
import {Router} from "express"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import BFFLogger from "../../core/BFFLogger"
import Api from "../../../config/api/reviewStarsApi"
import axios from "../../core/xhr"

export const getReviewStars = Api("getReviewStars")

export const getReviewStarsHandler = async (req: any, res: any) => {
    try {
        const apiUrlSettings = getSettingsHeadersAsObject(req.headers)
        const response = await axios[getReviewStars.method](getReviewStars.url(apiUrlSettings)(req.params.itemNumber))
        res.send(response.data)
    } catch (err) {
        BFFLogger.error(err)
        res.status(500).end()
    }
}

export default (router: Router) => {
    router.get(getReviewStars.routeDefinition, getReviewStarsHandler)
}
