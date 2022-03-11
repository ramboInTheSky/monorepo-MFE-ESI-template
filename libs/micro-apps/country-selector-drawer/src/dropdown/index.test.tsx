import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import mockCountriesData from "../__mocks__/amido.json"
import {CountrySelectDropdown} from "."

const selectedCountryLTR = {
    countryCode: "DE",
    name: "Germany",
    nameWithCurrency: "Germany (£)",
    isNonStandard: false,
    promotedCountryIndex: 3,
    region: "Europe",
    languages: [
        {
            id: "de",
            default: true,
            targetUrl: "//www.amido.de/de",
            name: "German",
        },
    ],
}

const mockSelectCountry = jest.fn()

const props = {
    territory: "gb",
    textAlignment: "ltr",
    cdnBaseUrl: "http://amido.com",
    chevronIcon: "chevronIcon",
    countriesList: mockCountriesData.results,
    selectedCountry: selectedCountryLTR,
    selectCountry: jest.fn(),
}

describe("Components - CountrySelectDropdown: ", () => {
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CountrySelectDropdown {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when countriesList is populated", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CountrySelectDropdown
                    {...props}
                    countriesList={mockCountriesData.results}
                    selectedCountry={selectedCountryLTR}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when text alignment is right to left", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CountrySelectDropdown {...props} countriesList={mockCountriesData.results} textAlignment="rtl" />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("When clicked to another country from the list, selected country changes", () => {
        const {getByText} = render(
            <ThemeProvider theme={mockTheme}>
                <CountrySelectDropdown
                    {...props}
                    selectCountry={mockSelectCountry}
                    countriesList={mockCountriesData.results}
                    selectedCountry={mockCountriesData.results[2]}
                />
            </ThemeProvider>,
        )
        fireEvent.mouseDown(getByText("Ireland (£)"))
        fireEvent.click(screen.getByText("Germany (£)"))
        expect(mockSelectCountry).toHaveBeenCalled()
    })
    it("When select is opened focused element is Ireland", () => {
        const {getByText} = render(
            <ThemeProvider theme={mockTheme}>
                <CountrySelectDropdown
                    {...props}
                    selectCountry={mockSelectCountry}
                    countriesList={mockCountriesData.results}
                    selectedCountry={mockCountriesData.results[2]}
                />
            </ThemeProvider>,
        )
        fireEvent.mouseDown(getByText("Ireland (£)"))
        expect(document.activeElement?.getAttribute("data-value")).toEqual("IN")
    })
})
