import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import {Typography, Grid} from "@mui/material"

export const GridContainer: React.ComponentType<any> = styled(Grid)`
    > div:first-child {
        padding-left: 2rem;
        padding-right: 1.125rem;

        @media (min-width: ${breakpoints.values.xl}px) {
            padding-left: 2.5rem;
        }
    }
`
export const SubRegionGrid: React.ComponentType<any> = styled(Grid)`
    padding: 1rem 1.125rem;
`

export const MainLinksHeader: React.ComponentType<any> = styled(Typography)`
    width: 100%;
`

export const AccordionMainLinks: React.ComponentType<any> = styled(Grid)`
    > div:last-child {
        border-bottom: 0;
        margin-bottom: -1px;
    }
`
