import {SettingsSdkKeys} from "../../models/settings"
import env from "../../config/env"
import BFFLogger from "../../server/core/BFFLogger"

interface UCMConfig {
    enableucmSDK: boolean
    dataDomainScriptGuid: string
    autoLanguageDetection: boolean
}

const getUCMConfig = (configuration: any): UCMConfig => {
    try {
        const enableucmSDK = configuration[SettingsSdkKeys.userConsentManagement]?.Value as boolean
        if (!enableucmSDK) {
            return {enableucmSDK: false, dataDomainScriptGuid: "", autoLanguageDetection: false}
        }

        const dataDomainScriptGuid =
            configuration[SettingsSdkKeys.userConsentManagement]?.options?.dataDomainScriptGuid[
                env.ENVIRONMENT !== "live" ? "conv" : env.ENVIRONMENT
            ]
        if (!dataDomainScriptGuid) throw new Error("Missing One Trust dataDomainScriptGuid")

        const autoLanguageDetection = configuration[SettingsSdkKeys.userConsentManagement]?.options?.autoLanguageDetection
        return {enableucmSDK, dataDomainScriptGuid, autoLanguageDetection}
    } catch (err) {
        BFFLogger.error(err)
        return {enableucmSDK: false, dataDomainScriptGuid: "", autoLanguageDetection: false}
    }
}

export default getUCMConfig
