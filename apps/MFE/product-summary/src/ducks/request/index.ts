import {IncomingHttpHeaders} from "http"
import {getSettingsHeaders} from "@monorepo/utils"
import {Store} from "redux"
import {LANG_EN, LANGUAGE_HEADER} from "../../config/constants"

export const SET_REQUEST = "SET_REQUEST"
interface SetRequest {
    type: typeof SET_REQUEST
    request: any
}

type Actions = SetRequest

export interface RequestDuckState {
    headers: IncomingHttpHeaders | null
    isEnglishLang: boolean
}

const initialState: RequestDuckState = {
    headers: null,
    isEnglishLang: false,
}

export const setRequestAction = (store: Store, request: any) => {
    store.dispatch({
        type: SET_REQUEST,
        request,
    })
}

const reducer = (state: RequestDuckState = initialState, action: Actions): RequestDuckState => {
    switch (action.type) {
        case SET_REQUEST:
            return {
                ...state,
                headers: getSettingsHeaders(action.request.headers),
                isEnglishLang:
                    action.request.headers![LANGUAGE_HEADER] &&
                    action.request.headers![LANGUAGE_HEADER].toLowerCase() === LANG_EN,
            }
        default:
            return state
    }
}

export default reducer
