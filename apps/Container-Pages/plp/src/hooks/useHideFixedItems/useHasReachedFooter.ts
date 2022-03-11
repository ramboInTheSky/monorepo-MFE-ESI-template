import {useCallback, useEffect, useRef, useState} from "react"

import {
    getWindow,
    addDocumentScrollListener,
    removeDocumentScrollListener,
    getElementById,
    getDocumentScrollTop,
} from "../../utils/window"
import {FOOTER_ID, PLP_ID} from "../../config/constants"

function throttler(func: Function, timeFrame = 50) {
    let lastTime = 0
    return (...args) => {
        const now = Date.now()
        if (now - lastTime >= timeFrame) {
            func(...args)
            lastTime = now
        }
    }
}

export const useHasReachedFooter = () => {
    const [hasReachedFooter, setHasReachedFooter] = useState(false)
    const scrollTopRef = useRef(0)
    const wasScrollingDownRef = useRef(false)

    const calculateHasReachedFooter = useCallback((forceSet = false) => {
        const footerElement = getElementById(FOOTER_ID)
        const plpElement = getElementById(PLP_ID)
        if (!footerElement || !plpElement) return
        const scrollTop = getDocumentScrollTop()
        const isScrollingDown = scrollTop > scrollTopRef.current

        const {top: footerTop} = footerElement.getBoundingClientRect()
        const {height: plpHeight} = plpElement.getBoundingClientRect()
        const {innerHeight: windowInnerHeight} = window
        const isFooterReached = footerTop < windowInnerHeight / 2 && plpHeight > windowInnerHeight / 2

        if (isScrollingDown !== wasScrollingDownRef.current || forceSet) {
            setHasReachedFooter(isFooterReached)
        }

        wasScrollingDownRef.current = isScrollingDown
        scrollTopRef.current = scrollTop
        return isFooterReached
    }, [])

    useEffect(() => {
        const window = getWindow()
        if (!window) return

        calculateHasReachedFooter(true)
        addDocumentScrollListener(throttler(calculateHasReachedFooter))

        return () => {
            removeDocumentScrollListener(calculateHasReachedFooter)
        }
    }, [calculateHasReachedFooter])

    return {
        hasReachedFooter,
        calculateHasReachedFooter,
    }
}
