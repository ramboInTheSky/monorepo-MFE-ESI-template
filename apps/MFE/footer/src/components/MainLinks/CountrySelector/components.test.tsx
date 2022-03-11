import React from "react"
import {render, cleanup} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"

import {CountrySelectorLanguageLink, CountrySelectorLanguageList, setLanguagesInElements} from "./components"

describe("Components/MainLinks/CountrySelector - Components", () => {
    afterEach(() => cleanup())
    it("should match the snapshot - CountrySelectorLanguageLink", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectorLanguageLink />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot - CountrySelectorLanguageList", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectorLanguageList>
                    <a href="/">abc</a>
                </CountrySelectorLanguageList>
                ,
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should return AR key on Saudi Arabia CountryLink", () => {
        const elements = [
            {
                type: "CountryLink",
                url: "",
                openInNewWindow: false,
                name: "CountryLink",
                icon: null,
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
                icon: null,
                text: "AR",
                accessibilityText: "Change to Saudi Arabia in Arabic",
                tooltip: "",
                accessibilityTooltip: "",
                description: "",
                accessibilityDescription: "",
            },
        ]

        const expectedResult = [
            {
                accessibilityDescription: "",
                accessibilityText: "Saudi Arabia",
                accessibilityTooltip: "",
                description: "",
                icon: null,
                languages: [
                    {
                        accessibilityDescription: "",
                        accessibilityText: "Change to Saudi Arabia in Arabic",
                        accessibilityTooltip: "",
                        description: "",
                        icon: null,
                        name: "CountryLanguage",
                        openInNewWindow: false,
                        text: "AR",
                        tooltip: "",
                        type: "CountryLanguage",
                        url: "//www.amido.com/sa/ar",
                    },
                ],
                name: "CountryLink",
                openInNewWindow: false,
                text: "Saudi Arabia",
                tooltip: "",
                type: "CountryLink",
                url: "",
            },
        ]
        expect(setLanguagesInElements(elements)).toEqual(expectedResult)
    })

    it("should return United Arab Emirates and Saudi Arabia key on have langauges in", () => {
        const elements = [
            {
                type: "CountryLink",
                url: "",
                openInNewWindow: false,
                name: "CountryLink",
                icon: null,
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
                icon: null,
                text: "AR",
                accessibilityText: "Change to Saudi Arabia in Arabic",
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
                icon: null,
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
                icon: null,
                text: "AR",
                accessibilityText: "Change to United Arab Emirates in Arabic",
                tooltip: "",
                accessibilityTooltip: "",
                description: "",
                accessibilityDescription: "",
            },
        ]

        const expectedResult = [
            {
                accessibilityDescription: "",
                accessibilityText: "Saudi Arabia",
                accessibilityTooltip: "",
                description: "",
                icon: null,
                languages: [
                    {
                        accessibilityDescription: "",
                        accessibilityText: "Change to Saudi Arabia in Arabic",
                        accessibilityTooltip: "",
                        description: "",
                        icon: null,
                        name: "CountryLanguage",
                        openInNewWindow: false,
                        text: "AR",
                        tooltip: "",
                        type: "CountryLanguage",
                        url: "//www.amido.com/sa/ar",
                    },
                ],
                name: "CountryLink",
                openInNewWindow: false,
                text: "Saudi Arabia",
                tooltip: "",
                type: "CountryLink",
                url: "",
            },
            {
                accessibilityDescription: "",
                accessibilityText: "United Arab Emirates",
                accessibilityTooltip: "",
                description: "",
                icon: null,
                languages: [
                    {
                        accessibilityDescription: "",
                        accessibilityText: "Change to United Arab Emirates in Arabic",
                        accessibilityTooltip: "",
                        description: "",
                        icon: null,
                        name: "CountryLanguage",
                        openInNewWindow: false,
                        text: "AR",
                        tooltip: "",
                        type: "CountryLanguage",
                        url: "//www.amido.com/ae/ar",
                    },
                ],
                name: "CountryLink",
                openInNewWindow: false,
                text: "United Arab Emirates",
                tooltip: "",
                type: "CountryLink",
                url: "",
            },
        ]
        expect(setLanguagesInElements(elements)).toEqual(expectedResult)
    })
    it("should return United Arab Emirates and there is no languages key in the object", () => {
        const elements = [
            {
                type: "CountryLink",
                url: "",
                openInNewWindow: false,
                name: "CountryLink",
                icon: null,
                text: "Saudi Arabia",
                accessibilityText: "Saudi Arabia",
                tooltip: "",
                accessibilityTooltip: "",
                description: "",
                accessibilityDescription: "",
            },
        ]

        const expectedResult = [
            {
                accessibilityDescription: "",
                accessibilityText: "Saudi Arabia",
                accessibilityTooltip: "",
                description: "",
                icon: null,
                name: "CountryLink",
                openInNewWindow: false,
                text: "Saudi Arabia",
                tooltip: "",
                type: "CountryLink",
                url: "",
            },
        ]
        expect(setLanguagesInElements(elements)).toEqual(expectedResult)
    })
})
