import logger from "@monorepo/core-logger"
import {Store} from "redux"
import {FooterModel} from "../../models/footerModel"
import {getFooterData} from "../../api/footerdata"

export const SET_FOOTER_DATA = "SET_FOOTER_DATA"

interface SetFooterData {
    type: typeof SET_FOOTER_DATA
    data: FooterModel
}

export type FooterDuckState = FooterModel | null

const initialState: FooterDuckState = null

const setFooterDataAction = (data: FooterModel) => {
    return {
        type: SET_FOOTER_DATA,
        data,
    }
}

export const getFooterDataThunk = async ({dispatch, getState}: Store) => {
    try {
        const {request} = getState()
        const response = await getFooterData(request.headers!)
        dispatch(setFooterDataAction(response))
    } catch (error) {
        logger.error(error)
        dispatch(setFooterDataAction(new FooterModel()))
    }
}

const reducer = (state: FooterDuckState = initialState, action: SetFooterData): FooterDuckState => {
    const {data} = action

    switch (action.type) {
        case SET_FOOTER_DATA:
            return {
                ...state,
                ...data,
            }
        default:
            return state
    }
}

export default reducer
