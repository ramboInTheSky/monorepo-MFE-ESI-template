import {Store} from "redux"
import State from "../../models/State"
import {SettingsSdkKeys} from "../../models/settings"

export interface SeoFiltersDuckState {
    filterDepthCount: number
}

export const SET_SEO_FILTERS_CONFIG = "SET_SEO_FILTERS_CONFIG"

interface Action {
    type: typeof SET_SEO_FILTERS_CONFIG
    seoFilterConfigData: SeoFilterConfigInterface
}

export const setSeoFiltersConfig = (seoFilterConfigData: SeoFilterConfigInterface): Action => {
    return {
        type: SET_SEO_FILTERS_CONFIG,
        seoFilterConfigData,
    }
}

export interface SeoFilterConfigInterface {
    filterDepthCount: number
}

type SeoFiltersConf = {
    [SettingsSdkKeys.SeoFilters]: any
}

export const updateSeoFiltersConfig = (store: Store, configuration: SeoFiltersConf) => {
    const seoFilterConfigData = configuration[SettingsSdkKeys.SeoFilters]

    store.dispatch({
        type: SET_SEO_FILTERS_CONFIG,
        seoFilterConfigData,
    })
}

export const selectOverrideMetadata = (state: State) => {
    const {overrideSeo} = state.features
    return overrideSeo?.metadata
}

const initialState: SeoFiltersDuckState = {
    filterDepthCount: 0,
}

const reducer = (state: SeoFiltersDuckState = initialState, action: Action): SeoFiltersDuckState => {
    const {type, seoFilterConfigData} = action
    switch (type) {
        case SET_SEO_FILTERS_CONFIG:
            return {
                ...state,
                ...seoFilterConfigData,
            }
        default:
            return state
    }
}

export default reducer
