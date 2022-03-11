import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import {Typography} from "@mui/material"
import Box from "@mui/material/Box"
import {FACETS_CONTAINER_OFFSET} from "../../config/constants"

export const FilterFlexContainer = styled(Box)<any>`
    min-width: 0;
    position: relative;
    display: none;

    @media (min-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
        display: inherit;
        flex: 1 0 ${props => `${100 - props.theme.dimensions.plpStyleConfig.productWidthSize}%`};
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        flex: 1 0 25%;
    }
    @media (min-width: ${breakpoints.values.xl}px) {
        flex: 1 0 20%;
    }
`
export const FilterContainer = styled.div`
    z-index: 1;
    margin-left: 1rem;
    width: calc(100% - 2rem);
    height: 100%;
`

export const FixedInfoContainer = styled.div<{top: number; hide?: boolean}>`
    background: #ffffff;
    border-bottom: ${({theme}) => theme.colours.plp.facetDivider};
    min-height: 3.75rem;
    margin-bottom: 0.75rem;
    max-width: 13.400625rem;
    padding-top: 1.175rem;
    padding-bottom: 1rem;
    transform: translateY(-0.75rem);
    z-index: 1;

    ${({hide, theme, top}) => {
        if (hide) {
            return `
                display: none;
            `
        }

        return `
            margin-top: ${top > 0 ? top : 0}px;
            position: ${top > 0 ? "absolute" : "fixed"};
            width: ${top > 0 ? "100%" : "calc(20% - 2.5rem)"};
            @media (min-width: ${`${breakpoints.values[theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
                width: ${
                    top > 0
                        ? "calc(100% - 2rem)"
                        : `calc(${theme.dimensions.plpStyleConfig.productWidthSize}% - 2.5rem)`
                };
            }
            @media (min-width: ${breakpoints.values.lg}px) {
                width: ${top > 0 ? "100%" : "calc(25% - 2.5rem)"};
            }
            @media (min-width: ${breakpoints.values.xl}px) {
                width: ${top > 0 ? "calc(100% - 2rem)" : "calc(20% - 2.5rem)"};
            }
        `
    }}
`

export const FiltersContainer = styled.div<{
    absoluteTop: number
    showFixedFacets: boolean
    hide?: boolean
    isFiltersHidden: boolean
    totalProductsHeight: number
}>`
    background: #ffffff;
    max-width: 13.400625rem;
    ${({hide, absoluteTop, theme, showFixedFacets, isFiltersHidden, totalProductsHeight}) => {
        if (hide) {
            return `
                padding-top: ${absoluteTop}px;
                position: relative;
                width: 100%;
            `
        }
        return `
            visibility: ${isFiltersHidden ? "hidden" : "unset"};
            padding-top: ${
                absoluteTop > 0 && !showFixedFacets
                    ? `${absoluteTop}`
                    : `${totalProductsHeight + FACETS_CONTAINER_OFFSET}`
            }px;
            position: ${showFixedFacets ? "fixed" : "relative"};
            width: ${showFixedFacets ? "calc(20% - 2.5rem)" : "100%"};
            @media (min-width: ${`${breakpoints.values[theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
                width: ${
                    showFixedFacets ? `calc(${theme.dimensions.plpStyleConfig.productWidthSize}% - 2.5rem)` : "100%"
                };
            }
            @media (min-width: ${breakpoints.values.lg}px) {
                width: ${showFixedFacets ? "calc(25% - 2.5rem)" : "100%"};
            }
            @media (min-width: ${breakpoints.values.xl}px) {
                width: ${showFixedFacets ? "calc(20% - 2.5rem)" : "100%"};
            }
        `
    }}
`

export const TotalProductsResult = styled.div`
    display: flex;
    justify-content: space-between;
    transform: translateZ(0);
`

export const TotalProductsTitle: any = styled(Typography)`
    white-space: nowrap;
`

export const ClearAllLink = styled.button`
    color: ${({theme}) => theme.colours.text.hyperlink};
    background: none;
    border: none;
    padding: 0;
    text-decoration: none;
    font-size: 0.875rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    line-height: 1.2;
    letter-spacing: 0.008rem;
    cursor: pointer;
    margin-left: 1rem;
    text-align: right;
    margin-top: 0.25rem;

    [dir="rtl"] & {
        margin-left: 0;
        margin-right: 1rem;
        text-align: left;
    }

    &:hover {
        background: none;
        text-decoration: underline;
    }
`
