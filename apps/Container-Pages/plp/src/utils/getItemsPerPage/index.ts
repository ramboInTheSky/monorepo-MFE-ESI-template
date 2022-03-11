import {SettingsSdkKeys} from "../../models/settings"
import {ItemsPerPage} from "../../models/ItemsPerPage"

interface ItemsPerPageConfig {
    [SettingsSdkKeys.ItemsPerPage]: ItemsPerPage | null
}

export const getItemsPerPage = (configuration: ItemsPerPageConfig | null) => {
    if (!configuration) throw new Error("Settings Failure")
    const itemsPerPage = configuration[SettingsSdkKeys.ItemsPerPage]

    if (!itemsPerPage) throw new Error("Feature Settings: items by page is not set up in the feature settings")
    if (!itemsPerPage.initial) throw new Error("Feature Settings: items by page should have initial settings")
    if (!itemsPerPage.subsequent) throw new Error("Feature Settings: items by page should have subsequent settings")

    return itemsPerPage
}
