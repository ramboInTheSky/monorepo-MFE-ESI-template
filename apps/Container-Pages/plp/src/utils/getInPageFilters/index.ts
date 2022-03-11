import {SettingsSdkKeys} from "../../models/settings"
import {InPageFilters} from "../../models/InPageFilters"

interface InPageFiltersConfig {
    [SettingsSdkKeys.InPageFilters]: InPageFilters | null
}

const getInPageFilters = (configuration?: InPageFiltersConfig | null) => {
    const inPageFiltersConfig = configuration?.[SettingsSdkKeys.InPageFilters]
    if (!inPageFiltersConfig) throw new Error("Settings Failure")
    return inPageFiltersConfig
}

export default getInPageFilters
