import React, {useEffect} from "react"
import {useMediaQuery, useScrollTrigger} from "@mui/material"
import {useDispatch} from "react-redux"
import {useModalsCloseObservable} from "@monorepo/eventservice"
import {breakpoints} from "@monorepo/themes"
import Cookies from "js-cookie"
import {OuterContainer} from "./component"
import {closeAllPanels} from "../../ducks/search"
import {updateRecentQueries} from "../../ducks/recents"
import {
    VISITED_PAGES,
    LOCAL_STORAGE_ACTIVE_DEPT_NAME,
    SEARCH_BLUR_BREAKPOINT,
    STICKY_HEADER_SCROLL_TRIGGER,
} from "../../config/constants"

export const UpperHeaderWrapper = (props: any) => {
    const dispatch = useDispatch()
    const hide = useScrollTrigger({threshold: STICKY_HEADER_SCROLL_TRIGGER})
    const isMobile = useMediaQuery(`(max-width:${breakpoints.values.md}px)`)

    const closePanelsOnBlur = useMediaQuery(`(min-width:${SEARCH_BLUR_BREAKPOINT})`)

    useModalsCloseObservable(closeAllPanels)

    useEffect(() => {
        const visitedPages = JSON.parse(localStorage.getItem(VISITED_PAGES) || "[]")
        if (visitedPages.length > 3) {
            Cookies.remove(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
            localStorage.removeItem(VISITED_PAGES)
        } else {
            visitedPages.push({depth: visitedPages.length})
            localStorage.setItem(VISITED_PAGES, JSON.stringify(visitedPages))
        }
    }, [])

    useEffect(() => {
        dispatch(updateRecentQueries())
    }, [dispatch])

    const handleClick = () => {
        if (!closePanelsOnBlur) return

        dispatch(closeAllPanels())
    }

    return (
        <OuterContainer hide={hide} data-testid="header-upperheader" isMobile={isMobile} onClick={handleClick}>
            {props.children}
        </OuterContainer>
    )
}

export default UpperHeaderWrapper
