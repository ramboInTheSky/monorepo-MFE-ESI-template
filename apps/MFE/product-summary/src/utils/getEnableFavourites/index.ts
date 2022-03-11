import {SettingsSdkKeys} from "../../config/settings"
import {EnableFavourites} from "../../models/FeatureSwitch"

interface EnableFavouritesConfig {
    [SettingsSdkKeys.enableFavourites]: EnableFavourites | null
}

const getEnableFavourites = (configuration: EnableFavouritesConfig | null) => {
    const enableFavourites = configuration?.[SettingsSdkKeys.enableFavourites]?.Value
    if (typeof enableFavourites !== "boolean")
        throw new Error("Feature Settings: invalid value for enabling favourites")
    return enableFavourites
}

export default getEnableFavourites
