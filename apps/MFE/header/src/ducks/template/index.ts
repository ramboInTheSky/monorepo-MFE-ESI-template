import {Store} from "redux"
import Logger from "@monorepo/core-logger"
import getConfigurationValue from "../../utils/getConfigurationValue"
import {SettingsSdkKeys} from "../../models/settings"
import {DEFAULT_TEMPLATE} from "../../config/constants"

export const SET_TEMPLATE = "SET_TEMPLATE"
interface SetTemplateAction {
    type: typeof SET_TEMPLATE
    template: string
}

export const initialState = DEFAULT_TEMPLATE

export const setTemplateAction = (template: string): SetTemplateAction => ({
    type: SET_TEMPLATE,
    template,
})

const reducer = (state: any = initialState, action: SetTemplateAction): string => {
    switch (action.type) {
        case SET_TEMPLATE:
            return action.template
        default:
            return state
    }
}

export const updateTemplate = (store: Store, configuration: any) => {
    try {
        const templateConfigurationValue = getConfigurationValue(configuration, SettingsSdkKeys.template, "Value")
        store.dispatch(setTemplateAction(templateConfigurationValue))
    } catch (error) {
        Logger.error(new Error(error))
        Logger.info(`template set to default`)
        store.dispatch(setTemplateAction(DEFAULT_TEMPLATE))
    }
}

export default reducer
