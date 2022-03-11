import React from "react"
import {ThemeProvider} from "styled-components"
import AmidoThemeProvider from "@monorepo/theme-provider"
import ReviewStars from "./compositions/reviewStars"
import {IS_BROWSER} from "./utils/window"

import Theme from "./models/theme"

interface AppProps {
    isConfError: boolean
    itemNumber?: string
    appScope?: string
    themeColours?: Theme
    realm: string
    textAlignment: string
    themeVersion: string
}

export const App: React.FC<AppProps> & any = (props: AppProps) => {
    const scopedCSSClassname = `${props.appScope ? props.appScope.split("static")[0].substring(0, 6) : "produc"}`
    const colours = IS_BROWSER() ? (window as any).themeColours[props.themeVersion] : props.themeColours
    const theme: Theme = {colours}

    return (
        <ThemeProvider theme={theme}>
            {props.isConfError ? (
                <section data-testid="error" className="x-monorepo-plat-mod">
                    ERROR!!
                </section>
            ) : (
                <AmidoThemeProvider
                    themeColor={colours}
                    textAlignment={props.textAlignment}
                    classname={scopedCSSClassname}
                    disableGlobal
                    noRenderer
                >
                    <section
                        className="x-monorepo-plat-mod platform_modernisation_review_stars"
                        id={`platform_modernisation_review_stars_${props.itemNumber}`}
                    >
                        <ReviewStars />
                    </section>
                </AmidoThemeProvider>
            )}
        </ThemeProvider>
    )
}

export default App
