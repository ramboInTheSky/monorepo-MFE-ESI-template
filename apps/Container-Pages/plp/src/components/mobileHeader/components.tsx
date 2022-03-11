import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import {STICKY_HEADER_SCROLL_TRIGGER} from "../../config/constants"

export const RelativeContainer = styled.div`
    min-height: ${STICKY_HEADER_SCROLL_TRIGGER}px;
    width: 100%;
    position: relative;

    @media (min-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
        display: none;
    }
`

export const MobileHeaderContainer = styled.div<{sticky: boolean}>`
    background: #ffffff;
    border-bottom: ${props => props.theme.colours.utilities.dividerDark};
    border-radius: 0;
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 1;

    & > div {
        border-left: ${props => props.theme.colours.utilities.dividerDark};
    }
    & > div:first-child {
        border-left: none;
    }

    @media (max-width: ${breakpoints.values.md}px) {
        top: ${({sticky}) => (sticky ? `${STICKY_HEADER_SCROLL_TRIGGER}px` : "")};
    }
`
