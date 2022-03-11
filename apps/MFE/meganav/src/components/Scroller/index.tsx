import React, {useState, useCallback, useEffect, ElementRef, ReactNode} from "react"
import Chevron from "../Chevron"
import {Container, PositionedChevron} from "./component"
import touchDevice from "../../utils/is-touch-device"
import {calcPrimaryNavLinkMetrics} from "../../utils/calculatePrimaryNavPadding"

type Ref = ElementRef<any>
export type TabsScrollProps = {
    dir: string
    snailTrailRef: Ref
    children: ReactNode
    onMouseLeave: (e: any) => any
}

export const TabsScroll = ({dir, snailTrailRef, children, onMouseLeave}: TabsScrollProps) => {
    const [canScrollRight, setCanScrollRight] = useState(false)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const isTouchDevice = touchDevice()
    const setChevronVisibility = useCallback((): void => {
        if (snailTrailRef) {
            const snailTrailElement = snailTrailRef.current as HTMLElement

            const scrollLeftPixels = Math.abs(snailTrailElement.scrollLeft)
            // We can scroll left if there is room on the left to scroll
            // Chrome has a rounding issue in rtl mode where this ends up being 1px off,
            const scrollLeft = scrollLeftPixels - 1 > 0

            // scrollRight doesn't exist, so calculate total width - how far we have scrolled + the display width
            const scrollRight =
                snailTrailElement.scrollWidth - (scrollLeftPixels + snailTrailElement.clientWidth) - 1 > 0

            setCanScrollRight(scrollRight)
            setCanScrollLeft(scrollLeft)
        }
    }, [snailTrailRef])

    useEffect(() => {
        if (!canScrollRight || !isTouchDevice) {
            return
        }

        let resizeTimer
        const debounceObserver = () => {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(() => {
                calcPrimaryNavLinkMetrics()
            }, 50)
        }

        window.addEventListener("resize", debounceObserver)

        return () => {
            window.removeEventListener("resize", debounceObserver)
        }
    }, [canScrollRight, isTouchDevice])

    useEffect(() => {
        setChevronVisibility()
        window.addEventListener("resize", setChevronVisibility)

        return function cleanup() {
            window.removeEventListener("resize", setChevronVisibility)
        }
    }, [setChevronVisibility])

    const handleScroll = (): void => {
        setChevronVisibility()
    }

    const handleChevronClick = (placement: string): void => {
        const snailTrailElement = snailTrailRef.current as HTMLElement

        const {width: snailTrailMaxWidth} = snailTrailElement.getBoundingClientRect()
        const amountOfPixelsToScrollBy = snailTrailMaxWidth / 2

        if (placement === "right") {
            // if there is only one chevron visible
            // then scroll the header as screen width minus the width of a chevron
            snailTrailElement.scrollLeft += amountOfPixelsToScrollBy // - (!canScrollLeft ? CHEVRON_WIDTH : 0)
        } else {
            snailTrailElement.scrollLeft -= amountOfPixelsToScrollBy // - (!canScrollRight ? CHEVRON_WIDTH : 0)
        }
    }

    const isRTL = dir === "rtl"
    const rightPlacement = isRTL ? "left" : "right"
    const leftPlacement = isRTL ? "right" : "left"

    const hijackClickRight = () => {
        handleChevronClick(rightPlacement)
    }

    const hijackClickLeft = () => {
        handleChevronClick(leftPlacement)
    }

    return (
        <Container
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onScroll={handleScroll}
            onMouseLeave={onMouseLeave}
        >
            <PositionedChevron isright={false}>
                <Chevron show={canScrollLeft} isRTL={isRTL} placement="left" handleClick={hijackClickLeft} />
            </PositionedChevron>
            {children}
            <PositionedChevron isright>
                <Chevron show={canScrollRight} isRTL={isRTL} placement="right" handleClick={hijackClickRight} />
            </PositionedChevron>
        </Container>
    )
}

export default TabsScroll
