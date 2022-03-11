import React from "react"
import {ThemeColor} from "@monorepo/themes"
import AmidoThemeProvider, {SCThemeProvider} from "@monorepo/theme-provider"
import Footer from "./compositions/footer"
import {GlobalStyle} from "./GlobalStyle"
import Copyright from "./components/Copyright"
import {IS_BROWSER} from "./utils/window"

interface MyAppProps {
    isConfError: boolean
    appScope?: string
    themeVersion: string
    themeColours?: Theme
    textAlignment: string
    realm: string
}

type Theme = {
    colours: ThemeColor
}

export const App: React.FC<MyAppProps> & any = (props: MyAppProps) => {
    const scopedCSSClassname = `${props.appScope ? props.appScope.split("static")[0].substring(0, 6) : "footer"}`
    const colours = IS_BROWSER() ? (window as any).themeColours[props.themeVersion] : props.themeColours
    const theme: Theme = {colours}

    return (
        <SCThemeProvider theme={theme}>
            <div className="App">
                {props.isConfError ? (
                    <div
                        id="platform_modernisation_footer"
                        className="x-monorepo-plat-mod"
                        style={{fontFamily: "AzoSansRegular", textAlign: "center"}}
                    >
                        <Copyright />
                    </div>
                ) : (
                    <AmidoThemeProvider
                        themeColor={colours}
                        textAlignment={props.textAlignment}
                        classname={scopedCSSClassname}
                        disableGlobal
                    >
                        <div className="x-monorepo-plat-mod" id="platform_modernisation_footer">
                            <Footer {...props} />
                        </div>
                    </AmidoThemeProvider>
                )}
                <GlobalStyle />
            </div>
        </SCThemeProvider>
    )
}

export default App
