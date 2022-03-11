import React from "react"
import ReactDOM from "react-dom"
import {ThemeProvider} from "styled-components"
import AmidoThemeProvider from "@monorepo/theme-provider"
import ProductSummary from "./compositions/productSummary"
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
    enablingCenteredContent: boolean
}

export const App: React.FC<AppProps> & any = (props: AppProps) => {
    if (process.env.NODE_ENV !== "production") {
        const setupAxe = async () => {
            // eslint-disable-next-line import/no-extraneous-dependencies
            const axe = await import("@axe-core/react")

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            axe.default(React, ReactDOM, 1000)
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        setupAxe()
    }

    const scopedCSSClassname = `${props.appScope ? props.appScope.split("static")[0].substring(0, 6) : "produc"}`
    const colours = IS_BROWSER() ? (window as any).themeColours[props.themeVersion] : props.themeColours
    const theme: Theme = {
        colours,
        direction: props.textAlignment,
        enablingCenteredContent: props.enablingCenteredContent,
    }

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
                        className="x-monorepo-plat-mod platform_modernisation_product_summary"
                        id={`platform_modernisation_product_summary_${props.itemNumber}`}
                    >
                        <ProductSummary />
                    </section>
                </AmidoThemeProvider>
            )}
        </ThemeProvider>
    )
}

export default App
