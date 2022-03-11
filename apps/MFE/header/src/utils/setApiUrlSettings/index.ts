import {SettingsSdkKeys, SettingsModel} from "../../models/settings"

export const setApiUrlSettings = (configuration: any): SettingsModel => {
    if (isSettingsError(configuration)) throw new Error("Settings Failure")
    return {
        realm: configuration[SettingsSdkKeys.realm].Value,
        territory: configuration[SettingsSdkKeys.territory].Value,
        language: configuration[SettingsSdkKeys.language].Value,
        alignment: configuration[SettingsSdkKeys.direction].Value,
        autocomplete: configuration[SettingsSdkKeys.autoComplete],
        favourites: configuration[SettingsSdkKeys.enableFavourites],
    }
}

export const isSettingsError = (configuration: any): boolean => {
    if (!configuration) return true
    const realm = configuration[SettingsSdkKeys.realm]
    const territory = configuration[SettingsSdkKeys.territory]
    const language = configuration[SettingsSdkKeys.language]
    const alignment = configuration[SettingsSdkKeys.direction]
    const autocomplete = configuration[SettingsSdkKeys.autoComplete]
    const favourites = configuration[SettingsSdkKeys.enableFavourites]
    return !realm?.Value || !territory?.Value || !language?.Value || !alignment?.Value || !autocomplete || !favourites
}
