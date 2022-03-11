import styled from "styled-components"

export type ContainerProps = {
    isActive: boolean
}

export const Container = styled.div<ContainerProps>`
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    height: 100%;
    text-transform: capitalize;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    font-weight: ${props => (props.isActive ? "normal" : `${props.theme.colours.font.primary.medium.weight}`)};
    font-family: ${props =>
        props.isActive
            ? `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`
            : `${props.theme.colours.font.primary.regular.family}, ${props.theme.colours.font.default}`};
    color: ${props => props.theme.colours.text.default};
    border: ${({isActive}) => (isActive ? "0.063rem solid #000000" : "1px solid #9e9e9e")};
    border-top: ${({isActive}) => (isActive ? "5px solid #30a74b" : "1px solid #9e9e9e")};
    border-bottom: ${({isActive}) => (isActive ? "none" : "0.063rem solid #000000")};
`
