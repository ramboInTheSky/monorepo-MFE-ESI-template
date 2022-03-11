import React, {useEffect, useState} from "react"
import {useModalsCloseObservable} from "@monorepo/eventservice"
import touchDevice from "../../utils/is-touch-device"
import connect from "./connect"
import {Container} from "./component"
import SnailItem, {Data} from "../SnailItem"
import TabsScroll from "../Scroller"
import {
    PRIMARY_NAV_ITEM_HOVER_DELAY,
    DRAWER_GAP,
    SELECTED_DEPARTMENT_DETAILS,
    PRIMARY_NAV_SCROLL_ANIMATION_DELAY,
    VISITED_PAGES,
} from "../../config/constants"
import {screenIsSmallerThanLarge, screenIsBiggerOrEqualToLarge} from "../../utils/window"
import {calcScrollOffset} from "../../utils/calculateWindowOffsets"
import {PrimaryNavItem} from "../../models/primary-nav"
import {PublishToModalsClosed} from "../../events/modalsClosed"

type DisplayItem = PrimaryNavItem & {
    classNames: string
}

export type SnailTrailProps = {
    items: DisplayItem[]
    setActiveItem: (index: number, item: {title: string; path: string}) => void
    activeDepartmentIndex: number
    setIsInPrimaryNav: (value: boolean) => void
    dir: string
}

let timerId: any = 0
const clearHoverTimeout = () => clearTimeout(timerId)

export const SnailTrail = ({dir, items, setActiveItem, activeDepartmentIndex, setIsInPrimaryNav}: SnailTrailProps) => {
    const [isProgrammaticScrolling, setIsProgrammaticScrolling] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const isTouchDevice = touchDevice()
    const timeOutDelay = isTouchDevice ? 0 : PRIMARY_NAV_ITEM_HOVER_DELAY

    const snailTrailRef = React.useRef<HTMLUListElement>(null)
    let currentlyActiveSnailItemRef: React.RefObject<HTMLLIElement>

    useEffect(() => {
        setLoaded(true)
    }, [])

    const close = () => {
        setActiveItem(-1, {title: "", path: ""})
    }

    const onScroll = () => {
        if (!isProgrammaticScrolling) {
            close()
        }
    }

    const memoizedCalcScrollOffset = React.useCallback(calcScrollOffset, [])

    const doScroll = (event: React.MouseEvent<EventTarget>, clickedElement: HTMLElement): void => {
        setIsProgrammaticScrolling(true)
        const scrollOffset = memoizedCalcScrollOffset(event, clickedElement, DRAWER_GAP)
        const snailTrailElement = snailTrailRef.current as HTMLElement
        snailTrailElement.scrollLeft += scrollOffset

        delayExecution(() => setIsProgrammaticScrolling(false), PRIMARY_NAV_SCROLL_ANIMATION_DELAY)
    }

    const scrollToPosition = (num: number): void => {
        const snailTrailElement = snailTrailRef.current as HTMLElement
        snailTrailElement.scrollLeft += num
    }

    const delayExecution = (functionToExecute: () => void, delay: number): void => {
        clearHoverTimeout()
        timerId = setTimeout(() => {
            functionToExecute()
            clearHoverTimeout()
        }, delay)
    }

    const setActiveItemAndScroll = (data: Data, event: React.MouseEvent<EventTarget>) => {
        event.persist()
        return () => {
            const {index, item} = data
            const clickedElement = currentlyActiveSnailItemRef.current as HTMLElement
            setActiveItem(index, item)
            doScroll(event, clickedElement)
        }
    }

    const handleClick = (
        event: React.MouseEvent<EventTarget>,
        ref: React.RefObject<HTMLLIElement>,
        data: Data,
    ): void => {
        currentlyActiveSnailItemRef = ref
        if (screenIsSmallerThanLarge() || isTouchDevice) {
            event.preventDefault()
            if (data.index === activeDepartmentIndex) {
                close()
            } else {
                PublishToModalsClosed()
                setIsInPrimaryNav(true)
                setActiveItemAndScroll(data, event)()
            }
        } else if (data.index === activeDepartmentIndex) {
            localStorage.removeItem(VISITED_PAGES)
            localStorage.setItem(
                SELECTED_DEPARTMENT_DETAILS,
                JSON.stringify({path: data.item.path, dept: data.item.title.toLowerCase()}),
            )
        } else {
            currentlyActiveSnailItemRef = ref
            setIsInPrimaryNav(true)
            event.preventDefault()
            const {index, item} = data
            setActiveItem(index, item)
            PublishToModalsClosed()
        }
    }

    useModalsCloseObservable(close)

    const handleMouseEnter = (
        event: React.MouseEvent<EventTarget>,
        ref: React.RefObject<HTMLLIElement>,
        data: Data,
    ): void => {
        currentlyActiveSnailItemRef = ref

        if (screenIsBiggerOrEqualToLarge()) {
            const functionToExecuteLater = setActiveItemAndScroll(data, event)
            delayExecution(functionToExecuteLater, timeOutDelay)
            setIsInPrimaryNav(true)
            PublishToModalsClosed()
        }
    }

    const handleKeyboardEnter = (
        event: React.KeyboardEvent<EventTarget>,
        ref: React.RefObject<HTMLLIElement>,
        data: Data,
    ): void => {
        if (event.key !== "Enter") {
            return
        }

        if (screenIsBiggerOrEqualToLarge()) {
            if (data.index !== activeDepartmentIndex) {
                currentlyActiveSnailItemRef = ref

                setIsInPrimaryNav(true)
                event.preventDefault()
                const {index, item} = data
                setActiveItem(index, item)
                PublishToModalsClosed()
            }
        }
    }

    const handleMouseLeave = (_event: React.MouseEvent<EventTarget>) => {
        clearHoverTimeout()
        setIsInPrimaryNav(false)
    }
    return (
        <TabsScroll dir={dir} snailTrailRef={snailTrailRef} onMouseLeave={handleMouseLeave}>
            <Container
                ref={snailTrailRef}
                onScroll={onScroll}
                data-testid="snail-trail-container"
                id="snail-trail-container"
                loaded={loaded}
            >
                {items.map(({target, title, path, linkColour, fontWeight, fontFamily, classNames}, index) => {
                    const props = {
                        index,
                        isActive: activeDepartmentIndex === index,
                        target,
                        title,
                        path,
                        handleClick,
                        handleMouseEnter,
                        handleKeyboardEnter,
                        scrollToPosition,
                        linkColour,
                        fontWeight,
                        fontFamily,
                        classNames,
                    }
                    return <SnailItem key={title} {...props} total={items.length} />
                })}
            </Container>
        </TabsScroll>
    )
}

export default connect(SnailTrail)
