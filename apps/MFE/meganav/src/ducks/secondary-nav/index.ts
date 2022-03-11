import {Store} from "redux"
import logger from "@monorepo/core-logger"
import {SecondaryNav, DefaultConfig} from "../../models/secondary-nav"
import {getSecondaryNavData} from "../../api/secondary-nav"
import {DEFAULT_SECONDARY_NAV_VERSION} from "../../config/constants"
import {SettingsSdkKeys} from "../../models/settings"
import {FeatureSettings} from "../../models/feature-settings"
import type State from "../state"

export const SET_SECONDARY_NAV_DATA = "SET_SECONDARY_NAV_DATA"
export const GET_SECONDARY_NAV_DATA = "GET_SECONDARY_NAV_DATA"
export const SET_IS_IN_SECONDARY_NAV = "SET_IS_IN_SECONDARY_NAV"
export const SET_DEFAULT_SECONDARY_CONFIG = "SET_DEFAULT_SECONDARY_CONFIG"
export const SET_IS_IMAGE_PLACEHOLDER_ENABLED = "SET_IS_IMAGE_PLACEHOLDER_ENABLED"

class Catalogues {
    [index: string]: SecondaryNav
}

export type SecondaryNavDuckState = {
    departmentIds: string[]
    catalogues: Catalogues
    isPending: boolean
    isInSecondaryNav: boolean
    config: DefaultConfig
    isImagePlaceholderEnabled: boolean
}

export interface SetSecondaryNavData {
    type: typeof SET_SECONDARY_NAV_DATA
    payload: SecondaryNav
}
export interface GetSecondaryNavData {
    type: typeof GET_SECONDARY_NAV_DATA
    payload: boolean
}
export interface SetIsInSecondaryNav {
    type: typeof SET_IS_IN_SECONDARY_NAV
    payload: boolean
}

export interface SetIsImagePlaceholderEnabled {
    type: typeof SET_IS_IMAGE_PLACEHOLDER_ENABLED
    payload: boolean
}

export interface SetDefaultSecondaryConfig {
    type: typeof SET_DEFAULT_SECONDARY_CONFIG
    payload: DefaultConfig
}

export const initialState: SecondaryNavDuckState = {
    departmentIds: [],
    catalogues: {},
    isPending: false,
    isInSecondaryNav: false,
    isImagePlaceholderEnabled: false,
    config: {
        version: DEFAULT_SECONDARY_NAV_VERSION,
        country: "",
    },
}

const getImagePlaceholderEnabled = (config: FeatureSettings): boolean =>
    !!config[SettingsSdkKeys.imagePlaceHolder]?.EnableImagePlaceholder

const setImagePlaceholderEnabled = (store: Store, isImagePlaceholderEnabled: boolean) =>
    store.dispatch({
        type: SET_IS_IMAGE_PLACEHOLDER_ENABLED,
        payload: isImagePlaceholderEnabled,
    })

export const updateImagePlaceholderSettings = (store: Store, config: FeatureSettings) =>
    setImagePlaceholderEnabled(store, getImagePlaceholderEnabled(config))

export const setDefaultConfig = (store: Store, config: DefaultConfig) =>
    store.dispatch({
        type: SET_DEFAULT_SECONDARY_CONFIG,
        payload: config,
    })

export const setIsInSecondaryMeganav = (isInSecondaryNav: boolean) => dispatch =>
    dispatch({
        type: SET_IS_IN_SECONDARY_NAV,
        payload: isInSecondaryNav,
    })

const makeRequest = async (siteUrl: string, headers, dispatch, department: string) => {
    try {
        const response = await getSecondaryNavData(siteUrl, headers, department)
        dispatch({type: SET_SECONDARY_NAV_DATA, payload: response})
    } catch (error) {
        logger.error(error)
        dispatch({type: SET_SECONDARY_NAV_DATA, payload: new SecondaryNav()})
    }
}

export const getSecondaryNavDataThunk = (department: string) => async (dispatch, getState) => {
    const {
        request: {headers, siteUrl},
        secondarynav: {catalogues},
    } = getState() as State
    const dept = department.toLowerCase()
    const departmentCatalogueExists = catalogues[dept]
    if (departmentCatalogueExists) return

    dispatch({type: GET_SECONDARY_NAV_DATA, payload: true})
    await makeRequest(siteUrl, headers, dispatch, dept)
}

const mergeData = (oldData: SecondaryNavDuckState, newData: SecondaryNav): SecondaryNavDuckState => {
    const lowercaseTitle: string = newData.title.toLowerCase()
    const catalogues = {...oldData.catalogues, [lowercaseTitle]: newData}
    const newDepartmentIds: string[] = oldData.catalogues[lowercaseTitle] ? [] : [lowercaseTitle]
    const departmentIds: string[] = oldData.departmentIds.concat(newDepartmentIds)

    return {
        ...oldData,
        catalogues,
        departmentIds,
        isPending: false,
    }
}

const reducer = (
    state: SecondaryNavDuckState = initialState,
    action:
        | SetSecondaryNavData
        | GetSecondaryNavData
        | SetIsInSecondaryNav
        | SetDefaultSecondaryConfig
        | SetIsImagePlaceholderEnabled,
): SecondaryNavDuckState => {
    switch (action.type) {
        case GET_SECONDARY_NAV_DATA: {
            return {...state, isPending: action.payload}
        }
        case SET_SECONDARY_NAV_DATA: {
            return mergeData(state, action.payload)
        }
        case SET_IS_IN_SECONDARY_NAV:
            return {
                ...state,
                isInSecondaryNav: action.payload,
            }
        case SET_IS_IMAGE_PLACEHOLDER_ENABLED:
            return {
                ...state,
                isImagePlaceholderEnabled: action.payload,
            }
        case SET_DEFAULT_SECONDARY_CONFIG:
            return {
                ...state,
                config: action.payload,
            }
        default:
            return state
    }
}

export default reducer
