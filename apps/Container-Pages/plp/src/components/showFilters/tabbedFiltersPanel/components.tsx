import styled from "styled-components"
import Typography from "@mui/material/Typography"

export const AlphabetSection = styled(Typography)`
    top: 0;
    z-index: 1;
    padding: 0.65rem 1rem;
    min-height: 2.75rem;
    background: ${({theme}) => theme.colours.utilities.backgroundAccent};
    border-top: ${({theme}) => theme.colours.plp.facetDivider};
    border-bottom: ${({theme}) => theme.colours.plp.facetDivider};
`

export const TabbedFilterContainer = styled.div`
    display: block;
`

export const PromotedBrandsContainer = styled(TabbedFilterContainer)``
