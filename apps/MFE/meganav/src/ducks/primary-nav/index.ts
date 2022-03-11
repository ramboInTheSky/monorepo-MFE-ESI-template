import logger from "@monorepo/core-logger"
import type State from "ducks/state"
import {Store} from "redux"
import {getPrimaryNavData} from "../../api/appdata"
import {PrimaryNavItem, DefaultConfig} from "../../models/primary-nav"
import {DEFAULT_PRIMARY_NAV_VERSION} from "../../config/constants"
import {getSecondaryNavDataThunk, setIsInSecondaryMeganav} from "../secondary-nav"

export const SET_PRIMARY_NAV_ACTIVE_INDEX = "SET_PRIMARY_NAV_ACTIVE_INDEX"
export const SET_PRIMARY_NAV_DATA = "SET_PRIMARY_NAV_DATA"
export const SET_IS_IN_PRIMARY_NAV = "SET_IS_IN_PRIMARY_NAV"
export const SET_DEFAULT_PRIMARY_CONFIG = "SET_DEFAULT_PRIMARY_CONFIG"

export type PrimaryNavDuckState = {
    active: boolean
    activeDepartment: string
    activeDepartmentIndex: number
    items: PrimaryNavItem[]
    isInPrimaryNav: boolean
    config: DefaultConfig
}

export interface Action {
    type:
        | typeof SET_PRIMARY_NAV_ACTIVE_INDEX
        | typeof SET_PRIMARY_NAV_DATA
        | typeof SET_IS_IN_PRIMARY_NAV
        | typeof SET_DEFAULT_PRIMARY_CONFIG
    payload: Partial<PrimaryNavDuckState>
}

export interface ActiveIndex {
    type: typeof SET_PRIMARY_NAV_ACTIVE_INDEX
    payload: {
        active: boolean
        activeDepartment: string
        activeDepartmentIndex: number
    }
}
export interface NavData {
    type: typeof SET_PRIMARY_NAV_DATA
    payload: PrimaryNavItem[]
}
export interface IsInPrimaryNav {
    type: typeof SET_IS_IN_PRIMARY_NAV
    payload: boolean
}
export interface DefaultVersion {
    type: typeof SET_DEFAULT_PRIMARY_CONFIG
    payload: DefaultConfig
}

export const initialState: PrimaryNavDuckState = {
    activeDepartment: "",
    active: false,
    activeDepartmentIndex: -1,
    items: [],
    isInPrimaryNav: false,
    config: {
        version: DEFAULT_PRIMARY_NAV_VERSION,
        country: "",
    },
}

export const setDefaultConfig = (store: Store, config: DefaultConfig) =>
    store.dispatch({
        type: SET_DEFAULT_PRIMARY_CONFIG,
        payload: config,
    })

export const setIsInPrimaryNav = (isInPrimaryNav: boolean) => dispatch =>
    dispatch({
        type: SET_IS_IN_PRIMARY_NAV,
        payload: isInPrimaryNav,
    })

export const setPrimaryNavIndex = (activeDepartmentIndex: number, activeDepartment: string) => dispatch =>
    dispatch({
        type: SET_PRIMARY_NAV_ACTIVE_INDEX,
        payload: {
            activeDepartment: activeDepartment.toLowerCase(),
            activeDepartmentIndex,
            active: activeDepartmentIndex > -1,
        },
    })

export const setNextPrimaryNavIndex = () => {
    return (dispatch, getState) => {
        const state = getState() as State

        if (state.primarynav.activeDepartmentIndex + 1 >= state.primarynav.items.length) {
            closeSecondaryNav(dispatch)
            return
        }
        const nextDepartment = state.primarynav.items[state.primarynav.activeDepartmentIndex + 1]

        dispatch(setPrimaryNavIndex(state.primarynav.activeDepartmentIndex + 1, nextDepartment.title))
        dispatch(getSecondaryNavDataThunk(nextDepartment.path))
    }
}

export const setPreviousPrimaryNavIndex = () => {
    return (dispatch, getState) => {
        const state = getState() as State

        if (state.primarynav.activeDepartmentIndex === 0) {
            closeSecondaryNav(dispatch)
            return
        }
        const nextDepartment = state.primarynav.items[state.primarynav.activeDepartmentIndex - 1]

        dispatch(setPrimaryNavIndex(state.primarynav.activeDepartmentIndex - 1, nextDepartment.title))
        dispatch(getSecondaryNavDataThunk(nextDepartment.path))
    }
}

const closeSecondaryNav = dispatch => {
    dispatch(setPrimaryNavIndex(-1, ""))
    dispatch(setIsInSecondaryMeganav(false))
    dispatch(setIsInPrimaryNav(false))
}

export const getPrimaryNavDataThunk = async ({dispatch, getState}: Store) => {
    try {
        const {
            request,
            primarynav: {config},
        } = getState() as State

        const response = await getPrimaryNavData(request.headers!, config)
        dispatch({type: SET_PRIMARY_NAV_DATA, payload: response.items || []})
    } catch (error) {
        logger.error(error)
        dispatch({type: SET_PRIMARY_NAV_DATA, payload: []})
    }
}

const reducer = (
    state: PrimaryNavDuckState = initialState,
    action: ActiveIndex | NavData | IsInPrimaryNav | DefaultVersion,
): PrimaryNavDuckState => {
    switch (action.type) {
        case SET_PRIMARY_NAV_ACTIVE_INDEX:
            return {
                ...state,
                ...action.payload,
            }
        case SET_PRIMARY_NAV_DATA:
            return {
                ...state,
                items: action.payload,
            }
        case SET_IS_IN_PRIMARY_NAV:
            return {
                ...state,
                isInPrimaryNav: action.payload,
            }
        case SET_DEFAULT_PRIMARY_CONFIG:
            return {
                ...state,
                config: action.payload,
            }
        default:
            return state
    }
}

export default reducer
