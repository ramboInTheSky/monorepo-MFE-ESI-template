import styled from "styled-components"

export type ContainerProps = {
    canScrollLeft: boolean
    canScrollRight: boolean
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
`
export type PositionedChevronProps = {
    isright: boolean
}

export const PositionedChevron = styled.div<PositionedChevronProps>`
    height: 100%;
    position: absolute;
    pointer-events: none;
    right: ${props => (props.isright ? 0 : "unset")};
    z-index: 1;
`
