import {Typography} from "@mui/material"
import styled from "styled-components"

export const Container = styled.div`
    position: fixed;
    bottom: 0.625rem;
    right: 0.625rem;
    width: 16.5rem;
    padding: 1rem;
    background-color: ${({theme}) => theme.colours.form.default.background};
    border: ${({theme}) => theme.colours.utilities.divider};
    border-radius: 0.25rem;
`

export const StyledTitle = styled(Typography)`
    padding-bottom: 0.35rem;
`

export const Link = styled.a`
    color: ${({theme}) => theme.colours.text.default};
    text-decoration: underline;
`

export const StyledIcon = styled.img`
    position: absolute;
    right: 0.625rem;
    top: 0.625rem;
    cursor: pointer;
`
