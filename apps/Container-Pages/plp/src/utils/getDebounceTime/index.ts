import {SettingsSdkKeys} from "../../models/settings"

const getDebounceTime = (configuration: any) => {
    if (!configuration) throw new Error("Settings Failure")
    if (configuration[SettingsSdkKeys.DebounceTime]?.Value) {
        return configuration[SettingsSdkKeys.DebounceTime].Value
    }
}

export default getDebounceTime
