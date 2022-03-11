import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import Link from "@mui/material/Link"

export const MainList = styled.ul`
    padding: 0;
    margin: 0;
    width: 100%;

    @media (min-width: ${breakpoints.values.md}px) {
        padding-top: 1rem;
    }

    li {
        margin-bottom: 0.75rem;
        small {
            color: ${props => props.theme.colours.text.muted};
        }
    }
`

export const MainListLink = styled(Link)`
    display: block;
    color: ${props => props.theme.colours.text.default};
    font-size: 0.875rem;
    letter-spacing: 0.12px;
    line-height: 1.5;
    font-weight: 400;

    &:active,
    &:hover,
    &:focus,
    &:visited {
        color: ${props => props.theme.colours.text.default};
    }

    &[href^="tel:"] {
        white-space: unset;
    }

    &:hover {
        text-decoration: underline;
    }

    small {
        font-size: 14px;
    }
`
