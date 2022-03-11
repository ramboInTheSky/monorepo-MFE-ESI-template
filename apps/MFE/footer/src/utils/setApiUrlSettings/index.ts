import {SettingsSdkKeys} from "../../models/settings"


export const isSettingsError = (configuration: any): boolean => {
    if (!configuration) return true
    const realm = configuration[SettingsSdkKeys.realm]
    const territory = configuration[SettingsSdkKeys.territory]
    const language = configuration[SettingsSdkKeys.language]
    const alignment = configuration[SettingsSdkKeys.direction]

    return !realm?.Value || !territory?.Value || !language?.Value || !alignment?.Value 
}
