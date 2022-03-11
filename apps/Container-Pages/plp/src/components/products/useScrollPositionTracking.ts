import {HISTORY_EVENT} from "../../config/constants"
import {useOnScrollEnd} from "../../hooks/useOnScrollEnd"
import {getElementOffset, isSomewhatInViewport} from "../../utils/window"

export interface ScrolledPageInfo {
    /**
     * The page value when the count starts from one
     *
     * @remarks
     * For instance, if page 4 and 5 is loaded and you are viewing
     * page 4, then the `localPage` value will be 1. And if you are
     * viewing page 5, then the `localPage` value will be 2 etc.
     */
    localPage: number

    /**
     * The page being viewed
     *
     * @remarks
     * For instance, if page 4 to 8 is loaded and you are viewing page
     * 6, then the `actualPage` value will be 6
     */
    actualPage: number

    /**
     * The index position of the item being tracked within the page
     * currently being viewed
     *
     * @remarks
     * If the item being used to track the page and scroll position
     * is the 5th item of page 3, then the value of `positionInPage`
     * will be 5 (in accordance with a zero based index)
     */
    positionInPage: number

    /**
     * The index position of the item being tracked, within the entire
     * collection of items
     *
     * @remarks
     * For instance, if the item being used to track the page and
     * scroll position is the 50th item in the entire collection
     * of items, then the value of `positionInItems` will be 50
     * (in accordance with a zero based index)
     */
    positionInItems: number
}

interface ScrolledPageUrlTrackingProps {
    startPage: number
    itemsPerPage: number
    gridContainerElement: HTMLElement | null
}

/**
 * Persists the page and scroll position to the
 * url as the page is scrolled
 */
export function useScrollPositionTracking({
    startPage,
    itemsPerPage,
    gridContainerElement,
}: ScrolledPageUrlTrackingProps) {
    useOnScrollEnd(() => {
        if (!gridContainerElement || !gridContainerElement.children.length) return

        const scrolledPageInfo = helpers.getScrolledPageInfo(startPage, itemsPerPage, gridContainerElement)
        const scrollTopToPersist = helpers.calculateScrollTopToPersist(
            scrolledPageInfo,
            gridContainerElement,
            itemsPerPage,
        )
        if (scrollTopToPersist === null) return
        const replacementUrl = helpers.createReplacementUrl(scrolledPageInfo, scrollTopToPersist)

        helpers.replaceCurrentBrowserUrl(replacementUrl)
    }, [startPage, itemsPerPage, gridContainerElement])
}

export function getScrolledPageInfo(
    startPage: number,
    itemsPerPage: number,
    gridContainerElement: HTMLElement,
): ScrolledPageInfo {
    let actualPage = 0
    let positionInPage = 0
    let positionInItems = 0
    let localPage = 0

    const {children} = gridContainerElement

    for (let i = children.length - 1; i >= 0; i -= 1) {
        const child = children[i]
        if (isSomewhatInViewport(child)) {
            const pagePos = Math.floor(i / itemsPerPage)
            localPage = pagePos + 1
            actualPage = startPage + pagePos
            positionInItems = i
            const firstItemInLocalPage = itemsPerPage * localPage - itemsPerPage
            positionInPage = i - firstItemInLocalPage
            break
        }
    }

    return {localPage, actualPage, positionInPage, positionInItems}
}

function calculateScrollTopToPersist(
    scrolledPageInfo: ScrolledPageInfo,
    gridContainerElement: HTMLElement,
    itemsPerPage: number,
) {
    const {localPage, positionInPage, positionInItems} = scrolledPageInfo
    const equivElementPos = localPage === 1 ? positionInPage : positionInPage + itemsPerPage
    const equivElement = gridContainerElement.children[equivElementPos]
    if (!equivElement) return null

    const equivElementOffset = getElementOffset(equivElement)
    const actualElement = gridContainerElement.children[positionInItems]
    const actualElementRect = actualElement.getBoundingClientRect()
    return equivElementOffset.top - actualElementRect.top
}

function createReplacementUrl(scrolledPageInfo: ScrolledPageInfo, scrollTopToPersist: number) {
    const {actualPage} = scrolledPageInfo
    const baseUrlPath = window.location.href.split("#")[0]
    const url = new URL(baseUrlPath)
    const {searchParams} = url
    searchParams.set("p", actualPage.toString())

    url.search = searchParams.toString()

    // price filtered - need to decode the query
    const decodeUrl = decodeQueryParam(`${url.toString()}#${scrollTopToPersist}`)
    return decodeUrl
}

function decodeQueryParam(p) {
    return decodeURIComponent(p.replace(/\+/g, " "))
}

function replaceCurrentBrowserUrl(url: string) {
    window.history.replaceState({url, type: HISTORY_EVENT}, "", url)
}

// To allow for the helper functions
// to be mocked out in tests
export const helpers = {
    getScrolledPageInfo,
    createReplacementUrl,
    replaceCurrentBrowserUrl,
    calculateScrollTopToPersist,
}
