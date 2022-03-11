import {useCallback, useEffect, useMemo, useRef} from "react"
import {addDocumentScrollListener, removeDocumentScrollListener} from "../../utils/window"
import {useInfiniteScrollHelpers} from "./useInfiniteScrollHelpers"
import {getFetchTriggerElement} from "./utils"
import {DOWN, UP} from "./types"

export interface InfiniteScrollOptions {
    endPage: number
    startPage: number
    totalItems: number
    hasNextPage: boolean
    itemsPerPage: number
    hasPreviousPage: boolean
    isFetchingNextPage: boolean
    isFetchingPreviousPage: boolean
    isFetchingPageItems: boolean
    fetchTriggerOffset?: number
    fetchNextPage: () => Promise<any>
    fetchPreviousPage: () => Promise<any>
    gridContainerElement: HTMLElement | null
    addScrollEventListener?: typeof addDocumentScrollListener
    removeScrollEventListener?: typeof removeDocumentScrollListener
    onBeforeFetchingPreviousPage?: () => void
    onAfterRestoringUpScrollPosition?: () => void
}

export interface InfiniteScrollHookResult {
    handleScroll: () => Promise<void>
}

export function useInfiniteScroll({
    endPage,
    startPage,
    totalItems,
    hasNextPage,
    itemsPerPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isFetchingPageItems,
    gridContainerElement,
    fetchTriggerOffset = 8,
    onBeforeFetchingPreviousPage = noop,
    onAfterRestoringUpScrollPosition = noop,
}: InfiniteScrollOptions): InfiniteScrollHookResult {
    const stateApi = useInfiniteScrollState()
    const helpers = useInfiniteScrollHelpers({
        startPage,
        totalItems,
        itemsPerPage,
        gridContainerElement,
    })

    if (isFetchingPageItems) {
        // we need to remove the fetched page first when filtering the page otherwise it would not trigger the next page
        stateApi.clearFetchedPage()
    }

    const handleScroll = useCallback(async () => {
        if (!gridContainerElement) return

        const {
            hasFetchedPage,
            isFetchingPage,
            flagAsFetchingPage,
            flagAsHavingFetchedPage,
            flagAsNoLongerFetchingPage,
        } = stateApi

        const {
            getScrollDirection,
            waitForPageToRerender,
            isTimeToFetchNextPage,
            isTimeToFetchPreviousPage,
            restoreUpScrollPosition,
        } = helpers

        const scrollDirection = getScrollDirection()
        const nextPage = endPage + 1
        const previousPage = startPage - 1
        const cueToTriggerFetch = getFetchTriggerElement(gridContainerElement, fetchTriggerOffset, scrollDirection)

        if (
            hasNextPage &&
            scrollDirection === DOWN &&
            isTimeToFetchNextPage(cueToTriggerFetch) &&
            !hasFetchedPage(nextPage) &&
            !isFetchingPage(nextPage) &&
            !isFetchingNextPage
        ) {
            flagAsFetchingPage(nextPage)
            const attempt = await attemptTo(fetchNextPage)
            flagAsNoLongerFetchingPage(nextPage)
            if (!attempt.failed) flagAsHavingFetchedPage(nextPage)
        }

        if (
            hasPreviousPage &&
            scrollDirection === UP &&
            isTimeToFetchPreviousPage(cueToTriggerFetch) &&
            !hasFetchedPage(previousPage) &&
            !isFetchingPage(previousPage) &&
            !isFetchingPreviousPage
        ) {
            onBeforeFetchingPreviousPage()
            flagAsFetchingPage(previousPage)
            const attempt = await attemptTo(fetchPreviousPage)
            flagAsNoLongerFetchingPage(previousPage)
            if (!attempt.failed) {
                // By the time it gets to this point, the component
                // would not have re-rendered with the newly fetched
                // items because redux would not yet have triggered
                // the update. So we need to explicitly wait for the
                // the rerender to occur before we reposition the
                // scroll bar, in order to allow the user to continue
                // to scroll up to reveal the newly loaded items
                await waitForPageToRerender()
                restoreUpScrollPosition()
                onAfterRestoringUpScrollPosition()
                flagAsHavingFetchedPage(previousPage)
            }
        }
    }, [
        endPage,
        startPage,
        hasNextPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        onBeforeFetchingPreviousPage,
        onAfterRestoringUpScrollPosition,
        gridContainerElement,
        fetchTriggerOffset,
        stateApi,
        helpers,
    ])

    useEffect(() => {
        addDocumentScrollListener(handleScroll)
        return () => removeDocumentScrollListener(handleScroll)
    }, [handleScroll])

    return {handleScroll}
}

function useInfiniteScrollState() {
    const pagesFetched = useRef<number[]>([])
    const pagesBeingFetched = useRef<number[]>([])

    return useMemo(
        () => ({
            hasFetchedPage: page => {
                return pagesFetched.current.includes(page)
            },
            isFetchingPage: (page: number) => {
                return pagesBeingFetched.current.includes(page)
            },
            flagAsFetchingPage: (page: number) => {
                pagesBeingFetched.current = [...pagesBeingFetched.current, page]
            },
            flagAsHavingFetchedPage: (page: number) => {
                pagesFetched.current = [...pagesFetched.current, page]
            },
            flagAsNoLongerFetchingPage: (page: number) => {
                const newPages = [...pagesBeingFetched.current]
                const indexToRemove = newPages.indexOf(page)
                newPages.splice(indexToRemove, 1)
                pagesBeingFetched.current = newPages
            },
            clearFetchedPage: () => {
                pagesFetched.current = []
            },
        }),
        [],
    )
}

async function attemptTo(fn: Function) {
    let failed = false
    let result
    let error
    try {
        result = await fn()
    } catch (err) {
        failed = true
        error = err
    }
    return {failed, error, result}
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}
