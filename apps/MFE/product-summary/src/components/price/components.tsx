import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

interface PriceLinkProps {
    saleprice: string | null
}

interface PriceTextProps {
    brandNameEnabled: boolean
}

export const PriceContainer = styled.div`
    display: block;
    margin-right: 0.3rem;

    & a {
        // required so price links get focus styles correctly
        display: inline-block;
    }

    @media (min-width: ${breakpoints.values.md}px) {
        display: ${({theme}) => `${theme.enablingCenteredContent ? "block" : "inline-block"}`};
    }
`
export const PriceLink = styled(Link)<PriceLinkProps>`
    margin-right: ${props => (props.saleprice ? "0" : "0.3rem")};
    display: inline-block;
`

export const SalePrice = styled(Typography)<PriceTextProps>`
    margin: ${({brandNameEnabled}) => (brandNameEnabled ? "0rem" : "inherit")};
    color: ${props => props.theme.colours.text.error};
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    font-weight: ${({theme}) => theme.colours.font.primary.medium.weight};
    ${({theme}) =>
        theme.enablingCenteredContent &&
        `
        display: inline-block;
    `}
`

export const WasPrice = styled(Typography)<PriceTextProps>`
    margin: ${({brandNameEnabled}) => (brandNameEnabled ? "0rem" : "inherit")};
    text-decoration: line-through;
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    font-weight: ${({theme}) => theme.colours.font.primary.medium.weight};
    ${({theme}) =>
        theme.enablingCenteredContent &&
        `
        display: inline-block;
    `}
    margin-right: 0.4rem;
`

export const PriceValue = styled(Typography)`
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    font-weight: ${({theme}) => theme.colours.font.primary.medium.weight};
`

export const SmDown = styled.div`
    @media (max-width: ${breakpoints.values.lg - 1}px) {
        display: none;
    }
`
export const MdUp = styled.div`
    display: none;
    @media (max-width: ${breakpoints.values.lg - 1}px) {
        display: inline-flex;
    }
`

export const FromPrice = styled.div`
    font-weight: ${({theme}) => theme.colours.font.primary.regular.weight};
`

export const RectangleDivider = styled.div`
    width: 1rem;
    height: 0.0625rem;
    background-color: gray;
    display: block;
    margin: 0.625rem auto 0.75rem;
`
