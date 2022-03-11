import BFFLogger from "../../server/core/BFFLogger"
import {SettingsModel} from "../../ducks/settings"
import {SettingsSdkKeys} from "../../models/settings"

type ConfigurationType = {
    [K in SettingsSdkKeys]: {
        Value: any
    }
}

// settings that we group into one ssr prop to reduce LOC
const settingsValues = [SettingsSdkKeys.variant, SettingsSdkKeys.userConsentManagement] as any

/**
 * This allows you to automatically bring into the state (under the settings property) anything you add to the headers settingsValues above
 * @param configuration
 */
export const getSettings = (configuration: ConfigurationType): SettingsModel => {
    if (configuration) {
        return settingsValues.reduce((acc, key: string) => {
            if (configuration[key]?.Value !== undefined) {
                return {
                    ...acc,
                    [key.replace("header.frontend.", "")]: configuration[key].Value,
                }
            }
            BFFLogger.warn(`Feature settings key missing : ${key}`)
            return acc
        }, {})
    }
    BFFLogger.error("Feature settings missing")
    return {} as SettingsModel
}
