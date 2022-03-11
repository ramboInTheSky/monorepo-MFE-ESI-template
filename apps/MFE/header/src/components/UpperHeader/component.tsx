import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export type OuterContainerProps = {
    hide: boolean
    isMobile: boolean
}

export const OuterContainer = styled.div<OuterContainerProps>`
    display: ${({hide, isMobile}) => (hide && isMobile ? "none" : "flex")};
    background-color: ${props => props.theme.colours.header.navUpperBackground.default};
    color: ${props => props.theme.colours.header.navUpperBackground.color};
    height: ${props => props.theme.styles.UpperHeader.xs.height};
    @media (min-width: ${breakpoints.values.md}px) {
        height: ${props => props.theme.styles.UpperHeader.md.height};
    }
    line-height: ${props => props.theme.styles.UpperHeader.xs.lineHeight};
    width: 100%;
    position: relative;
    z-index: 2;
`
