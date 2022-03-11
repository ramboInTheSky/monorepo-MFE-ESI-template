import styled from "styled-components"
import Grid from "@mui/material/Grid"
import {breakpoints} from "@monorepo/themes"

export const GridContainer = styled(Grid)`
    @media (min-width: ${breakpoints.values.md}px) {
        div:last-child {
            border-left: 0;
            border-right: inherit;
        }
        div.quicklink__wrapper:first-child > a {
            padding-left: 2rem;
            padding-right: 1.125rem;
        }
    }
    @media (min-width: ${breakpoints.values.md}px) and (max-width: ${breakpoints.values.lg - 1}px) {
        div.quicklink__wrapper:nth-child(2n + 2) {
            border-right: 0;
        }
        div.quicklink__wrapper:nth-child(2n + 1) > a {
            padding-left: 2rem;
            padding-right: 1.125rem;
        }
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        div.quicklink__wrapper:last-child {
            border-bottom: 0;
        }
    }
    @media (min-width: ${breakpoints.values.xl}px) {
        div.quicklink__wrapper:first-child > a {
            padding-left: 2.5rem;
            padding-right: 1.125rem;
        }
    }
`

export const QuickLinksWrapper = styled(Grid)`
    border-bottom: ${props => props.theme.colours.utilities.divider};

    @media (min-width: ${breakpoints.values.md}px) {
        border-right: ${props => props.theme.colours.utilities.divider};
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        border-bottom: 0;
    }

    a {
        padding: 0.75rem 1rem;
        display: flex;
        align-items: center;
    }
`
