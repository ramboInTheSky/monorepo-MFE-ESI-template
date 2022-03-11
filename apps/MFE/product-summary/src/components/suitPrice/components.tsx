import styled from "styled-components"
import Link from "@mui/material/Link"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.375rem;
`

export const PriceLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    font-size: 0.875rem;
    line-height: 1.313rem;

    &:hover {
        text-decoration: underline;
    }
`

export const PriceLabel = styled.span`
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    letter-spacing: 0.008rem;
`

export const PriceValue = styled.span`
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    font-weight: ${props => props.theme.colours.text.fontWeightBold};
    letter-spacing: 0.008rem;
`

export const PriceContainer = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const WasPriceValue = styled(PriceValue)`
    text-decoration: line-through;
`
export const SalePriceValue = styled(PriceValue)`
    color: ${props => props.theme.colours.text.error};
`
