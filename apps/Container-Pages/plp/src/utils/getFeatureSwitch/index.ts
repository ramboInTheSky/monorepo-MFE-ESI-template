import {SettingsSdkKeys} from "../../models/settings"
import {FeatureSwitch} from "../../models/FeatureSwitch"

interface FeatureSwitchConfig {
    [SettingsSdkKeys.FeatureSwitch]: FeatureSwitch | null
}

const getFeatureSwitch = (configuration: FeatureSwitchConfig | null) => {
    const featureSwitchConfig = configuration?.[SettingsSdkKeys.FeatureSwitch]
    if (!featureSwitchConfig) throw new Error("Settings Failure")
    return featureSwitchConfig
}

export default getFeatureSwitch
