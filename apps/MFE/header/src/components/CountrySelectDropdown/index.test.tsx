import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {mockCountriesData} from "../../../__mocks__/mockCountryData"
import {CountrySelectDropdown} from "."

const selectedCountryLTR = {
    Name: "ae",
    Country: "United Arab Emirates",
    CountryCode: "AE",
    DisplayText: "United Arab Emirates (AED)",
    NativeCountryText: "",
    RedirectUrl: "",
    DefaultLanguageName: "en",
    Languages: [
        {
            Name: "en",
            Value: "English",
            TargetUrl: "http://www.amido.ae/en",
            AccountDomainUrl: "account.amido.ae/en",
        },
        {
            Name: "ar",
            Value: "العربية ",
            TargetUrl: "http://www.amido.ae/ar",
            AccountDomainUrl: "account.amido.ae/ar",
        },
    ],
    iconUrl: "spiderman/platmod/icons/shared/countryflags/ae.png",
    DisplaySequenceAttribute: "",
    PromotedFlagIndex: 0,
    Region: "Middle East / Africa",
    DomainType: "",
    HideInDropdown: false,
    HideInPage: false,
    IsROW: false,
}
const mockSelectCountry = jest.fn()

const props = {
    territory: "gb",
    textAlignment: "ltr",
    countriesList: mockCountriesData,
    selectedCountry: selectedCountryLTR,
    selectCountry: jest.fn(),
}

describe("Components - CountrySelectDropdown: ", () => {
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectDropdown {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when countriesList is populated", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectDropdown
                    {...props}
                    countriesList={mockCountriesData}
                    selectedCountry={selectedCountryLTR}
                />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when text alignment is right to left", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectDropdown {...props} countriesList={mockCountriesData} textAlignment="rtl" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("When clicked to another country from the list, selected country changes", () => {
        const {getByText} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectDropdown
                    {...props}
                    selectCountry={mockSelectCountry}
                    countriesList={mockCountriesData}
                    selectedCountry={mockCountriesData[2]}
                />
            </SCThemeProvider>,
        )
        fireEvent.mouseDown(getByText("United Kingdom (£)"))
        fireEvent.click(screen.getByText("United Arab Emirates (AED)"))
        expect(mockSelectCountry).toHaveBeenCalled()
    })
    it("When select is opened focused element is United Kingdom", () => {
        const {getByText} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountrySelectDropdown
                    {...props}
                    selectCountry={mockSelectCountry}
                    countriesList={mockCountriesData}
                    selectedCountry={mockCountriesData[2]}
                />
            </SCThemeProvider>,
        )
        fireEvent.mouseDown(getByText("United Kingdom (£)"))
        expect(document.activeElement?.getAttribute("data-value")).toEqual("GB")
    })
})
