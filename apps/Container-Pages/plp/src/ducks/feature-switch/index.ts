import {Store} from "redux"
import State from "../../models/State"
import {SettingsSdkKeys} from "../../models/settings"

export interface FeaturesDuckState {
    enablePageInFilters: boolean
    overrideSeo?: {
        metadata: boolean
        headings: boolean
    }
    enableSearchBanners: boolean
    enableTooltips: boolean
}

export const SET_FEATURE_SWITCH = "SET_FEATURES"

interface Action {
    type: typeof SET_FEATURE_SWITCH
    featureSwitchData: FeatureSwitchInterface
}

export const setFeatureSwitch = (featureSwitchData: FeatureSwitchInterface): Action => {
    return {
        type: SET_FEATURE_SWITCH,
        featureSwitchData,
    }
}

export interface FeatureSwitchInterface {
    enablePageInFilters: boolean
    overrideSeo?: {
        metadata: boolean
        headings: boolean
    }
    enableSearchBanners: boolean
    enableTooltips: boolean
}

type FeatureSwitchConf = {
    [SettingsSdkKeys.FeatureSwitch]: any
}

export const updateFeatureSwitch = (store: Store, configuration: FeatureSwitchConf) => {
    const featureSwitchData = configuration[SettingsSdkKeys.FeatureSwitch]

    store.dispatch({
        type: SET_FEATURE_SWITCH,
        featureSwitchData,
    })
}

export const selectOverrideMetadata = (state: State) => {
    const {overrideSeo} = state.features
    return overrideSeo?.metadata
}

const initialState: FeaturesDuckState = {
    enablePageInFilters: false,
    overrideSeo: {
        metadata: false,
        headings: false,
    },
    enableSearchBanners: false,
    enableTooltips: false,
}

const reducer = (state: FeaturesDuckState = initialState, action: Action): FeaturesDuckState => {
    const {type, featureSwitchData} = action
    switch (type) {
        case SET_FEATURE_SWITCH:
            return {
                ...state,
                ...featureSwitchData,
            }
        default:
            return state
    }
}

export default reducer
