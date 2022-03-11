import {Store} from "redux"
import State from "../../models/state"
import {SettingsSdkKeys} from "../../config/settings"
import {LazyloadState} from "../../models/Lazyload"

export const SET_LAZYLOAD_CONFIG = "SET_LAZYLOAD_CONFIG"

interface SetEnableColourchipsAction {
    type: typeof SET_LAZYLOAD_CONFIG
    lazyloadConfig: Partial<LazyloadState>
}

export const initialState: LazyloadState = {
    colourchips: false,
    productImages: false,
    fitIcons: false,
}

export const setEnableColourchips = (lazyloadConfig: Partial<LazyloadState>): SetEnableColourchipsAction => ({
    type: SET_LAZYLOAD_CONFIG,
    lazyloadConfig,
})

export function selectColourChipsLazyLoadEnabled(state: State) {
    return state.lazyload.colourchips
}
export function selectProductLazyLoadEnabled(state: State) {
    return state.lazyload.productImages
}

const reducer = (state: LazyloadState = initialState, action: SetEnableColourchipsAction): LazyloadState => {
    switch (action.type) {
        case SET_LAZYLOAD_CONFIG:
            return {
                ...state,
                ...action.lazyloadConfig,
            }
        default:
            return state
    }
}

type LazyloadConfType = {
    [SettingsSdkKeys.lazyLoadConfig]: any
}

export const updateLazyloadColourchips = ({dispatch}: Store, configuration: LazyloadConfType): any => {
    const lazyloadConfig = configuration[SettingsSdkKeys.lazyLoadConfig].Value || initialState

    dispatch(setEnableColourchips(lazyloadConfig))
}

export default reducer
