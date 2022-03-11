import styled from "styled-components"
import {IN_STOCK, SOLD_OUT} from "../../../../config/constants"

export const ProductDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
    margin-right: 16px;
    font-size: 12px;

    .mt-5px {
        margin-top: 5px;
    }
    .block {
        display: block;
    }
`

export const ProductNameH = styled.h2`
    font-weight: bold;
    font-size: 12px;
    margin-top: 1rem;
`
export const SearchDescription = styled.div`
    color: ${({theme: {colours}}) => colours.text.muted};
`
export const Price = styled.p`
    font-weight: bold;
    text-align: right;
    margin-top: 1rem;
`

export const StatusWrapper = styled.span<{status: string}>`
    font-weight: bold;
    font-size: 12px;
    text-align: right;
    display: block;
    margin-top: 18px;
    color: ${props => {
        switch (props.status) {
            case IN_STOCK:
                return "black"
            case SOLD_OUT:
                return props.theme.colours.text.error
            default:
                return "black"
        }
    }};
`
