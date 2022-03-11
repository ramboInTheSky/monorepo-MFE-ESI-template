declare global {
    export interface Window {
        appInsights?: any
        platmodflags?: any
        AmidoFavourites?: any
    }
}

export const IS_BROWSER = () => typeof window !== "undefined"

export function getWindow() {
    return IS_BROWSER() ? window : null
}

export default getWindow
