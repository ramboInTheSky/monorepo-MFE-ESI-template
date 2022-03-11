/* eslint-disable react/require-default-props */
import "focus-visible"
import React from "react"
import AmidoThemeProvider, {SCThemeProvider} from "@monorepo/theme-provider"
import {RealmStyles} from "models/regions"
import {DEFAULT_TEMPLATE, BURGER_MENU_TEMPLATE} from "./config/constants"
import {GlobalStyle} from "./GlobalStyle"
import {Section} from "./App.component"
import {IS_BROWSER} from "./utils/window"
import {Theme} from "./models/theme"
import {DefaultHeader} from "./compositions/header/default-composition"
import {BurgerMenuHeader} from "./compositions/header/burgermenu-composition"
import Header from "./compositions/header"
import SkipContent from "./components/SkipContent"

interface MyAppProps {
    appScope: string
    themeColours?: Theme
    styles: RealmStyles
    realm: string
    textAlignment: string
    themeVersion: string
    useDevEsi: boolean
    template: string
}

const components = {
    [DEFAULT_TEMPLATE]: DefaultHeader,
    [BURGER_MENU_TEMPLATE]: BurgerMenuHeader,
}
const getComponent = (template: string) => components[template] ?? components[DEFAULT_TEMPLATE]

export const App: React.FC<MyAppProps> & any = (props: MyAppProps) => {
    const colours = IS_BROWSER() ? (window as any).themeColours[props.themeVersion] : props.themeColours
    const theme: Theme = {styles: props.styles, colours, direction: props.textAlignment}
    const HeaderComponent = getComponent(props.template)
    const headerProps = {...props, headerComponent: HeaderComponent}

    return (
        <SCThemeProvider theme={theme}>
            <AmidoThemeProvider
                textAlignment={props.textAlignment}
                themeColor={colours}
                classname={props.appScope}
                disableGlobal
            >
                <Section id="platform_modernisation_header" className="x-monorepo-plat-mod">
                    <SkipContent />
                    <Header {...headerProps} />
                </Section>
            </AmidoThemeProvider>

            <GlobalStyle />
        </SCThemeProvider>
    )
}

export default App
