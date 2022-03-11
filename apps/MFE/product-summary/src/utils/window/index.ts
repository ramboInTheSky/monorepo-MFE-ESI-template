declare global {
    export interface Window {
        appInsights?: any
        NextFavourites?: any
        GoogleAnalyticsNext?: any
    }
}
export {getElementById} from "./getElementById"

export function IS_BROWSER(): boolean {
    return typeof window !== "undefined"
}

export function getWindow(): Window | null {
    return IS_BROWSER() ? window : null
}
