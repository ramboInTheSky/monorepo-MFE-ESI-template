import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {CountrySelector} from "."

const props = {
    textColor: "#000",
    siteUrl: "http://superman.com",
    elements: [
        {
            type: "CountryLink",
            url: "",
            openInNewWindow: false,
            name: "CountryLink",
            icon: "",
            text: "Saudi Arabia",
            accessibilityText: "Saudi Arabia",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        },
        {
            type: "CountryLanguage",
            url: "//www.amido.com/sa/ar",
            openInNewWindow: false,
            name: "CountryLanguage",
            icon: "",
            text: "AR",
            accessibilityText: "Change to Saudi Arabia in Arabic",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        },
        {
            type: "CountryLanguage",
            url: "//www.amido.com/sa/en",
            openInNewWindow: false,
            name: "CountryLanguage",
            icon: "",
            text: "EN",
            accessibilityText: "Change to Saudi Arabia in English",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        },
        {
            type: "CountryLink",
            url: "",
            openInNewWindow: false,
            name: "CountryLink",
            icon: "",
            text: "United Arab Emirates",
            accessibilityText: "United Arab Emirates",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        },
        {
            type: "CountryLanguage",
            url: "//www.amido.com/ae/ar",
            openInNewWindow: false,
            name: "CountryLanguage",
            icon: "",
            text: "AR",
            accessibilityText: "Change to United Arab Emirates in Arabic",
            tooltip: "",
            accessibilityTooltip: "",
            description: "",
            accessibilityDescription: "",
        },
    ],
}

describe("Components - MainLinks/CountrySelector: ", () => {
    it("should match the snapshot template", () => {
        const {asFragment, queryByTestId} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelector {...props} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
        expect(queryByTestId("footer-main-links-country-selector-saudi-arabia-ar")).toBeTruthy()
        expect(queryByTestId("footer-main-links-country-selector-saudi-arabia-en")).toBeTruthy()
        expect(queryByTestId("footer-main-links-country-selector-united-arab-emirates-ar")).toBeTruthy()
    })

    it("should match the snapshot template when there is no languages in CountryLink", () => {
        const customData = {
            ...props,
            elements: [
                {
                    type: "CountryLink",
                    url: "",
                    openInNewWindow: false,
                    name: "CountryLink",
                    icon: "",
                    text: "Saudi Arabia",
                    accessibilityText: "Saudi Arabia",
                    tooltip: "",
                    accessibilityTooltip: "",
                    description: "",
                    accessibilityDescription: "",
                },
            ],
        }
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelector {...customData} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
