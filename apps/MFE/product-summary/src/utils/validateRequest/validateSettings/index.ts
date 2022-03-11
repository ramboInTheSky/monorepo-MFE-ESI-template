import BFFLogger from "../../../server/core/BFFLogger"
import {SettingsSdkKeys} from "../../../config/settings"

const areFeatureSettingsValid = (configuration): boolean => {
    if (!configuration) {
        BFFLogger.error("Feature Settings has not been set up correctly, check request headers")
        return false
    }
    const alignment = configuration[SettingsSdkKeys.Direction]
    if (!alignment?.Value) {
        BFFLogger.error("Feature Settings - Alignment is not provided")
        return false
    }

    const imageCdnUrl = configuration[SettingsSdkKeys.imageCdnUrl]
    if (!imageCdnUrl?.Value) {
        BFFLogger.error("Feature Settings - Image CDN Url is not provided")
        return false
    }

    const imageCdnUrlProduct = configuration[SettingsSdkKeys.imageCdnUrlProduct]
    if (!imageCdnUrlProduct?.Value) {
        BFFLogger.error("Feature Settings - Product Image CDN Url is not provided")
        return false
    }

    return true
}

export default areFeatureSettingsValid
