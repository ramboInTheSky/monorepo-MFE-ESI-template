export function getDocumentScrollTop(): number {
    return window.pageYOffset || document.documentElement.scrollTop
}
