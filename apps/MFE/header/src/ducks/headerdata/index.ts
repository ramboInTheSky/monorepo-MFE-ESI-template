import logger from "@monorepo/core-logger"
import {Store} from "redux"
import {HeaderModel} from "../../models/headerModel"
import {getHeaderData} from "../../api/headerdata"

export const SET_HEADER_DATA = "SET_HEADER_DATA"

interface SetHeaderData {
    type: typeof SET_HEADER_DATA
    data: HeaderModel
}

export type HeaderDuckState = HeaderModel | null

const initialState: HeaderDuckState = null

const setHeaderDataAction = (data: HeaderModel) => {
    return {
        type: SET_HEADER_DATA,
        data,
    }
}

export const getHeaderDataThunk = async ({dispatch, getState}: Store, defaultHeaderVersion: string) => {
    try {
        const {request} = getState()
        const response = await getHeaderData(request.headers!, defaultHeaderVersion)

        dispatch(setHeaderDataAction(response))
    } catch (error) {
        logger.error(error)
        dispatch(setHeaderDataAction(new HeaderModel()))
    }
}

const reducer = (state: HeaderDuckState = initialState, action: SetHeaderData): HeaderDuckState => {
    const {data} = action

    switch (action.type) {
        case SET_HEADER_DATA:
            return {
                ...state,
                ...data,
            }
        default:
            return state
    }
}

export default reducer
