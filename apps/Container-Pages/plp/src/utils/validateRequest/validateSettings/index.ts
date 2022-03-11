import logger from "@monorepo/core-logger"
import {SettingsSdkKeys} from "../../../models/settings"

const areFeatureSettingsValid = (configuration): boolean => {
    if (!configuration) {
        logger.error("Feature Settings has not been set up correctly, check request headers")
        return false
    }

    const alignment = configuration[SettingsSdkKeys.Direction]
    if (!alignment?.Value) {
        logger.error("Feature Settings - Alignment is not provided")
        return false
    }

    return true
}

export default areFeatureSettingsValid
