import styled from "styled-components"

export const Container = styled.h4`
    margin-top: 0;
    margin-bottom: 1rem;
    text-transform: capitalize;
    color: ${props => props.theme.colours.text.default};
    font-size: 0.938rem;
    font-family: ${props => `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
    font-weight: ${props => props.theme.colours.font.primary.medium.weight};
`
