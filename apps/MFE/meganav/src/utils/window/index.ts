import {breakpoints} from "@monorepo/themes"

declare global {
    export interface Window {
        appInsights?: any
    }
}

export const IS_BROWSER = () => typeof window !== "undefined"

function getWindow() {
    return IS_BROWSER() ? window : null
}

export const screenIsSmallerThanLarge = () => (IS_BROWSER() ? window.innerWidth < breakpoints.values.lg : false)
export const screenIsBiggerOrEqualToLarge = () => (IS_BROWSER() ? window.innerWidth >= breakpoints.values.lg : false)

export default getWindow
