import {GoogleAnalyticsData} from "../../models/googleAnalyticsConfig"
import {SettingsSdkKeys} from "../../models/settings"
import {COUNTRY_GB, REGION_INTERNATIONAL, REGION_UK} from "../../config/constants"
import env from "../../config/env"
import BFFLogger from "../../server/core/BFFLogger"

interface GoogleAnalyticsConfig {
    account: string
    environmentKey: string
    useGoogleAnalytics: boolean
}

const getGoogleAnalyticsConfig = (configuration): GoogleAnalyticsConfig => {
    try {
        const gaConfig = configuration[SettingsSdkKeys.googleAnalytics] as GoogleAnalyticsData

        const territory = configuration[SettingsSdkKeys.territory]?.Value as string
        const useGoogleAnalytics = configuration[SettingsSdkKeys.enableGoogleAnalyticsSDK]?.Value
        if (!useGoogleAnalytics) {
            return {account: "", environmentKey: "", useGoogleAnalytics: false}
        }

        if (!gaConfig) {
            throw new Error("Missing Google Analytics Configuration")
        }

        const region = territory.toLowerCase() === COUNTRY_GB ? REGION_UK : REGION_INTERNATIONAL

        const {account} = gaConfig[region]
        const environmentKey = gaConfig[region].environmentKeys[env.ENVIRONMENT]

        return {account, environmentKey, useGoogleAnalytics}
    } catch (err) {
        BFFLogger.error(err)
        return {account: "", environmentKey: "", useGoogleAnalytics: false}
    }
}

export default getGoogleAnalyticsConfig
