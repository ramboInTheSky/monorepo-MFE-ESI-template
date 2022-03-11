import {Store} from "redux"
import getTextAlignment from "../../utils/getTextAlignment"
import TextAlignment from "../../models/textAlignment"

export const SET_TEXT_ALIGNMENT = "SET_TEXT_ALIGNMENT"

interface SetTextAlignmentAction {
    type: typeof SET_TEXT_ALIGNMENT
    textAlignment: TextAlignment
}

export const initialState = TextAlignment.Ltr

export const setTextAlignment = (textAlignment: TextAlignment): SetTextAlignmentAction => ({
    type: SET_TEXT_ALIGNMENT,
    textAlignment,
})

const reducer = (state: TextAlignment = initialState, action: SetTextAlignmentAction): TextAlignment => {
    switch (action.type) {
        case SET_TEXT_ALIGNMENT:
            return action.textAlignment
        default:
            return state
    }
}

export const updateTextAlignment = (store: Store, configuration: any): TextAlignment => {
    try {
        const direction = getTextAlignment(configuration)
        store.dispatch(setTextAlignment(direction))
        return direction
    } catch (err) {
        store.dispatch(setTextAlignment(TextAlignment.Ltr))
        return TextAlignment.Ltr
    }
}

export default reducer
