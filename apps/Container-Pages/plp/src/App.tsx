import React from "react"
import ReactDOM from "react-dom"
import AmidoThemeProvider, {SCThemeProvider} from "@monorepo/theme-provider"
import Plp from "./compositions/plp"
import {GlobalStyle} from "./GlobalStyle"
import {IS_BROWSER} from "./utils/window"
import Theme from "./models/theme"
import {CTA} from "@monorepo/cta"
export interface AppProps {
    isConfError: boolean
    appScope?: string
    themeColours?: Theme
    realm: string
    textAlignment: string
    themeVersion: string
    plpStyleConfig: any
}

export const App: React.FC<AppProps> & any = (props: AppProps) => {
    if (process.env.NODE_ENV !== "production" && IS_BROWSER()) {
        const setupAxe = async () => {
            // eslint-disable-next-line import/no-extraneous-dependencies
            const axe = await import("@axe-core/react")

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            axe.default(React, ReactDOM, 1000)
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setupAxe()
    }

    const colours = IS_BROWSER() ? (window as any).themeColours[props.themeVersion] : props.themeColours

    const theme: Theme = {
        colours,
        dimensions: {
            plpStyleConfig: props.plpStyleConfig,
        },
        direction: props.textAlignment,
    }
    return (
        <SCThemeProvider theme={theme}>
            {props.isConfError ? (
                <div data-testid="error" className="x-monorepo-plat-mod">
                    CONF_ERROR
                </div>
            ) : (
                <AmidoThemeProvider
                    textAlignment={props.textAlignment}
                    themeColor={colours}
                    classname={props.appScope!}
                    disableGlobal
                >
                    <div id="platform_modernisation_plp" className="platform_modernisation_plp x-monorepo-plat-mod">
                        <Plp />
                    </div>
                </AmidoThemeProvider>
            )}
            <GlobalStyle />
        </SCThemeProvider>
    )
}

export default App
