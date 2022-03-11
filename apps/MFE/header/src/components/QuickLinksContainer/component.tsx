import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Container = styled.div`
    && a:hover,
    a {
        color: ${props => props.theme.colours.header.navUpperBackground.color};
    }

    @media (min-width: ${breakpoints.values.md}px) {
        display: ${props => props.theme.styles.Quicklinks.md.display};
        align-items: center;
    }
`
