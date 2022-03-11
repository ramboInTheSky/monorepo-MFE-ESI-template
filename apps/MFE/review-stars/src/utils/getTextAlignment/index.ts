import {SettingsSdkKeys} from "../../config/settings"

const getTextAlignment = (configuration:any) => {
    if (!configuration) throw new Error("Settings Failure")
    if (configuration[SettingsSdkKeys.Direction]?.Value) {
        return configuration[SettingsSdkKeys.Direction].Value
    }
}

export default getTextAlignment
