import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"

import {LanguageSelectorQuickLink} from "."

describe("Components - LanguageSelectorQuicklink: ", () => {
    const dataLanguageSelector = {
        type: "LanguageSelector",
        url: "",
        openInNewWindow: false,
        name: "LanguageSelector",
        icon: "/icons/account_circle",
        text: "Select Language",
        accessibilityText: "Select Language",
        tooltip: "Select Language",
        accessibilityTooltip: "Select Language",
        description: "",
        accessibilityDescription: "",
    }

    it("should match the snapshot template", () => {
        const props = {
            data: dataLanguageSelector,
            currentLanguageText: "es",
            altLangaugeName: "zzz",
            altLanguageUrl: "/es",
            currentLanguageName: "zzz",
            siteUrl: "http://abc.superman.com",
            realm: "amido",
            variant: "default",
        }
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <LanguageSelectorQuickLink {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
