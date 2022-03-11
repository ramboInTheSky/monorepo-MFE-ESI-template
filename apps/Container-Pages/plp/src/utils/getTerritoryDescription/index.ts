import {SettingsSdkKeys} from "../../models/settings"

export default function getTerritoryDescription(configuration: any) {
    if (!configuration) throw new Error("Settings Failure")
    if (configuration[SettingsSdkKeys.TerritoryDescription]?.Value) {
        return configuration[SettingsSdkKeys.TerritoryDescription].Value
    }
}
