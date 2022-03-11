import styled from "styled-components"

export type ContainerProps = {
    rotationDegrees: number
    width: number
}

export const Container = styled.img<ContainerProps>`
    transform: ${({rotationDegrees}) => `rotateZ(${rotationDegrees}deg)`};
    cursor: pointer;
    width: ${({width}) => `${width}rem`};
`
