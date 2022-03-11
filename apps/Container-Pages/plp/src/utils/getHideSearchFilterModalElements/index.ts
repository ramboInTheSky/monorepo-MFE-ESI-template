import {SettingsSdkKeys} from "../../models/settings"
import {HideSearchFilterModalElements} from "../../models/HideSearchFilterModalElements"

interface HideSearchFilterModalElementsConfig {
    [SettingsSdkKeys.HideSearchFilterModalElements]: HideSearchFilterModalElements | null
}

const getHideSearchFilterModalElements = (configuration: HideSearchFilterModalElementsConfig | null) => {
    const hideSearchFilterModalElementsConfig = configuration?.[SettingsSdkKeys.HideSearchFilterModalElements]

    if (!hideSearchFilterModalElementsConfig) {
        throw new Error("Settings Failure")
    }

    return hideSearchFilterModalElementsConfig
}

export default getHideSearchFilterModalElements
