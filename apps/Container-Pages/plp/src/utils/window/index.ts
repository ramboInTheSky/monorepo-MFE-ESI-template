declare global {
    export interface Window {
        appInsights?: any
    }
}

export {getElementOffset} from "./getElementOffset"
export {getDocumentScrollTop} from "./getDocumentScrollTop"
export {getDocumentScrollLeft} from "./getDocumentScrollLeft"
export {getElementById} from "./getElementById"

export function IS_BROWSER(): boolean {
    return typeof window !== "undefined"
}

export function addDocumentScrollListener(listener: Function): void {
    return document.addEventListener("scroll", listener as any)
}

export function removeDocumentScrollListener(listener: Function): void {
    return document.removeEventListener("scroll", listener as any)
}

export function requestAnimationFrame(callback: Function): number {
    return getWindow()!.requestAnimationFrame(callback as any)
}

export function scrollToTop(): void {
    getWindow()!.scrollTo(0, 0)
}

export function isSomewhatInViewport(element: Element): boolean {
    const position = element.getBoundingClientRect()
    if (
        (position.top < 0 && position.bottom > 0) ||
        (position.top >= 0 && position.bottom <= window.innerHeight) ||
        (position.top < window.innerHeight && position.bottom > window.innerHeight)
    ) {
        return true
    }
    return false
}

export function isAboveViewport(element: Element): boolean {
    const position = element.getBoundingClientRect()
    if (position.bottom <= 0) {
        return true
    }
    return false
}

export function isBelowViewport(element: Element): boolean {
    const position = element.getBoundingClientRect()
    if (position.top >= window.innerHeight) {
        return true
    }
    return false
}

export function getWindow(): Window | null {
    return IS_BROWSER() ? window : null
}
