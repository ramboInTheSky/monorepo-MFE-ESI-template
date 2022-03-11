import styled from "styled-components"
import {Typography} from "@mui/material"
import {breakpoints} from "@monorepo/themes"

export const CategoryQuickLinkRoot = styled.a`
    width: 7.5rem;
    text-decoration: none;

    @media (min-width: ${breakpoints.values.md}px) {
        width: 11.25rem;
    }
`

export const CategoryQuickLinkImageContainer = styled.div`
    width: 7.5rem;
    height: 11.25rem;

    @media (min-width: ${breakpoints.values.md}px) {
        width: 11.25rem;
        height: 16.875rem;
    }
`

export const CategoryQuickLinkImage = styled.img`
    width: 100%;
`

export const CategoryQuickLinkTitle = styled(Typography)`
    font-size: 0.875rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    line-height: 1.3125rem;
    letter-spacing: 0.0075rem;
    margin-top: 0.625rem;
    &:hover {
        text-decoration: underline;
    }
`

export const CategoryQuickLinkDescription = styled(Typography)`
    font-size: 0.875rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    line-height: 1.3125rem;
    letter-spacing: 0.12;
    margin-top: 0.5rem;
`
