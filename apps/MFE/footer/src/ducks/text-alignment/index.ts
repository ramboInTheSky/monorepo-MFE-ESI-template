import Logger from "@monorepo/core-logger"
import {Store} from "redux"
import getTextAlignment from "../../utils/getTextAlignment"

export const SET_TEXT_ALIGNMENT = "SET_TEXT_ALIGNMENT"

interface SetTextAlignmentAction {
    type: typeof SET_TEXT_ALIGNMENT
    textAlignment: string
}

export const initialState = ""

export const setTextAlignment = (textAlignment: string): SetTextAlignmentAction => ({
    type: SET_TEXT_ALIGNMENT,
    textAlignment,
})

const reducer = (state: string = initialState, action: SetTextAlignmentAction): string => {
    switch (action.type) {
        case SET_TEXT_ALIGNMENT:
            return action.textAlignment
        default:
            return state
    }
}

export const updateTextAlignment = (store: Store, configuration: any) => {
    try {
        const direction = getTextAlignment(configuration)
        store.dispatch(setTextAlignment(direction))
    } catch (err) {
        Logger.error(new Error(err))
        Logger.info("alignment set to LTR")
        store.dispatch(setTextAlignment("ltr"))
    }
}

export default reducer
