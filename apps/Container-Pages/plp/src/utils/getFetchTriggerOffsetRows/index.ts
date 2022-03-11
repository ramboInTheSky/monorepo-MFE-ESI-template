import {SettingsSdkKeys} from "../../models/settings"
import { Breakpoints } from "../../models/SearchState"

interface FetchTriggerOffsetRowsConfig {
    [SettingsSdkKeys.FetchTriggerOffsetRows]: Breakpoints | null
}

const getFetchTriggerOffsetRows = (configuration?: FetchTriggerOffsetRowsConfig | null) => {
    const fetchTriggerOffsetConfigRows = configuration?.[SettingsSdkKeys.FetchTriggerOffsetRows]
    if (!fetchTriggerOffsetConfigRows) throw new Error("Settings Failure")
    return fetchTriggerOffsetConfigRows
}

export default getFetchTriggerOffsetRows
