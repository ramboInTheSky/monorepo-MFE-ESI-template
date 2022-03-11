import styled from "styled-components"
import {IN_STOCK, SOLD_OUT} from "../../../../config/constants"

export const PriceParentWrapper = styled.div`
    white-space: nowrap;
    padding-right: 0.938rem;
`

export const StatusWrapper = styled.div<{status: string}>`
    font-family: ${props => `${props.theme.colours.font.primary.regular.family}, ${props.theme.colours.font.default}`};
    margin: 0.25rem 0 0 0;
    font-size: 0.875rem;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    color: ${props => {
        switch (props.status) {
            case IN_STOCK:
                return props.theme.colours.text.success
            case SOLD_OUT:
                return props.theme.colours.text.error
            default:
                return props.theme.colours.text.warning
        }
    }};
`

export const Item = styled.p`
    font-size: 12px;
    font-weight: bold;
    text-align: right;
`
export const ProductDetails = styled.div`
    padding: 1rem 0;
    width: 100%;

    && > p {
        font-family: ${props =>
            `${props.theme.colours.font.primary.regular.family}, ${props.theme.colours.font.default}`};
        color: ${props => props.theme.colours.text.muted};
        word-break: break-all;
        padding-right: 0.613rem;
    }
`
export const ProductDetailItem = styled.div`
    display: flex;
    justify-content: space-between;
    > h3:first-child {
        word-wrap: break-word;
        max-width: 10.3125rem;
        padding-right: 0.625rem;
    }
    > h3:last-child {
        white-space: nowrap;
    }
`
