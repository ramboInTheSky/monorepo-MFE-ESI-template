import styled from "styled-components"

export const StyledCharacterFilterContainer = styled.div`
    display: flex;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    padding: 1.0625rem 1.0625rem 1.0625rem 1.0625rem;
    margin: 0;
    border-bottom: ${props => props.theme.colours.plp.facetDivider};
`
