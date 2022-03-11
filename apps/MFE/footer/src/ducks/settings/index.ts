import {VARIANT_DEFAULT} from "../../config/constants"

export const SET_SETTINGS = "SET_SETTINGS"

export interface SettingsDuckState {
    variant: string
}

interface SetSettings {
    type: typeof SET_SETTINGS
    value: SettingsDuckState
}

type SettingsActions = SetSettings

const initalState: SettingsDuckState = {
    variant: VARIANT_DEFAULT,
}

export const setSettings = (value: SettingsDuckState): SetSettings => ({
    type: SET_SETTINGS,
    value,
})

export const updateSettings = (store, settings) => {
    store.dispatch(setSettings(settings))
}

export const settingsReducer = (state: SettingsDuckState = initalState, action: SettingsActions): SettingsDuckState => {
    switch (action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                ...action.value,
            }

        default:
            return state
    }
}

export default settingsReducer
