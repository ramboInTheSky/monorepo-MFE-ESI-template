import styled from "styled-components"

import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

import {breakpoints} from "@monorepo/themes"

export const RegionContainer = styled(Container)`
    && {
        padding: 0;
    }
`

export const RegionGrid = styled(Grid)`
    border-top: ${props => props.theme.colours.utilities.divider};

    &.SocialMedia {
        background-color: ${props => props.theme.colours.footer.socialMedia.background};
    }
    &.QuickLinks {
        background-color: ${props => props.theme.colours.footer.quickLinks.background};
    }
    &.MainLinks {
        background-color: ${props => props.theme.colours.footer.mainLinks.background};
        border-top: 0;
        @media (min-width: ${breakpoints.values.lg}px) {
            border-top: ${props => props.theme.colours.utilities.divider};
        }
    }
    &.Copyright {
        background-color: ${props => props.theme.colours.footer.copyright.background};
    }
`
