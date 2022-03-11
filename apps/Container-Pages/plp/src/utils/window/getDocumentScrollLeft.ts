export function getDocumentScrollLeft(): number {
    return window.pageXOffset || document.documentElement.scrollLeft
}
