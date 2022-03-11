import {SettingsSdkKeys} from "../../config/settings"
import {EnableSearchDescription} from "../../models/SearchDescription"

interface EnableSearchDescriptionConfig {
    [SettingsSdkKeys.enableSearchDescription]: EnableSearchDescription | null
}

const getEnableSearchDescription = (configuration: EnableSearchDescriptionConfig | null) => {
    const enableSearchDescription = configuration?.[SettingsSdkKeys.enableSearchDescription]?.Value
    if (typeof enableSearchDescription !== "boolean")
        throw new Error("Feature Settings: invalid value for enabling search description")
    return enableSearchDescription
}

export default getEnableSearchDescription
