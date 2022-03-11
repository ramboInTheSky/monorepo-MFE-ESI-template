import styled from "styled-components"

export const Li = styled.li`
    a {
        color: ${props => props.theme.colours.text.default};
        text-decoration: none;
        padding: 0.375rem 0;
        margin: 0.125rem 0;
        display: inline-block;
        font-size: 0.875rem;
        letter-spacing: 0.12px;
        line-height: 1.5;

        > span:first-child {
            text-transform: capitalize;
        }

        &:hover {
            text-decoration: underline;
        }
    }
`
export const Ul = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
