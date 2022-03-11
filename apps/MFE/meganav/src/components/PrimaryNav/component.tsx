import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Container = styled.div`
    display: flex;
    justify-content: center;
    height: ${props => props.theme.dimensions.PrimaryNav.xs.height};
    background: ${props => props.theme.colours.header.navLowerBackground.default};
    width: 100%;
    border-top: ${props => props.theme.colours.header.navLowerBackground.border};
    border-bottom: ${props => props.theme.colours.header.navLowerBackground.border};
    @media (min-width: ${breakpoints.values.lg}px) {
        background: ${props => props.theme.colours.header.navLowerBackground.desktop};
    }
`
export const SnailTrailWrapper = styled.div`
    z-index: 1;
    max-width: ${props => props.theme.dimensions.PrimaryNav.xs.width};
    padding: 0;
    width: 100%;

    @media (min-width: ${breakpoints.values.lg}px) {
        background: ${props => props.theme.colours.header.navLowerBackground.desktop};
    }
`
