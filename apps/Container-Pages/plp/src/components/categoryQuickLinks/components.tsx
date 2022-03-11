import styled from "styled-components"
import {Typography} from "@mui/material"
import {breakpoints} from "@monorepo/themes"

export const CategoryQuickLinksRoot = styled.div`
    width: 100%;
    & > :not(:first-child) {
        margin-top: 0.875rem;
    }

    /* 
        Lets ensure that the slides are not centered when there 
        are not enough slides to horizontally fill the area 
    */
    & .swiper-container {
        margin-left: 0;
        margin-right: 0;
    }

    & .swiper-wrapper {
        height: auto;
    }

    & .swiper-slide {
        width: 7.5rem;
        @media (min-width: ${breakpoints.values.md}px) {
            width: 11.25rem;
        }

        /*
            Disable the padding on the right for when there are
            not enough slides to horizontally fill the area. If
            it's not disabled, then the chevron will appear at
            side of the image and not on top of the image
        */
        &:last-child {
            margin-right: 0 !important;
        }
    }

    & .swiper-button-prev,
    .swiper-button-next {
        color: #000;
        width: 1.75rem;
        height: 2.25rem;
        background: rgba(255, 255, 255, 1);
        display: none;
        top: 38%;
        &.swiper-button-disabled {
            display: none;
        }
        &:after {
            font-size: 0.875rem;
            font-weight: bold;
        }
        @media (min-width: ${breakpoints.values.lg}px) {
            display: flex;
        }
    }
    & .swiper-button-prev {
        left: 0;
        border-left: 0;
        border-radius: 0 0.5rem 0.5rem 0;
        &:after {
            margin-left: -0.125rem;
        }
    }
    & .swiper-button-next {
        right: 0;
        border-right: 0;
        border-radius: 0.5rem 0 0 0.5rem;
        &:after {
            margin-right: -0.125rem;
        }
    }

    /* IE Specific styles */
    @media all and (-ms-high-contrast: none) {
        & .swiper-button-prev,
        .swiper-button-next {
            position: absolute;
            top: 36%;
            width: 1.6875rem;
            margin-top: -1.375rem;
            z-index: 10;
            cursor: pointer;
            background-size: 1.25rem 1rem;
            background-position: center;
            background-repeat: no-repeat;
        }
        & .swiper-button-prev.swiper-button-disabled,
        .swiper-button-next.swiper-button-disabled {
            opacity: 0.35;
            cursor: auto;
            pointer-events: none;
        }
        & .swiper-button-prev,
        .swiper-container-rtl .swiper-button-next {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
            left: -0.0625rem;
            right: auto;
        }
        & .swiper-button-next,
        .swiper-container-rtl .swiper-button-prev {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
            right: -0.0625rem;
            left: auto;
        }
    }
`

export const CategoryQuickLinksTitle = styled(Typography).attrs({
    component: "h1",
})`
    font-size: 1rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    font-weight: 500;
    line-height: 1.5rem;
    letter-spacing: 0.0075rem;
`

export const CategoryQuickLinkItems = styled.div`
    width: 100%;
    overflow-x: hidden;
    display: flex;
`
