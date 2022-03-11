import {useCallback, useEffect, useRef} from "react"
import {getElementOffset, isSomewhatInViewport} from "../../utils/window"

export interface ScrolledPosition {
    /**
     * The index position of the item being tracked within the page
     * currently being viewed
     *
     * @remarks
     * If the item being used to track the page and scroll position
     * is the 5th item of page 3, then the value of `positionInPage`
     * will be 4 (in accordance with a zero based index)
     */
    positionInPage: number

    /**
     * The position of the tracked item from the top of the viewport
     */
    viewportTop?: number
}

interface UpScrollPositionHookResult {
    /**
     * Restores the scroll position in order to allow for the user
     * to continue to scroll up to reveal the items that have newly
     * loaded as a result of an up scroll
     *
     * @remarks
     * This function should be called after the newly loading items
     * have been rendered
     */
    restore: () => void
}

interface UpScrollPositionHookOptions {
    totalItems: number
    itemsPerPage: number
    gridContainerElement: HTMLElement | null
}

/**
 * A hook that returns an api that can be used to restore the correct
 * scroll position after an up scroll
 *
 * @remarks
 * When an up scroll result in a previous page of items being loaded,
 * the scroll position will shift in a manner that takes the user away
 * for the item currently being viewed. This is the natural browser
 * behavior and it is undesirable. The desired behavior is for the
 * scroll position to appear to remain in tact so that the user can
 * continue to scroll up to reveal the newly loaded page of items.
 * This hook returns an api that can be used to correct / restore
 * the scroll position so that it appears that no shift has taken place
 */
export function useUpScrollPosition({
    totalItems,
    itemsPerPage,
    gridContainerElement,
}: UpScrollPositionHookOptions): UpScrollPositionHookResult {
    const oldTotalItems = useRef(totalItems)
    const scrollPositionBeforeRerender = useRef<ScrolledPosition | null>(null)

    /**
     * Captures the scroll position at a particular point in time
     */
    const capture = useCallback(() => {
        scrollPositionBeforeRerender.current = captureScrollPosition(itemsPerPage, gridContainerElement!)!
    }, [itemsPerPage, gridContainerElement])

    /**
     * Uses the scroll position captured just before the rerender, to
     * Calculate the scroll top value that the viewport should scroll to
     * as part of restoring the scroll position after an up scroll
     */
    const calculate = useCallback(() => {
        const beforeRerender = scrollPositionBeforeRerender.current!
        const positionAfterRerender = beforeRerender.positionInPage + itemsPerPage
        const trackedItem = gridContainerElement!.children[positionAfterRerender]
        const offsetAfterRerender = getElementOffset(trackedItem)
        return offsetAfterRerender.top - beforeRerender.viewportTop!
    }, [itemsPerPage, gridContainerElement])

    /**
     * Restores the scroll position after an up scroll in order to allow
     * the user to continue to scroll up to reveal the newly loaded items
     */
    const restore = useCallback(() => {
        const scrollTop = calculate()
        window.scrollTo(0, scrollTop)
    }, [calculate])

    if (totalItems > oldTotalItems.current) {
        // At this point the newly fetched items have not yet been rendered
        // but it's about to be rendered. So we want to capture the scroll
        // position now before it shifts as a result of the newly fetched
        // items being loaded in at the top. We will use the value captured here
        // to calculate the scroll top value that the viewport should be scrolled
        // to as part of restoring the scroll position after an up scroll
        capture()
    }

    useEffect(() => {
        if (totalItems > oldTotalItems.current) {
            oldTotalItems.current = totalItems
        }
    }, [totalItems])

    return {restore}
}

/**
 * Captures the position of the first grid item that is somewhat in the viewport
 */
export function captureScrollPosition(
    itemsPerPage: number,
    gridContainerElement: HTMLElement,
): ScrolledPosition | null {
    const {children} = gridContainerElement
    for (let i = 0; i < children.length; i += 1) {
        const child = children[i]

        if (isSomewhatInViewport(child)) {
            const pagePos = Math.floor(i / itemsPerPage)
            const localPage = pagePos + 1
            const childRect = child.getBoundingClientRect()
            const viewportTop = childRect.top
            const firstItemInLocalPage = itemsPerPage * localPage - itemsPerPage
            const positionInPage = i - firstItemInLocalPage

            return {positionInPage, viewportTop}
        }
    }

    return null
}
