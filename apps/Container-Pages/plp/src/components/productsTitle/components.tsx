import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import {Typography, Grid} from "@mui/material"

export const StyledProductTitle = styled.div`
    padding: 0 1rem 0 1rem;
    flex-grow: 3;
    flex-basis: 100%;

    @media (max-width: ${breakpoints.values.xl - 1}px) {
        flex-grow: 2;
    }

    @media (max-width: ${breakpoints.values.md - 1}px) {
        padding: 0 1rem 0 1rem;
        max-width: 100vw;
    }

    // apply this styling below for ESI SEO heading h1 element
    h1 {
        font-family: ${({theme: {colours}}) => `${colours.font.primary.medium.family}, ${colours.font.default}`};
        color: ${({theme: {colours}}) => colours.text.default};
        font-size: 1rem;
        letter-spacing: 0.12px;
        line-height: 1.5;
        font-weight: ${({theme: {colours}}) => colours.font.primary.medium.weight};

        margin: auto;

        @media (min-width: ${props =>
                `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
            margin: 0.375rem 0 0rem 0;
        }
    }
`

export const StyledNoResultsFound = styled.span`
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    color: ${({theme: {colours}}) => colours.text.default};
    font-weight: ${({theme: {colours}}) => colours.font.primary.regular.weight};
    display: inline-block;

    max-width: 15rem;
    height: 1.3125rem;
    font-family: AzoSans;
    font-size: 0.875rem;
    line-height: 1.5;
    letter-spacing: 0.0075rem;
`

export const StyledCount = styled.span`
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    color: ${props => props.theme.colours.text.muted};
    display: inline-block;

    @media (min-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint]}px`}) {
        display: none;
    }
`

export const StyledTextWrapper = styled.span`
    display: block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;

    h1 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: capitalize;
    }

    @media (min-width: ${breakpoints.values.sm}px) {
        max-width: 25rem;
    }
`

export const StyledSecondaryText = styled(Typography)`
    font-size: 0.875rem;
    line-height: 1.3125rem;
    letter-spacing: 0.0075rem;
`

export const StyledCapitalizedText = styled.span`
    text-transform: capitalize;
`

export const SearchBannerChevronContainer = styled(Grid)`
    text-align: right;
`
