import {SettingsSdkKeys} from "../../models/settings"
import {FetchTriggerOffset} from "../../models/FetchTriggerOffset"

interface FetchTriggerOffsetConfig {
    [SettingsSdkKeys.FetchTriggerOffset]: FetchTriggerOffset | null
}

const getFetchTriggerOffset = (configuration?: FetchTriggerOffsetConfig | null) => {
    const fetchTriggerOffsetConfig = configuration?.[SettingsSdkKeys.FetchTriggerOffset]
    if (!fetchTriggerOffsetConfig) throw new Error("Settings Failure")
    return fetchTriggerOffsetConfig
}

export default getFetchTriggerOffset
