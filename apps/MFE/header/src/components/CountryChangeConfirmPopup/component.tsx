import {Typography, Button} from "@mui/material"
import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 18rem;
    height: 18.1875rem;
    padding: 1rem;
    background-color: ${({theme}) => theme.colours.form.default.background};
    border: ${({theme}) => theme.colours.utilities.divider};
    border-radius: 0.25rem;

    @media (min-width: ${breakpoints.values.md}px) {
        width: 35rem;
        height: 13.1875rem;
    }
`

export const StyledTitle = styled(Typography)`
    width: 16rem;
    height: 1.625rem;
    margin: 0 0 0.4375rem;
    font-size: 1.0625rem;
    font-weight: bold;
    line-height: 1.5;
    letter-spacing: normal;
`

export const StyledText = styled(Typography)`
    width: 16rem;
    margin: 0.4375rem 0 1rem;
    font-size: 0.875rem;
    font-weight: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: 0.0075rem;

    @media (min-width: ${breakpoints.values.md}px) {
        width: 34rem;
    }
`

export const StyledButtonWrapper = styled.div`
    display: block;

    @media (min-width: ${breakpoints.values.md}px) {
        display: flex;
        flex-direction: row-reverse;
    }
`

export const StyledButtonConfirm = styled(Button)`
    width: 100%;
    font-size: 0.75rem;
    font-weight: ${({theme}) => theme.colours.font.primary.medium.weight};
    letter-spacing: 0.0625rem;
    margin: 0rem 0rem 0.75rem;
    border: 0px;
    color: ${({theme}) => theme.colours.form.buttonPrimary.color};
    opacity: 1;
    border-radius: 0.25rem;
    background: ${({theme}) => theme.colours.form.buttonPrimary.background};
    padding: 0.5625rem 0.5rem;

    @media (min-width: ${breakpoints.values.md}px) {
        width: 12.5rem;
        height: 2.75rem;
        margin: 0rem 1rem;
    }

    &:hover,
    &:active,
    &:focus {
        background: ${({theme}) => theme.colours.form.buttonPrimary.background};
        border: ${({theme}) => theme.colours.form.buttonPrimary.border};
        color: ${({theme}) => theme.colours.form.buttonPrimary.color};
    }
`

export const StyledButtonCancel = styled(Button)`
    width: 100%;
    font-size: 0.75rem;
    font-weight: ${({theme}) => theme.colours.font.primary.medium.weight};
    letter-spacing: 0.0625rem;
    margin: 0px;
    border: 0px;
    color: ${({theme}) => theme.colours.form.buttonSecondary.color};
    opacity: 1;
    border-radius: 0.25rem;
    border: 1px solid black;
    background: ${({theme}) => theme.colours.form.buttonSecondary.background};
    padding: 0.5625rem 0.5rem;

    @media (min-width: ${breakpoints.values.md}px) {
        width: 12.5rem;
        height: 2.75rem;
    }
`
