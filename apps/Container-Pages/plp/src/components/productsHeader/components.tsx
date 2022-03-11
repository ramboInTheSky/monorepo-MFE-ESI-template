import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const DesktopHeaderContainer = styled.div<{hide?: boolean}>`
    flex: 1 0 100%;
    padding-bottom: 0.75rem;
    display: flex;
    display: ${({hide}) => (hide ? "none" : "flex")};
    @media (min-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
        width: ${({theme}) => `calc(${theme.dimensions.plpStyleConfig.productWidthSize}% - 1.5rem)`};
        padding-top: 0.75rem;
        transform: translateY(-0.75rem);
        position: fixed;
        background: white;
        z-index: 2;
        max-width: 985px;
        padding-bottom: 0.75rem;
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        width: calc(75% - 1.5rem);
    }
    @media (min-width: ${breakpoints.values.xl}px) {
        width: calc(80% - 1.5rem);
    }

    @media (min-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
        flex: 1 0 ${props => `${100 - props.theme.dimensions.plpStyleConfig.productWidthSize}%`};
    }

    @media (max-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.productWidthSize] - 1}px`}) {
        position: relative;
        width: 100%;
    }
`
