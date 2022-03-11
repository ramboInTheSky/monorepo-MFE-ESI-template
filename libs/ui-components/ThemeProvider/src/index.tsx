/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import {create} from "jss"
import rtl from "jss-rtl"

import {StylesProvider, jssPreset, createGenerateClassName} from "@mui/styles"
import {ThemeProvider, Direction} from "@mui/material"
import {amidoMaterialUITheme, ThemeColor} from "@monorepo/themes"
import {ThemeProvider as StyledComponentsThemeProvider} from "styled-components"

import WithStyleSheet from "./components/withStyleSheet"

interface ThemeProviderProps {
    children: JSX.Element
    themeColor: ThemeColor
    classname: string
    textAlignment: string
    disableGlobal?: boolean
    noRenderer?: boolean
}
// eslint-disable-next-line @typescript-eslint/unbound-method
const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.getElementById)

const createJss = (noRenderer = false) => {
    const options: any = {
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: canUseDOM ? document.getElementById("jss-insertion-point")! : undefined,
    }

    if (noRenderer) {
        options.Renderer = null
    }

    return create(options)
}

const AmidoThemeProvider = ({
    themeColor,
    textAlignment,
    children,
    classname,
    disableGlobal,
    noRenderer,
}: ThemeProviderProps) => {
    const generateClassName = createGenerateClassName({
        productionPrefix: classname,
        disableGlobal,
    })

    return (
        <StylesProvider jss={createJss(noRenderer)} generateClassName={generateClassName}>
            <ThemeProvider theme={amidoMaterialUITheme(themeColor, textAlignment as Direction)}>
                <WithStyleSheet textAlignment={textAlignment}>{children}</WithStyleSheet>
            </ThemeProvider>
        </StylesProvider>
    )
}
AmidoThemeProvider.defaultProps = {
    disableGlobal: false,
    noRenderer: false,
}
export default AmidoThemeProvider

export const SCThemeProvider = ({theme, children}) => (
    <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
)
