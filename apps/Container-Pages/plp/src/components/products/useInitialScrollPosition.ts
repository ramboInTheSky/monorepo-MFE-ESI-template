import {useEffect, useRef} from "react"
import {calculateScrollTopOfPage} from "../../hooks/useInfiniteScroll/utils"

interface InitialScrollTopHookOptions {
    itemsPerPage: number
    requestedPage: number
    gridContainerElement: HTMLElement | null
    onWillRepositionScroll?: VoidFunction
    onAfterScrollReposition?: VoidFunction
}

/**
 * Sets the initial scrollbar position on the initial page load
 */
export function useInitialScrollPosition({
    itemsPerPage,
    requestedPage,
    gridContainerElement,
    onWillRepositionScroll,
    onAfterScrollReposition,
}: InitialScrollTopHookOptions): void {
    const hasExecuted = useRef(false)

    useEffect(() => {
        if (helpers.shouldBeRepositioned(requestedPage)) {
            if (onWillRepositionScroll) onWillRepositionScroll()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        helpers.disableAutomaticScrollRestoration()
        window.addEventListener("beforeunload", helpers.enableAutomaticScrollRestoration)
        return () => {
            helpers.enableAutomaticScrollRestoration()
            window.removeEventListener("beforeunload", helpers.enableAutomaticScrollRestoration)
        }
    }, [])

    useEffect(() => {
        if (hasExecuted.current || !gridContainerElement || !helpers.shouldBeRepositioned(requestedPage)) return

        const initialScrollTop = helpers.getInitialScrollTop(requestedPage, itemsPerPage, gridContainerElement)
        window.scrollTo(0, initialScrollTop)
        hasExecuted.current = true
        if (onAfterScrollReposition) onAfterScrollReposition()
    }, [itemsPerPage, gridContainerElement, requestedPage, onAfterScrollReposition])
}

function shouldBeRepositioned(requestedPage: number) {
    return requestedPage >= 2 || helpers.getUrlSpecifiedScrollTop()
}

function getInitialScrollTop(requestedPage: number, itemsPerPage: number, gridContainerElement: HTMLElement) {
    const urlScrollTop = helpers.getUrlSpecifiedScrollTop()
    if (urlScrollTop) return urlScrollTop
    if (requestedPage >= 2) return calculateScrollTopOfPage(2, itemsPerPage, gridContainerElement)
    return 0
}

export function getUrlSpecifiedScrollTop(): number | null {
    const scrollTop = Number(window.location.hash.replace("#", ""))
    if (!scrollTop || Number.isNaN(scrollTop)) return null
    return scrollTop
}

function disableAutomaticScrollRestoration() {
    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual"
    }
}

function enableAutomaticScrollRestoration() {
    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto"
    }
}

// These helpers have been setup like this to allow
// them to be spied / mocked out in the test
export const helpers = {
    getInitialScrollTop,
    shouldBeRepositioned,
    getUrlSpecifiedScrollTop,
    enableAutomaticScrollRestoration,
    disableAutomaticScrollRestoration,
}
