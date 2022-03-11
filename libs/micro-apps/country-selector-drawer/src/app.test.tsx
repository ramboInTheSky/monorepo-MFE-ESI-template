import React from "react"
import {render} from "@testing-library/react"
import {Provider} from "react-redux"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import App from "./app"
import {CountrySelectorInternalProps, CountrySelectorProps} from "./props"
import mockData from "./__mocks__/amido.json"
import {store} from "./ducks"

const props: CountrySelectorProps = {
    realm: "amido",
    territory: "gb",
    language: "en",
    textAlignment: "",
    cdnBaseUrl: "",
    siteUrl: "",
    isInternationalCountry: false,
}

const internalProps: CountrySelectorInternalProps = {
    territory: "",
    flagIconUrl: "",
    textAlignment: "",
    showCountrySelector: true,
    selectDefaultCountry: () => null,
    showOverlay: true,
    isInternationalCountry: true,
    selectedLanguage: "en",
    selectedCountry: mockData.results[0],
    shopNowOnClick: () => null,
    openDrawer: () => null,
    selectLanguage: () => null,
    closePanel: () => null,
    getCountriesListThunk: () => null,
    loaded: true,
    ROWLinkUrl: "",
    redirectPageToAlternativeLanguage: () => null,
    ...props,
}

describe("App component - ", () => {
    it("should match the snapshot template", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Provider store={store}>
                    <App {...internalProps} />
                </Provider>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
