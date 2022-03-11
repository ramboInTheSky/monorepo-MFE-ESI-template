import styled from "styled-components"
import { Link } from "@mui/material"

export const ColourChipListItem = styled.li`
    box-sizing: border-box;
    margin-right: 0.125rem;
    margin-bottom: 0.125rem;
    border: 0.125rem solid #fff;
    border-radius: ${({ theme }) => theme.colours.utilities.chipBorderRadius};
    max-height: 2.25rem;
    max-width: 2.25rem;
    width: calc((100% - 1rem) / 9);
    border-width: 0.0625rem;
    position: relative;

    &.selected {
        border: ${props => props.theme.colours.utilities.activeBorder};

        &:before {
            border-radius: ${({ theme }) => `calc(${theme.colours.utilities.chipBorderRadius} - .125rem)`};
            border: 0.0625rem solid #fff;
            box-sizing: border-box;
            content: "";
            display: block;
            height: 100%;
            position: absolute;
            pointer-events: none;
            width: 100%;
            z-index: 1;
        }
    }
`

export const ColourChipLink = styled(Link)`
    padding-top: 100%;
    border-radius: ${props => props.theme.colours.utilities.chipBorderRadius};
    position: relative;
    display: block;
    // Color value to be part of theme object - PBI23328
    background: #d1d1d1;

    > img {
        max-height: 100%;
        max-width: 100%;
        border-radius: ${props => props.theme.colours.utilities.chipBorderRadius};
        position: absolute;
        top: 0;
        left: 0;
    }
`
