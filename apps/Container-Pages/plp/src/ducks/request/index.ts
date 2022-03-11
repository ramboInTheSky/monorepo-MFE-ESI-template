import {Store} from "redux"
import {getSettingsHeaders} from "@monorepo/utils"
import {DEV_ESI_HEADER, REALM_HEADER, SearchApiRequestTypes, SEARCH_CATEGORY_SEGMENT, TERRITORY_HEADER, VIEWPORT_SIZE_HEADER} from "../../config/constants"
import type {RequestDuckState} from "./types"
import type State from "../../models/State"
import {DESKTOP_VIEWPORT_SIZE, deviceBreakpoints, ViewportSizes} from "../../models/ViewportSize"
import getTerritoryDescription from '../../utils/getTerritoryDescription'
import getBloomreachPersonalizationCookieConfigStatus from '../../utils/getBloomreachPersonalizationCookieConfigStatus'
import getCategoryFromUrl from '../../utils/getCategoryFromUrl'
import getGenderFromUrl from '../../utils/getGenderFromUrl'
import { urlSanitiser } from "../../utils/httpUrlTrimmer"
import env from "../../config/env"


export const SET_REQUEST = "SET_REQUEST"
export const ASSIGN_REQUEST_STATE = "ASSIGN_REQUEST_STATE"

type RequestPayload = Omit<RequestDuckState, "page"> & {
    page?: string
}
interface SetRequest {
    type: typeof SET_REQUEST
    request: RequestPayload
}

interface AssignRequestState {
    type: typeof ASSIGN_REQUEST_STATE
    state
}


const initialState: RequestDuckState = {
    headers: {},
    siteUrl: "",
    url: "",
    page: 1,
    searchTerm: null,
    category: null,
    gender: null,
    territoryName: "",
    type: SearchApiRequestTypes.Category,
    useDevEsi: false,
    viewportSize: "",
    bloomreachPersonalizationEnabled: false,
}

export const updateRequest = (store: Store, request: any, configuration: any) => {
    const viewportSizeHeader = request.headers[VIEWPORT_SIZE_HEADER]
    const sanitisedPath = urlSanitiser(request.originalUrl)
    const type =
        sanitisedPath.substr(1, 4).toLowerCase() === SEARCH_CATEGORY_SEGMENT
            ? SearchApiRequestTypes.Category
            : SearchApiRequestTypes.Keyword


     // eslint-disable-next-line no-prototype-builtins
    const viewportSize: ViewportSizes = deviceBreakpoints.hasOwnProperty(viewportSizeHeader) ? viewportSizeHeader : DESKTOP_VIEWPORT_SIZE
    store.dispatch({
        type: SET_REQUEST,
        request: {
            siteUrl: `${request.siteUrl.url}${env.REACT_APP_SERVE_PATH_PREFIX}`,
            headers: getSettingsHeaders(request.headers),
            url: `${request.siteUrl.url}${request.originalUrl}`,
            searchTerm: request.query.w,
            category: getCategoryFromUrl(sanitisedPath, type),
            gender: getGenderFromUrl(sanitisedPath, type),
            territoryName: getTerritoryDescription(configuration),
            page: request.query.p,
            type,
            useDevEsi: !!request.headers[DEV_ESI_HEADER],
            viewportSize,
            bloomreachPersonalizationEnabled: getBloomreachPersonalizationCookieConfigStatus(configuration),
        },
    })
}

export const assignRequestDuck = (state: Partial<RequestDuckState>): AssignRequestState => {
    return {
        type: ASSIGN_REQUEST_STATE,
        state,
    }
}

export const parsePageParam = (value?: string) => {
    if (!value) return 1

    const page = Number(value)

    if (Number.isNaN(page)) return 1
    if (!Number.isInteger(page)) return 1
    if (page < 1) return 1

    return page
}

const reducer = (state: RequestDuckState = initialState, action: SetRequest | AssignRequestState): RequestDuckState => {
    switch (action.type) {
        case SET_REQUEST:
            return {
                ...state,
                ...action.request,
                page: parsePageParam(action.request.page),
            }
        case ASSIGN_REQUEST_STATE:
            return {
                ...state,
                ...action.state
            }
        default:
            return state
    }
}

export const selectRequestedPage = (state: State) => {
    return state.request.page
}


export const selectRealm = (state: State) => {
    return state.request.headers[REALM_HEADER] as string
}

export const selectTerritory = (state: State) => {
    return state.request.headers[TERRITORY_HEADER] as string
}

export default reducer
