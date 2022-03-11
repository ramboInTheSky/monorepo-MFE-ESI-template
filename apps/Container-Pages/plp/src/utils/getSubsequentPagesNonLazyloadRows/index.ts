import {SettingsSdkKeys} from "../../models/settings"

const getSubsequentPagesNonLazyloadRows = (configuration: any) => {
    if (!configuration) throw new Error("Settings Failure")

    const subsequentPagesNonLazyloadRows = configuration[SettingsSdkKeys.SubsequentPagesNonLazyloadRows]
    if (subsequentPagesNonLazyloadRows) return subsequentPagesNonLazyloadRows
}

export default getSubsequentPagesNonLazyloadRows
