import {SettingsSdkKeys} from "../../models/settings"
import urls from "../../config/urls"
import BFFLogger from "../../server/core/BFFLogger"
import {getRegExValue} from "../getRegExValue"
import {LOCALHOST} from "../../config/constants"

interface ABPlatformConfig{
    abPlatformTesting: boolean
    config: string
}

const getABPlatformConfig = (configuration: any, siteUrl: string): ABPlatformConfig => {
    try {
        const abPlatformTesting = configuration[SettingsSdkKeys.enableABPlatformTesting]?.Value as boolean
        const {configsPath, configFile} = urls.abPlatformTesting
        if (!siteUrl) {
            throw new Error("Missing site url for AB Testing Configuration")
        }
        if (abPlatformTesting !== true) {
            return {abPlatformTesting: false, config: ""}
        }
        const config = (siteUrl && siteUrl.includes(LOCALHOST)) ? `${configsPath}${configFile}` : `${configsPath}${getRegExValue(siteUrl,"", "^https?://([^/?#]+)(?:[/?#]|$)")}-${configFile}`
        return {abPlatformTesting, config}
    } catch (err) {
        BFFLogger.error(err)
        return {abPlatformTesting: false, config: ""}
    }
}

export default getABPlatformConfig
