import {getSettingsHeaders} from "@monorepo/utils"
import {IncomingHttpHeaders} from "http"
import {Store} from "redux"

export const SET_REQUEST = "SET_REQUEST"

interface SetRequest {
    type: typeof SET_REQUEST
    request: any
}

export interface RequestDuckState {
    headers: IncomingHttpHeaders | null
    siteUrl: string
    url: string | null
}

const initialState: RequestDuckState = {
    headers: null,
    siteUrl: "",
    url: null,
}

export const setRequestAction = (store: Store, request: any) => {
    store.dispatch({
        type: SET_REQUEST,
        request,
    })
}

const reducer = (state: RequestDuckState = initialState, action: SetRequest): RequestDuckState => {
    const {request} = action

    switch (action.type) {
        case SET_REQUEST:
            return {
                ...state,
                headers: getSettingsHeaders(request.headers),
                siteUrl: request.siteUrl.url,
                url: request.url,
            }
        default:
            return state
    }
}

export default reducer
