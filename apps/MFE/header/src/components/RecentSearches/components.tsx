import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Li = styled.li`
    width: 100%;

    a {
        color: ${props => props.theme.colours.text.default};
        text-decoration: none;
        padding: 0.375rem 0.5rem 0.375rem 0;
        margin: 0.125rem 0;
        display: inline-block;
        font-size: 0.875rem;
        line-height: 1.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        @media (min-width: ${breakpoints.values.md}px) {
            width: 16.875rem;
        }
        :hover {
            text-decoration: underline;
        }
    }
`

export const Ul = styled.ul`
    @media (max-width: ${breakpoints.values.md}px) {
        width: 100%;
    }
`
