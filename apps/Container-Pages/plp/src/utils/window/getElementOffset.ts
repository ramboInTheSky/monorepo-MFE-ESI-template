import {getDocumentScrollTop} from "./getDocumentScrollTop"
import {getDocumentScrollLeft} from "./getDocumentScrollLeft"

interface ElementOffset {
    top: number
    left: number
}

/**
 * Returns the position of the element offsetted from the top left of the window
 */
export function getElementOffset(el: Element): ElementOffset {
    const rect = el.getBoundingClientRect()
    const scrollTop = getDocumentScrollTop()
    const scrollLeft = getDocumentScrollLeft()
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}
