import {getElementOffset} from "../../utils/window"
import {ScrollDirection, UP} from "./types"

/**
 * Returns the element that must be in the viewport before the fetch for the next or previous
 * page is triggered
 *
 * @remarks
 * For instance, when scrolling down a page that contains 24
 * elements, the fetch cue by default will be the 16th element in the grid. And when scrolling up,
 * it will be the 9the element in the grid. In other words, the user will have to have scrolled
 * down to the 16th element or scrolled up to the 9th element before the next or previous page of
 * data is fetched respectively
 *
 * @param containerElement - The container element to search for the fetch cue
 * @param offset - The position either from the top or from the bottom of the child elements in the container
 * @param scrollDirection - The scroll direction
 */
export function getFetchTriggerElement(
    containerElement: HTMLElement,
    offset: number,
    scrollDirection: ScrollDirection,
): Element {
    const {children} = containerElement
    const elementIdx = (scrollDirection === UP ? offset + 1 : children.length - offset) - 1
    return containerElement.children[elementIdx]
}

export function calculateScrollTopOfPage(page: number, itemsPerPage, gridContainerElement: HTMLElement): number {
    const itemIdx = itemsPerPage * page - itemsPerPage
    const item = gridContainerElement.children[itemIdx]
    const itemRect = item.getBoundingClientRect()
    const itemOffset = getElementOffset(item)
    return itemOffset.top - itemRect.height / 2
}
