import React from "react"
import {InputBase, Divider as MuiDivider} from "@mui/material"
import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import Button from "@mui/material/Button"

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-shrink: 0;
    color: ${props => props.theme.colours.form.input.color};
    background: ${props => props.theme.colours.form.input.background};
    height: ${props => props.theme.styles.SearchBox.xs.height};

    @media (min-width: ${breakpoints.values.md}px) {
        border: ${props => props.theme.colours.form.input.border};
        border-width: ${props => props.theme.styles.SearchBox.md.borderWidth};
        border-radius: ${props => props.theme.colours.form.input.radius};
        width: ${props => props.theme.styles.SearchBox.md.width};
        height: ${props => props.theme.styles.SearchBox.md.height};
    }

    @media (min-width: ${breakpoints.values.md}px) {
        &:focus-within {
            box-shadow: ${props => props.theme.styles.SearchBox.md.boxShadow};
            background: ${props => props.theme.colours.form.input.focusActive.background};

            button {
                &:hover,
                &:active {
                    background: ${props => props.theme.colours.form.input.focusActive.background};
                }
                background: ${props => props.theme.colours.form.input.focusActive.background};
            }
        }
    }

    @media (max-width: ${breakpoints.values.md - 1}px) {
        &:focus-within {
            border: ${props => props.theme.styles.SearchBox.sm.border};
        }
    }
`

export const Form = styled.form`
    height: 100%;
    margin: 0;
    position: relative;
    display: flex;
    width: 100%;
    div {
        margin: 0;
    }
    border-left: 0;
`

export const HiddenLabel = styled.label`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`

export const Input = styled(InputBase)`
    height: 100%;
    width: calc(100% + 2rem);
    input {
        padding: ${props => props.theme.styles.SearchBox.xs.padding};
        width: 100%;
        height: 100%;
        color: ${props => props.theme.colours.form.input.color};
        font-size: 0.875rem;
        &::-ms-clear {
            display: none;
        }

        ::placeholder {
            color: ${props => props.theme.colours.form.input.placeholder};
            opacity: ${props => (props.theme.colours.form.input.placeholder ? 1 : null)};
        }

        @media (min-width: ${breakpoints.values.md}px) {
            padding: ${props => props.theme.styles.SearchBox.md.padding};
        }
    }
`

export const Divider = styled(({...rest}) => <MuiDivider {...rest} />)`
    && {
        display: none;
        background: none;
        @media (min-width: ${breakpoints.values.md}px) {
            border-right: ${props => props.theme.styles.SearchBoxDivider.md.border};
            display: ${props => props.theme.styles.SearchBoxDivider.md.display};
            top: -1px;
            height: calc(100% + 2px);
            position: relative;
        }
    }
`

export const SubmitButton = styled(Button)`
    && {
        width: 3.25rem;
        padding: 0;
        background: ${props => props.theme.colours.form.input.background};
        min-width: auto;
        border: inherit;

        &:hover,
        &:active {
            background: ${props => props.theme.colours.form.input.background};
            border: 0;
        }

        &:focus {
            border: 0;
            border-radius: 0;
        }
    }
`

export const ClearButton = styled.a`
    position: absolute;
    right: 2.8rem;
    color: ${props => props.theme.colours.text.default};
    height: inherit;
    width: 2.5rem;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: ${breakpoints.values.md}px) {
        padding: 0.4375rem 0.5rem;
    }
`

export const Img = styled.img`
    height: ${({theme: {styles}}) => styles.UpperHeader.xs.iconHeight};
`
