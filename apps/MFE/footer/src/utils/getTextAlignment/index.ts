import {SettingsSdkKeys} from "../../models/settings"

const getTextAlignment = (configuration:any) => {
    if (!configuration) throw new Error("Settings Failure")
    if (configuration[SettingsSdkKeys.direction]?.Value) {
        return configuration[SettingsSdkKeys.direction].Value
    }
}

export default getTextAlignment
