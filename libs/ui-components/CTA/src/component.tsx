import React from "react"
import {Button as MUIButton} from "@mui/material"
import styled from "styled-components"
import {Theme} from "@monorepo/themes"

interface MuiButtonProps {
    themeType: string
    theme: Theme
    showOpacity: boolean
}

const MaterialButton = ({theme, themeType, showOpacity, children, ...rest}) => (
    <MUIButton {...rest}>{children}</MUIButton>
)

export const Button = styled(MaterialButton)<MuiButtonProps>`
    && {
        width: 100%;
        height: 100%;
        font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.0625rem;
        margin: 0;
        border: ${({theme, themeType}) => theme.colours.form[`button${themeType}`].border};
        color: ${({showOpacity, theme, themeType}) =>
            showOpacity ? theme.colours.form[`button${themeType}`].color : "black"};
        opacity: ${({showOpacity}) => (showOpacity ? 0.5 : 1)};
        border-radius: ${({theme, themeType}) => theme.colours.form[`button${themeType}`].radius};
        background-color: ${({theme, themeType}) => theme.colours.form[`button${themeType}`].background};
        :hover {
            background-color: ${({theme, themeType}) => theme.colours.form[`button${themeType}`].background};
        }
        :focus {
            background-color: ${({theme, themeType}) => theme.colours.form[`button${themeType}`].background};
        }
        padding: 0.5625rem 0.5rem;
    }
    span {
        color: ${({theme, themeType}) => theme.colours.form[`button${themeType}`].color};
        text-transform: uppercase;
    }
`
