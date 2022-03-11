import React from "react"
import {ThemeProvider as SCThemeProvider} from "styled-components"
import {ThemeProvider} from "@material-ui/core/styles"
import {mockTheme as theme} from "@monorepo/themes"
import muiTheme from "./__mocks__/mockMUITheme"

import {CountrySelectorDrawer} from "."

export default {
    title: "Country Selector Drawer",
    component: CountrySelectorDrawer,
    decorators: [
        Story => (
            <ThemeProvider theme={muiTheme}>
                <SCThemeProvider theme={theme}>
                    <Story />
                </SCThemeProvider>
            </ThemeProvider>
        ),
    ],
    argTypes: {
        realm: "amido",
        territory: "GB",
        language: "en",
        textAlignment: {
            control: {
                type: "select",
                options: ["ltr", "rtl"],
            },
            defaultValue: "ltr",
        },
        cdnBaseUrl: "https://xcdn.amido.com/content/platmod",
        siteUrl: "",
        isInternationalCountry: false,
    },
}

const Template = args => <CountrySelectorDrawer {...args} />

export const CountrySelectorDrawerExample = Template.bind({})
CountrySelectorDrawerExample.args = {
    realm: "amido",
    territory: "GB",
    language: "en",
    cdnBaseUrl: "https://xcdn.amido.com/content/platmod",
    siteUrl: "",
    isInternationalCountry: false,
}
