import {getSettingsHeaders} from "@monorepo/utils"
import {IncomingHttpHeaders} from "http"
import {Store} from "redux"
import {COUNTRY_GB, TERRITORY_HEADER} from "../../config/constants"

export const SET_REQUEST = "SET_REQUEST"

interface SetRequest {
    type: typeof SET_REQUEST
    request: any
}

export interface RequestDuckState {
    headers: IncomingHttpHeaders | null
    url: string | null
    isInternationalCountry: boolean
}

const initialState: RequestDuckState = {
    headers: null,
    url: null,
    isInternationalCountry: false,
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
                url: request.url,
                isInternationalCountry:
                    request.headers![TERRITORY_HEADER] &&
                    request.headers![TERRITORY_HEADER].toLowerCase() !== COUNTRY_GB,
            }
        default:
            return state
    }
}

export default reducer
