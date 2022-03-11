import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {getDocumentScrollTop, isAboveViewport, isBelowViewport, isSomewhatInViewport} from "../../utils/window"
import {useUpScrollPosition} from "./useUpScrollPosition"
import {ScrollDirection} from "./types"

interface InfiniteScrollHelpersHookOptions {
    startPage: number
    totalItems: number
    itemsPerPage: number
    gridContainerElement: HTMLElement | null
}

export function useInfiniteScrollHelpers(options: InfiniteScrollHelpersHookOptions) {
    const lastScrollTopRef = useRef<number>(0)
    const upScrollPosition = useUpScrollPosition(options)
    const waitForPageToRerender = useWaitForPageToRerender(options.totalItems)

    return useMemo(() => {
        const helpers = {
            getScrollDirection: () => {
                let scrollDirection: ScrollDirection
                const scrollTop = getDocumentScrollTop()

                if (scrollTop > lastScrollTopRef.current) {
                    scrollDirection = "DOWN"
                } else {
                    scrollDirection = "UP"
                }
                lastScrollTopRef.current = scrollTop
                return scrollDirection
            },
            isTimeToFetchNextPage: (cueToTriggerFetch: Element) => {
                return isSomewhatInViewport(cueToTriggerFetch) || isAboveViewport(cueToTriggerFetch)
            },
            isTimeToFetchPreviousPage: (cueToTriggerFetch: Element) => {
                return isSomewhatInViewport(cueToTriggerFetch) || isBelowViewport(cueToTriggerFetch)
            },
            restoreUpScrollPosition: () => {
                upScrollPosition.restore()
            },
            waitForPageToRerender,
        }
        return helpers
    }, [waitForPageToRerender, upScrollPosition])
}

function useWaitForPageToRerender(totalItems: number) {
    const oldItemCount = useRef(totalItems)
    const [onAfterRenderer, setOnAfterRenderer] = useState<null | Function>(null)

    const waitForPageToRerender = useCallback(() => {
        oldItemCount.current = totalItems
        return new Promise<void>(resolve => {
            setOnAfterRenderer(() => resolve)
        })
    }, [totalItems, setOnAfterRenderer])

    useEffect(() => {
        if (totalItems > oldItemCount.current && onAfterRenderer) {
            onAfterRenderer()
            setOnAfterRenderer(null)
        }
    }, [totalItems, onAfterRenderer])

    return waitForPageToRerender
}
