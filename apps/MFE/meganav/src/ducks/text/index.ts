import logger from "@monorepo/core-logger"
import {Store} from "redux"
import {TextModel} from "../../models/text"

export const SET_TEXT = "SET_TEXT"

interface SetTextAction {
    type: typeof SET_TEXT
    data: TextModel
}

export type TextDuckState = TextModel
const initialState: TextDuckState = {} as TextModel

const SetTextAction = (data: TextDuckState) => {
    return {
        type: SET_TEXT,
        data,
    }
}

export const updateText = (store: Store, text: TextModel) => {
    try {
        if (text) return store.dispatch(SetTextAction(text))
        logger.error("Text object not defined")
        store.dispatch(SetTextAction(initialState))
    } catch (err) {
        logger.error(new Error(err))
        store.dispatch(SetTextAction(initialState))
    }
}

const reducer = (state: TextDuckState = initialState, action: SetTextAction): TextDuckState => {
    switch (action.type) {
        case SET_TEXT:
            return action.data
        default:
            return state
    }
}

export default reducer
