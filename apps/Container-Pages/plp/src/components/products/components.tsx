import styled from "styled-components"
import {Grid} from "@mui/material"
import {breakpoints} from "@monorepo/themes"

export const ProductsRoot = styled(Grid).attrs({
    container: true,
})`
    position: relative;
    flex: 1 0 80%;
    align-content: flex-start;
    min-width: 0;

    @media (min-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
        flex: 1 0 ${props => `${props.theme.dimensions.plpStyleConfig.productWidthSize}%`};
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        flex: 1 0 75%;
    }

    @media (min-width: ${breakpoints.values.xl}px) {
        flex: 1 0 80%;
    }
`

export const ProductGridWrapper = styled(Grid).attrs({
    container: true,
})<{$largerTopPaddingDesktop?: boolean}>`
    position: relative;
    flex: 1 0 80%;
    align-content: flex-start;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    @media (min-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
        flex: 1 0 ${props => `${100 - props.theme.dimensions.plpStyleConfig.productWidthSize}%`};
        padding-top: ${props => `${props.$largerTopPaddingDesktop ? "4.25" : "4"}rem`};
    }

    @media (min-width: ${breakpoints.values.md}px) {
        padding-left: 0rem;
        padding-right: 0rem;
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        flex: 1 0 75%;
    }

    @media (min-width: ${breakpoints.values.xl}px) {
        flex: 1 0 80%;
    }
`

export const ProductGrid = styled(Grid).attrs({
    container: true,
})`
    position: relative;
    z-index: 0;
`

export const ProductGridItem = styled(Grid).attrs(({theme}) => ({
    item: true,
    xs: 12 / theme.dimensions.plpStyleConfig.itemsPerRow.xs,
    md: 12 / theme.dimensions.plpStyleConfig.itemsPerRow.md,
    lg: 12 / theme.dimensions.plpStyleConfig.itemsPerRow.lg,
    xl: 12 / theme.dimensions.plpStyleConfig.itemsPerRow.xl,
}))`
    padding: 0 1rem 0 1rem;

    @media (max-width: ${breakpoints.values.md - 1}px) {
        padding: 0 0.5rem 0 0.5rem;
    }
`

export const NoResultsContainer = styled.div`
    padding: 1rem;
    flex: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
