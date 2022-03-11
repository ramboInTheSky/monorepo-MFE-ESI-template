import styled from "styled-components"
import Link from "@mui/material/Link"

export const TitleLink = styled(Link)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    text-transform: capitalize;
    text-decoration: none;
    font-size: 0.875rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    letter-spacing: 0.008rem;
    line-height: 1.313rem;
    margin-bottom: 0.25rem;

    &:hover {
        text-decoration: underline;
    }
`
