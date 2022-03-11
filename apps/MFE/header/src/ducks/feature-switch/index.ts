import {Store} from "redux"
import Logger from "@monorepo/core-logger"
import {SettingsSdkKeys} from "../../models/settings"
import {FeatureSwitchData} from "../../models/features/searchBar"

export interface FeaturesDuckState {
    SearchBar: FeatureSwitchData
}

export const SET_FEATURE_SWITCH = "SET_FEATURES"

type Action = {
    type: typeof SET_FEATURE_SWITCH
    featureSwitchData: any
}
export const updateFeatureSwitch = (store: Store, configuration: any) => {
    const featureSwitchData = {}
    const getAllFeatureSwitch = configuration[SettingsSdkKeys.featureSwitch]

    Object.keys(getAllFeatureSwitch).forEach((featureSwitchType: string) => {
        let getType
        const featureKey = getAllFeatureSwitch[featureSwitchType]

        getType = Object.keys(featureKey).find((featureType: string) =>
            featureKey[featureType].Value ? featureType : "",
        )

        if (!getType) {
            // eslint-disable-next-line prefer-destructuring
            getType = Object.keys(featureKey)[0]
            Logger.error(`Header: Incorrect set up for feature switch ${featureSwitchType}, default to ${getType}`)
        }

        const {Value, ...otherProps} = featureKey[getType]

        featureSwitchData[featureSwitchType] = {
            ...otherProps,
            Value: getType,
        }
    })

    store.dispatch({
        type: SET_FEATURE_SWITCH,
        featureSwitchData,
    })
}

const initialState: FeaturesDuckState = {
    SearchBar: {
        Value: "",
    },
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
