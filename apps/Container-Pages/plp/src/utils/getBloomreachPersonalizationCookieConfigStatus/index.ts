import {SettingsSdkKeys} from "../../models/settings"

export default function getBloomreachPersonalizationCookieConfigStatus(configuration: any) {
    if (!configuration) throw new Error("Settings Failure")
    if (
        configuration[SettingsSdkKeys.BloomreachPersonalizationCookies] &&
        configuration[SettingsSdkKeys.BloomreachPersonalizationCookies].bloomreachPersonalizationEnabled !== undefined
    ) {
        return configuration[SettingsSdkKeys.BloomreachPersonalizationCookies].bloomreachPersonalizationEnabled
    }
}
