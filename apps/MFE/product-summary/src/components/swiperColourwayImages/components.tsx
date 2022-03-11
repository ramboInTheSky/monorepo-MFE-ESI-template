import styled from "styled-components"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import {breakpoints} from "@monorepo/themes"

interface TileCardMediaProps {
    component: string
    href: string
    $isPositionAbsolute?: boolean
    tabIndex: number
}

export const SwiperContainer = styled.div`
    overflow: hidden;
    width: 100%;
    padding-top: 150%;
    height: 0;
    position: relative;
    margin-bottom: 0.625rem;

    @media (max-width: ${breakpoints.values.lg - 1}px) {
        margin-bottom: 0.1875rem;
    }

    .product-swiper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
    }

    .swiper-wrapper {
        height: auto;
    }
`

export const TileCardMedia = styled(CardMedia)<TileCardMediaProps>`
    height: auto;
    width: 100%;
    // Color value to be part of theme object - PBI23328
    background: #d1d1d1;
    text-decoration: none;
    position: ${({$isPositionAbsolute: isAbsolute}) => (isAbsolute ? "absolute" : "relative")};
    padding: 0rem;
    top: 0rem;
    display: inline-block;
    // stop the focus ring overflowing the product summary's border and getting cut off
    outline-offset: -0.125rem;
`

export const TileImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
`

export const ThumbsContainer = styled.div<{width: number}>`
    overflow-x: auto;
    margin-bottom: 1.25rem;

    @media (min-width: ${breakpoints.values.md}px) {
        max-width: 25rem;
    }

    @media (min-width: ${breakpoints.values.lg - 130}px) {
        max-width: 30rem;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;

    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        display: none;
    }

    .swiper-container {
        min-width: ${({width}) => width}px;
    }

    .swiper-scrollbar {
        background: none !important;
        height: 0.1875rem !important;
        left: 0 !important;
        bottom: 0 !important;
        width: ${({width}) => width}px !important;
        z-index: 0 !important;
    }

    .thumb-scrollbar {
        background: ${({theme}) => theme.colours.text.default};
        height: 100%;
        min-width: 1.5rem;
    }

    & + div.product-summary-favourites-container {
        bottom: 2.225rem;
    }
`

export const ThumbImageWrapper = styled.div`
    min-width: 1.5rem;
    height: 0.5rem;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
`

export const ThumbImage = styled.img`
    height: auto;
    width: 100%;
`

export const ThumbsComponent = styled.div`
    display: flex;
`

export const NewInLabel = styled(Typography)`
    background-color: ${({theme}) => theme.colours.header.navUpperBackground.default};
    color: ${({theme}) => theme.colours.text.reversed};
    font-size: 0.6875rem;
    font-weight: 500;
    left: 0;
    letter-spacing: 0.0313rem;
    padding: 0.125rem 0.375rem;
    position: absolute;
    text-transform: uppercase;
    top: 0;
    white-space: nowrap;
    z-index: 20;
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    text-decoration: none;
    max-width: 5.75rem;
    margin: 0rem;
`

export const EmptyDivider = styled.div`
    margin-bottom: 0.64rem;

    @media (max-width: ${breakpoints.values.lg - 1}px) {
        margin-bottom: 2.125rem;
    }
`
