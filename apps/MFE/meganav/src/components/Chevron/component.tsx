import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export type GradientProps = {
    flip: boolean
    isShown: boolean
}

const gradientColor = (background: string): string =>
    `linear-gradient(to right, ${background}, rgba(30, 30, 30, 0) 100%)`

export const Gradient = styled.div<GradientProps>`
    transition: width 0.15s;
    z-index: 3;
    width: ${({isShown}) => (isShown ? "2rem" : "0")};
    height: 100%;
    transform: rotateZ(${({flip}) => (flip ? "180deg" : "0")});
    margin-left: ${({flip}) => (flip ? "-1rem" : "0")};
    margin-right: ${({flip}) => (flip ? "0" : "-1rem")};
    background: ${props => gradientColor(props.theme.colours.header.navLowerBackground.default)};
    @media (min-width: ${breakpoints.values.lg}px) {
        background: ${props => gradientColor(props.theme.colours.header.navLowerBackground.desktop)};
    }
`
export type ContainerProps = {doRotate: boolean}
export const Container = styled.div<ContainerProps>`
    pointer-events: none;
    width: 1rem;
    height: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    transform: rotateY(${({doRotate}) => (doRotate ? "180deg" : "0")});
    z-index: 3;
    && button {
        pointer-events: auto;
        width: 1.5rem;
        border-radius: 0;
        height: 100%;
        padding: 0;
        span:first-child {
            width: auto;
        }
        background: ${props => props.theme.colours.header.navLowerBackground.default};
        @media (min-width: ${breakpoints.values.lg}px) {
            background: ${props => props.theme.colours.header.navLowerBackground.desktop};
        }
    }
`
