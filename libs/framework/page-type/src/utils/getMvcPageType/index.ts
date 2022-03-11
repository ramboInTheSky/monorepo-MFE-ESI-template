declare global {
    export interface Window {
        platmodflags?: any
    }
}

export const getMvcPageType = (): string => window?.platmodflags?.gtmPageType