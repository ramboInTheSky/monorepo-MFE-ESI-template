import React from "react"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import {MobileHeaderContainer, RelativeContainer} from "./components"
import MobileSort from "../mobileSort"
import ShowFilters from "../showFilters"
import {STICKY_HEADER_SCROLL_TRIGGER} from "../../config/constants"

export const MobileHeader = () => {
    const sticky = useScrollTrigger({threshold: STICKY_HEADER_SCROLL_TRIGGER})
    return (
        <RelativeContainer data-testid="plp-mobile-header">
            <MobileHeaderContainer sticky={sticky}>
                <MobileSort />
                <ShowFilters />
            </MobileHeaderContainer>
        </RelativeContainer>
    )
}

export default MobileHeader
