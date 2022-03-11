import {MonetateData} from "../../models/monetateConfig"
import {SettingsSdkKeys} from "../../models/settings"
import env from "../../config/env"
import BFFLogger from "../../server/core/BFFLogger"

interface MonetateConfig {
    enableMonetateSDK: boolean
    accountMonetateSDK: string
}

const getMonetateConfig = (configuration: any): MonetateConfig => {
    try {
        const enableMonetateSDK = configuration[SettingsSdkKeys.monetateSDK]?.enabled as boolean
        if (!enableMonetateSDK) {
            return {enableMonetateSDK: false, accountMonetateSDK: ""}
        }

        const monetateConfigKey = configuration[SettingsSdkKeys.monetateSDK] as MonetateData
        if(!monetateConfigKey.environmentKeys)
        {
            throw new Error("Missing Monetate Configuration")
        }
        const accountMonetateSDK = monetateConfigKey.environmentKeys[env.ENVIRONMENT === "dev" ? "uat" : env.ENVIRONMENT]
        return {enableMonetateSDK, accountMonetateSDK}
    } catch (err) {
        BFFLogger.error(err)
        return {enableMonetateSDK: false, accountMonetateSDK: ""}
    }
}

export default getMonetateConfig
