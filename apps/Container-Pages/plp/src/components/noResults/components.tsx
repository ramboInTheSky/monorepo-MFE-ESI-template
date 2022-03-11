import styled from "styled-components"

export const Italic = styled.i`
    font-family: ${({theme}) => `${theme.colours.font.primary.italic.family}, ${theme.colours.font.default}`};
    font-weight: normal;
`
export const List = styled.ul`
    padding-inline-start: 1.25rem;
`

export const ListItem = styled.li`
    padding-bottom: 0.75rem;
`
