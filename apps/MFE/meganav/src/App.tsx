import React from "react"
import AmidoThemeProvider, {SCThemeProvider} from "@monorepo/theme-provider"
import {DEFAULT_TEMPLATE, BURGER_MENU_TEMPLATE} from "./config/constants"
import {DefaultMegaNav} from "./compositions/meganav/default-composition"
import BurgerMenuMegaNav from "./compositions/meganav/burgermenu-composition"
import {GlobalStyle} from "./GlobalStyle"
import Theme from "./models/theme"
import {IS_BROWSER} from "./utils/window"
import * as styleSettings from "./style-settings.json"

interface MegaNavProps {
    appScope?: string
    themeColours?: Theme
    realm: string
    textAlignment: string
    themeVersion: string
    template: string
}

const components = {
    [DEFAULT_TEMPLATE]: DefaultMegaNav,
    [BURGER_MENU_TEMPLATE]: BurgerMenuMegaNav,
}
const getComponent = (template: string) => components[template] ?? components[DEFAULT_TEMPLATE]

export const App: React.FC<MegaNavProps> & any = ({
    realm,
    appScope,
    themeColours,
    themeVersion,
    textAlignment,
    template,
}: MegaNavProps) => {
    const scopedCSSClassname = `${appScope ? appScope.split("static")[0].substring(0, 6) : "meganav"}`
    const colours = IS_BROWSER() ? (window as any).themeColours[themeVersion] : themeColours
    const theme: Theme = {dimensions: styleSettings[realm], colours}
    const MeganavComponent = getComponent(template)
    return (
        <SCThemeProvider theme={theme}>
            <section
                dir={textAlignment}
                data-testid="meganav"
                id="platform_modernisation_meganav"
                className="x-monorepo-plat-mod"
            >
                <AmidoThemeProvider
                    themeColor={colours}
                    textAlignment={textAlignment}
                    classname={scopedCSSClassname}
                    disableGlobal
                >
                    <MeganavComponent />
                </AmidoThemeProvider>
            </section>
            <GlobalStyle />
        </SCThemeProvider>
    )
}

export default App
