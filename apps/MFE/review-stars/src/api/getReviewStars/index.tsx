import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import axios from "../../utils/axios"

import {ReviewStarsData} from "../../models/reviewStarsApi"
import ReviewStarsApi from "../../config/api/reviewStarsApi"

// this will always be called server-side on first render and subsequent server-side renders
export const getReviewStars = async (
    headers: IncomingHttpHeaders,
    itemNumber: string | number,
): Promise<ReviewStarsData> => {
    try {
        const getReviewStarsDataApi = ReviewStarsApi("getReviewStars")
        const response = await axios({
            method: getReviewStarsDataApi.method,
            url: `${getReviewStarsDataApi.localEndpoint(itemNumber)}`,
            headers,
        })

        return response.data
    } catch (ex) {
        logger.error(ex)
        throw ex
    }
}
