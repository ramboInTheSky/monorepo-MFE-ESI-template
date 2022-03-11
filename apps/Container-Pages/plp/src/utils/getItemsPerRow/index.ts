import {SettingsSdkKeys} from "../../models/settings"

export const getItemsPerRowConfig = (configuration: any) => {
    if (!configuration) throw new Error("Settings Failure")

    const itemsPerRowConfig = configuration[SettingsSdkKeys.ItemsPerRow]
    if (itemsPerRowConfig) return itemsPerRowConfig
}
