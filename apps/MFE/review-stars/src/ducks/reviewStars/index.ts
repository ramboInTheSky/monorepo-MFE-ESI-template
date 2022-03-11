import {Store} from "redux"
import logger from "@monorepo/core-logger"
import {IncomingHttpHeaders} from "http"
import {getReviewStars} from "../../api/getReviewStars"
import {ReviewStarsData} from "../../models/reviewStarsApi"

export const SET_REVIEW_STARS_DATA = "SET_REVIEW_STARS_DATA"

const initialState: ReviewStarsData = {
    id: "",
    totalReviewCount: 0,
    overallStarRating: 0,
    baseUrl: "",
}

interface SetReviewStarsData {
    type: typeof SET_REVIEW_STARS_DATA
    data: ReviewStarsData
}

const setReviewStarsDataAction = (data: ReviewStarsData): SetReviewStarsData => {
    return {
        type: SET_REVIEW_STARS_DATA,
        data,
    }
}

interface UpdateReviewStarsParameters {
    headers: IncomingHttpHeaders
    itemNumber: string
}

export const updateReviewStars = async ({dispatch}: Store, {headers, itemNumber}: UpdateReviewStarsParameters) => {
    try {
        const response = await getReviewStars(headers, itemNumber)
        dispatch(setReviewStarsDataAction(response))
    } catch (error) {
        logger.error(error)
        dispatch(setReviewStarsDataAction(initialState))
    }
}

const reducer = (state: ReviewStarsData = initialState, action: SetReviewStarsData): ReviewStarsData => {
    switch (action.type) {
        case SET_REVIEW_STARS_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

export default reducer
