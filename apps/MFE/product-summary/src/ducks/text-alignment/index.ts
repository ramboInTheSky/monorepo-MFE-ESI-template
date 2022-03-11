import {Store} from "redux"
import {createSelector} from "reselect"
import getTextAlignment from "../../utils/getTextAlignment"
import { LTR } from "../../config/constants"

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

export function selectTextAlignment(state: {textAlignment: string}) {
    return state.textAlignment
}

export const selectIsLeftToRight = createSelector(selectTextAlignment, alignment => alignment === LTR)

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
        store.dispatch(setTextAlignment("ltr"))
    }
}

export default reducer
