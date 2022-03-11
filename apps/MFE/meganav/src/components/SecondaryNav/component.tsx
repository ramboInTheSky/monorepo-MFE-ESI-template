import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Container = styled.div`
    width: 100%;
    background: ${props => props.theme.colours.palette.modal.background.primary};
    @media (min-width: ${breakpoints.values.lg}px) {
        display: table;
        max-height: ${props => `calc(100% - ${props.theme.dimensions.PrimaryNav.xs.height})`};
    }
`

export const OuterContainer = styled.div`
    width: 100%;
    height: auto;
    z-index: 2;
`
