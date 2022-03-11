import useMediaQuery from "@mui/material/useMediaQuery"
import {useSelector} from "react-redux"
import {breakpoints} from "@monorepo/themes"
import {useRef, useState, useCallback, useEffect, MutableRefObject} from "react"

import {selectShouldFacetsBeFixed} from "../../ducks/search"
import {getElementInnerDimensions} from "../../utils/getElementInnerDimensions"
import {FACETS_CONTAINER_OFFSET} from "../../config/constants"
import {
    getWindow,
    getDocumentScrollTop,
    addDocumentScrollListener,
    removeDocumentScrollListener,
    requestAnimationFrame,
} from "../../utils/window"

interface UseShowFacets {
    infoContainerTop: number
    facetAbsoluteTop: number
    containerRef: MutableRefObject<HTMLDivElement | null>
    facetsContainerRef: MutableRefObject<HTMLDivElement | null>
    infoContainerRef: MutableRefObject<HTMLDivElement | null>
    showFixedFacets: boolean
    showOpenFilterBtn: boolean
    underlayElementHeight: number
    handleOpenFilterBtnClick: VoidFunction
    totalProductsHeight: number
    totalProductsRef: MutableRefObject<HTMLDivElement | null>
}

export function useShowFilters(hasReachedFooter: boolean): UseShowFacets {
    const lgScreenBreakPoint = useMediaQuery(`(min-width:${breakpoints.values.lg}px)`)
    const facetsContainerRef = useRef<HTMLDivElement | null>(null)
    const scrollTopRef = useRef(0)
    const infoContainerRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const windowWidthRef = useRef(getWindow()?.innerWidth ?? 0)
    const [facetAbsoluteTop, setFacetAbsoluteTop] = useState(0)
    const [underlayElementHeight, setUnderlayElementHeight] = useState(0)
    const [infoContainerTop, setInfoContainerTop] = useState(0)
    const [showOpenFilterBtn, setShowOpenFilterBtn] = useState(false)
    const [showFixedFacets, setShowFixedFacets] = useState(false)
    const shouldFacetsBeFixed = useSelector(selectShouldFacetsBeFixed)
    const oldShouldFacetsBeFixed = useRef(shouldFacetsBeFixed)
    const hadReachedFooterRef = useRef(hasReachedFooter)
    const [totalProductsHeight, setTotalProductsHeight] = useState(0)
    const totalProductsRef = useRef<HTMLDivElement | null>(null)

    const openFixedFacets = useCallback(() => {
        setShowOpenFilterBtn(false)

        if (hasReachedFooter) {
            setFacetAbsoluteTop(0)
        } else {
            setFacetAbsoluteTop(getDocumentScrollTop() + totalProductsHeight + FACETS_CONTAINER_OFFSET)
        }
        setShowFixedFacets(false)
        setUnderlayElementHeight(0)
        setInfoContainerTop(0)
        hadReachedFooterRef.current = hasReachedFooter
    }, [hasReachedFooter, totalProductsHeight])

    useEffect(() => {
        const height: number =
            totalProductsRef.current?.clientHeight === undefined ? 0 : totalProductsRef.current.clientHeight
        setTotalProductsHeight(height)
    }, [totalProductsRef.current?.clientHeight])

    const handleScroll = useCallback(() => {
        if (hasReachedFooter) {
            setShowOpenFilterBtn(false)
        }
        requestAnimationFrame(() => {
            if (
                shouldFacetsBeFixed ||
                hasReachedFooter ||
                !facetsContainerRef.current ||
                !infoContainerRef.current ||
                !containerRef.current
            )
                return

            const scrollTop = getDocumentScrollTop()
            const {innerWidth} = getWindow()!
            const isSameWindowWidth = windowWidthRef.current === innerWidth
            const isScrollingDown = scrollTop > scrollTopRef.current
            const containerHeight = containerRef.current.clientHeight - infoContainerRef.current.offsetHeight
            const {height} = getElementInnerDimensions(facetsContainerRef.current)
            const relativeScrollHeight = height + facetAbsoluteTop

            if (containerHeight > scrollTop) {
                setInfoContainerTop(0)
            } else if (containerHeight) {
                setInfoContainerTop(scrollTop)
            }

            if (isScrollingDown && facetAbsoluteTop < scrollTop && isSameWindowWidth) {
                setShowFixedFacets(false)
                setUnderlayElementHeight(0)
                setShowOpenFilterBtn(scrollTop - relativeScrollHeight + FACETS_CONTAINER_OFFSET >= 0)
            } else if (!isScrollingDown && scrollTop !== scrollTopRef.current) {
                if (facetAbsoluteTop > scrollTop && isSameWindowWidth) {
                    setShowFixedFacets(true)
                    setFacetAbsoluteTop(scrollTop)
                    if (!underlayElementHeight) {
                        setUnderlayElementHeight(facetsContainerRef.current?.clientHeight + scrollTop)
                    }
                } else if (relativeScrollHeight < scrollTop && isSameWindowWidth) {
                    setFacetAbsoluteTop(scrollTop - height)
                }
                setShowOpenFilterBtn(false)
            }

            scrollTopRef.current = scrollTop
            windowWidthRef.current = innerWidth
        })
    }, [facetAbsoluteTop, shouldFacetsBeFixed, hasReachedFooter, underlayElementHeight])

    useEffect(() => {
        if (shouldFacetsBeFixed) {
            oldShouldFacetsBeFixed.current = shouldFacetsBeFixed
            openFixedFacets()
        }

        if (!shouldFacetsBeFixed && oldShouldFacetsBeFixed.current && !hadReachedFooterRef.current) {
            oldShouldFacetsBeFixed.current = false
            setFacetAbsoluteTop(getDocumentScrollTop())
        }
    }, [shouldFacetsBeFixed, openFixedFacets])

    useEffect(() => {
        if (shouldFacetsBeFixed || oldShouldFacetsBeFixed.current) {
            return
        }

        const scrollTop = getDocumentScrollTop()
        if (scrollTop > 0) {
            setFacetAbsoluteTop(scrollTop)
            setShowFixedFacets(true)
            setShowOpenFilterBtn(false)
        }
    }, [lgScreenBreakPoint, shouldFacetsBeFixed])

    useEffect(() => {
        addDocumentScrollListener(handleScroll)

        return () => {
            removeDocumentScrollListener(handleScroll)
        }
    }, [handleScroll])

    return {
        containerRef,
        infoContainerTop,
        facetAbsoluteTop,
        facetsContainerRef,
        infoContainerRef,
        showFixedFacets,
        showOpenFilterBtn,
        handleOpenFilterBtnClick: openFixedFacets,
        underlayElementHeight,
        totalProductsHeight,
        totalProductsRef,
    }
}
