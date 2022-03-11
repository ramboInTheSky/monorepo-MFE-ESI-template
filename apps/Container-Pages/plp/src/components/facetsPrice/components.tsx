import {Slider, Typography} from "@mui/material"
import styled from "styled-components"

export const FacetPriceContainer = styled.div`
    width: calc(100% - 2rem);
    margin: auto;
`

export const PriceSliderLabel = styled(Typography)`
    margin-right: -1rem;
`
export const PriceLabel = styled.span`
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
`

export const StyledSlider = styled(Slider)`
    // rail
    & > :nth-child(1) {
        height: 0.1875rem;
        opacity: 1;
        color: #c7c5c5;
    }
    // track
    & > :nth-child(2) {
        height: 0.1875rem;
    }

    // mark start
    & > :nth-child(4) {
        background-color: #c7c5c5;
        height: 0.8125rem;
        width: 0.1875rem;
        margin-top: -0.3125rem;
    }

    // mark label
    & > :nth-child(5) {
        left: 100%;
        font-size: 0.875rem;
        top: 2rem;
        color: ${props => props.theme.colours.text.default};
        font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
        width: 12.5rem;
        padding-left: 5.75rem;
    }

    // mark end
    & > :nth-child(6) {
        background-color: #c7c5c5;
        height: 0.8125rem;
        width: 0.1875rem;
        margin-top: -0.3125rem;
    }

    // mark end label
    & > :nth-child(7) {
        left: 100%;
        font-size: 0.875rem;
        top: 2rem;
        color: ${props => props.theme.colours.text.default};
        font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
        width: 12.5rem;
        padding-right: 5.75rem;
        text-align: right;
    }

    & span[role="slider"] {
        height: 1.5rem;
        width: 1.5rem;
        background-color: #fff;
        border: 0.125rem solid #c7c5c5;
        margin-top: -0.625rem;
        margin-left: -0.75rem;

        &:focus,
        &:hover,
        &:active {
            box-shadow: none;
        }

        &:after {
            inset: 0;
            width: 0.5rem;
            margin: auto;
            height: 0.5rem;
            background-color: #000;
        }

        & span {
            left: calc(-50% + 0.25rem);
        }
    }
`
