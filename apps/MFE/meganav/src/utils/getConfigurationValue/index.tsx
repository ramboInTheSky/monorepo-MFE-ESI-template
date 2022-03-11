import {SettingsSdkKeys} from "../../models/settings"

export const getConfigurationValue = (
    configuration: any,
    settingsSdkKey: SettingsSdkKeys,
    configurationKey: string,
) => {
    if (!configuration) throw new Error("Settings Failure")
    if (configuration[settingsSdkKey]?.[configurationKey]) {
        return configuration[settingsSdkKey][configurationKey]
    }
}

export default getConfigurationValue
