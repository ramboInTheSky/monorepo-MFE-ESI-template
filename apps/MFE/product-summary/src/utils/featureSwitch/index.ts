import {getWindow} from "../window"

export const doGoogleAnalytics = (): boolean => {
    const w = getWindow()
    if (w && w.GoogleAnalyticsNext) return true
    return false
}
