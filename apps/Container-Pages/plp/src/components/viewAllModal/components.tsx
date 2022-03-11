import styled from "styled-components"
import {Typography, Toolbar, Modal} from "@mui/material"

export const ModalTitle = styled(Typography)`
    flex-grow: 1;
    text-transform: uppercase;
    letter-spacing: 0.0625rem;
`

export const ModalAppBar = styled.div``

export const ModalToolbar = styled(Toolbar)`
    border-bottom: ${props => props.theme.colours.drawer.headerBorder};
    background-color: ${props => props.theme.colours.drawer.headerBackground};
    padding: 1rem;
    height: 2.75rem;

    & > button {
        float: right;
        padding: 0;
        text-align: right;
        display: block;
    }
`

export const StyledModal = styled(Modal)<any>`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FiltersBody = styled.div`
    display: flex;
`

export const FiltersReview = styled.div`
    display: flex;
    flex-direction: column;
`

export const ModalBody = styled.div`
    background-color: white;
    width: 43.75rem;
    outline: none;
    border-radius: 0;
`

export const ModalConfirmButton = styled.div`
    & > button {
        text-transform: uppercase;
        float: right;
        margin: 1rem;
        width: 8.563rem;
        height: 2rem;

        span {
            font-size: 0.75rem;
            padding: 0.563rem 0.75rem 0.5rem 0.75rem;
            letter-spacing: 0.054rem;
        }
    }
`
