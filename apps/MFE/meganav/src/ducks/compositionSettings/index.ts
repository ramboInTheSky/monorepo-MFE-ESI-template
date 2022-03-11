export const SET_COMPOSITION_SETTINGS = "SET_COMPOSITION_SETTINGS"

export class CompositionSettingsDuckState {
    showSecondaryNavArrow = false
}

const initialState = new CompositionSettingsDuckState()

interface SetCompositionSettings {
    type: typeof SET_COMPOSITION_SETTINGS
    value: CompositionSettingsDuckState
}

type CompositionSettingsActions = SetCompositionSettings

export const setCompositionSettingsAction = (value: CompositionSettingsDuckState): SetCompositionSettings => {
    return {
        type: SET_COMPOSITION_SETTINGS,
        value,
    }
}

export const compositionSettingsReducer = (
    state: CompositionSettingsDuckState = initialState,
    action: CompositionSettingsActions,
): CompositionSettingsDuckState => {
    switch (action.type) {
        case SET_COMPOSITION_SETTINGS:
            return {
                ...state,
                ...action.value,
            }
        default:
            return state
    }
}
