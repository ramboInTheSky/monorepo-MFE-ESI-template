import styled from "styled-components"
import {Grid} from "@mui/material"
import {breakpoints} from "@monorepo/themes"

const ResultsGrid = styled(Grid)`
    padding: 0.75rem 1.5rem 0 1.5rem;

    @media (max-width: ${breakpoints.values.xl - 1}px) {
        padding: 0.75rem 1rem 0 1rem;
    }

    @media (max-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint] - 1}px`}) {
        padding-top: 1.25rem;
    }

    @media (max-width: ${breakpoints.values.md - 1}px) {
        padding: 0 0rem 0 0rem;
        margin-top: 0.75rem;
    }
`
export default ResultsGrid
