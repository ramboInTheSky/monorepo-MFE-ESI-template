import {SettingsSdkKeys} from "../../config/settings"
import {EnableReviewStars} from "../../models/FeatureSwitch"

interface EnableReviewStarsConfig {
    [SettingsSdkKeys.enableReviewStars]: EnableReviewStars | null
}

const getEnableReviewStars = (configuration: EnableReviewStarsConfig | null) => {
    const enableReviewStars = configuration?.[SettingsSdkKeys.enableReviewStars]?.Value
    if (typeof enableReviewStars !== "boolean")
        throw new Error("Feature Settings: invalid value for enabling review stars")
    return enableReviewStars
}

export default getEnableReviewStars
