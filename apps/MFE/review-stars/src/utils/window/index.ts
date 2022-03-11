declare global {
    export interface Window {
        appInsights?: any
    }
}

export const IS_BROWSER = () => typeof window !== "undefined"

function getWindow() {
    return IS_BROWSER() ? window : null
}

export default getWindow
