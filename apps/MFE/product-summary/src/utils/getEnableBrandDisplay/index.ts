import {SettingsSdkKeys} from "../../config/settings"
import {EnableBrandsDisplay} from "../../models/FeatureSwitch"

interface EnableBrandsDisplayConfig {
    [SettingsSdkKeys.enableBrandsDisplay]: EnableBrandsDisplay | null
}

const getEnableBrandDisplay = (configuration: EnableBrandsDisplayConfig | null) => {
    const enableBrandsDisplay = configuration?.[SettingsSdkKeys.enableBrandsDisplay]?.Value
    if (typeof enableBrandsDisplay !== "boolean")
        throw new Error("Feature Settings: invalid value for enabling brand display")
    return enableBrandsDisplay
}

export default getEnableBrandDisplay
