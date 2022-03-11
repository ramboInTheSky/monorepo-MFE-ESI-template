import styled from "styled-components"
import Zoom from "@mui/material/Zoom"
import Fab from "@mui/material/Fab"

export const StyledZoom = styled(Zoom)`
    transition-delay: 0.3s;
`

export const StyledFab = styled(Fab)`
    background-color: ${props => props.theme.colours.form.buttonSecondary.color};
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    height: 2.75rem;
    width: 2.75rem;
    z-index: 3;
    &:hover {
        background-color: ${props => props.theme.colours.form.buttonSecondary.color};
    }
`
