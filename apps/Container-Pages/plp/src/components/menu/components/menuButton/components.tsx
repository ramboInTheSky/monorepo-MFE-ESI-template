import styled from "styled-components"
import {Button} from "@mui/material"

export const StyledMenuButton = styled(Button)`
    width: 100%;
    height: 2.75rem;
    padding: 0;
    text-transform: uppercase;
    background: none;
    background-color: transparent;
    &:hover {
        background-color: transparent;
    }
    &&:focus {
        border: none;
    }
    color: ${props => props.theme.colours.text.default};
`
