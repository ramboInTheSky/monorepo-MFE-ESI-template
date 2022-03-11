import {VARIANT_DEFAULT} from "../../config/constants"

export const SET_SETTINGS = "SET_SETTINGS"

/**
 * add as needed new feature settings
 */
export class SettingsModel {
    variant = VARIANT_DEFAULT
    "userConsentManagement.enabled" = false
}

const initialState = new SettingsModel()

interface SetSettings {
    type: typeof SET_SETTINGS
    value: SettingsModel
}

type SettingsActions = SetSettings

export const setSettings = (value: SettingsModel): SetSettings => {
    return {
        type: SET_SETTINGS,
        value,
    }
}

export const updateSettings = (store, settings) => {
    store.dispatch(setSettings(settings))
}

export const settingsReducer = (state: SettingsModel = initialState, action: SettingsActions): SettingsModel => {
    switch (action.type) {
        case SET_SETTINGS:
            // If a setting is missing, then the default value will persist
            return {
                ...state,
                ...action.value,
            }
        default:
            return state
    }
}
