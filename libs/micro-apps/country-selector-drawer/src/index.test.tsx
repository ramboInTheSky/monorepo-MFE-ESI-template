import React from "react"
import {ThemeProvider} from "@mui/material"
import {render} from "@testing-library/react"
import {ThemeProvider as SCThemeProvider} from "styled-components"
import {mockTheme as theme} from "@monorepo/themes"
import {CountrySelectorDrawer} from "."
import {CountrySelectorProps} from "./props"
import muiTheme from "./__mocks__/mockMUITheme"

const props: CountrySelectorProps = {
    realm: "amido",
    territory: "gb",
    language: "en",
    textAlignment: "",
    cdnBaseUrl: "",
    siteUrl: "",
    isInternationalCountry: false,
}

describe("Country Selector Drawer Package - ", () => {
    it("should match the snapshot template", () => {
        const {asFragment} = render(
            <ThemeProvider theme={muiTheme}>
                <SCThemeProvider theme={theme}>
                    <CountrySelectorDrawer {...props} />
                </SCThemeProvider>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
