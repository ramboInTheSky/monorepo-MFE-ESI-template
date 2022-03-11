import styled from "styled-components"
import {Link} from "@mui/material"
import {breakpoints} from "@monorepo/themes"

export const TileTitle = styled(Link)`
    height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    text-transform: capitalize;
    text-decoration: none;

    @media (max-width: ${breakpoints.values.lg - 1}px) {
        height: 3em;
        white-space: normal;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        margin-bottom: 0.25rem;

        &:after {
            position: relative;
            content: "";
            border-bottom: 0.0625rem solid #d1d1d1;
            width: 1rem;
            margin: auto;
            display: block;
            bottom: -0.8rem;
        }
    }
`
