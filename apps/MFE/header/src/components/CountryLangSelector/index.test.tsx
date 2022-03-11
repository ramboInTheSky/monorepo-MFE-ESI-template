import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Provider} from "react-redux"
import {
    useCountrySelectorOpenObservable,
    useModalsCloseObservable,
    useCountrySelectorRedirectToAlternativeLanguageObservable,
} from "@monorepo/eventservice"
import {CountryLangSelector} from "."
import mockStore, {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {mockCountriesData} from "../../../__mocks__/mockCountryData"
import {LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

jest.mock("@monorepo/eventservice")

jest.mock("../../events/modalsClosed")

const props = {
    territory: "gb",
    textAlignment: "ltr",
    iconUrl: "spiderman/platmod/icons/shared/countryflags/gb.png",
    isActive: true,
    showCountrySelector: true,
    countriesList: null,
    isInternationalCountry: false,
    itemCount: 1,
    selectedLanguage: "en",
    selectedCountry: {
        Name: "gb",
        Country: "United Kingdom",
        CountryCode: "GB",
        DisplayText: "United Kingdom (£)",
        NativeCountryText: "",
        RedirectUrl: "",
        DefaultLanguageName: "en",
        Languages: [
            {
                Name: "en",
                Value: "English",
                TargetUrl: "//www.amido.com",
                AccountDomainUrl: "www.amido.com/",
            },
        ],
        iconUrl: "spiderman/platmod/icons/shared/countryflags/gb.png",
        DisplaySequenceAttribute: "",
        PromotedFlagIndex: 1,
        Region: "Europe",
        DomainType: "",
        HideInDropdown: false,
        HideInPage: false,
        IsROW: false,
    },
    shopNowOnClick: jest.fn(),
    openDrawer: jest.fn(),
    closePanel: jest.fn(),
    selectLanguage: jest.fn(),
    getCountriesListThunk: jest.fn(),
    selectDefaultCountry: jest.fn(),
    deleteRecentQueries: jest.fn(),
    loaded: false,
    ROWLinkUrl: "amido.com/countryselect",
    showOverlay: false,
    redirectPageToAlternativeLanguage: jest.fn(),
    text: mockText.countryLangSelector,
}
const mockOnClick = jest.fn()
const mockSelectLanguage = jest.fn()

describe("Components - CountryLangSelector: ", () => {
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector {...props} />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when international country", () => {
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector {...props} isInternationalCountry />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("When country is not changed and clicked SHOP NOW, onClick to be called", () => {
        const {getByTestId} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector {...props} shopNowOnClick={mockOnClick} showCountrySelector />
                </SCThemeProvider>
            </Provider>,
        )
        fireEvent.click(getByTestId("country-selector-CTA-button"))
        expect(mockOnClick).toHaveBeenCalled()
    })

    it("should call useModalsCloseObservable", () => {
        ;(useModalsCloseObservable as any).mockImplementationOnce(cb => {
            cb("useModalsCloseObservable")
        })
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector
                        {...props}
                        selectLanguage={mockSelectLanguage}
                        showCountrySelector
                        selectedCountry={mockCountriesData[0]}
                    />
                </SCThemeProvider>
            </Provider>,
        )
        expect(useModalsCloseObservable).toHaveBeenCalled()
    })

    it("When clicked to another language, seleced language changes", () => {
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector
                        {...props}
                        selectLanguage={mockSelectLanguage}
                        showCountrySelector
                        selectedCountry={mockCountriesData[0]}
                    />
                </SCThemeProvider>
            </Provider>,
        )

        fireEvent.click(screen.getByTestId("country-selector-language-button-1"))
        expect(mockSelectLanguage).toHaveBeenCalled()
    })

    it("should subscribe to the country selector open event", () => {
        ;(useCountrySelectorOpenObservable as any).mockImplementationOnce(cb => {
            cb({isoCountryCode: "test"})
        })

        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector {...props} />
                </SCThemeProvider>
            </Provider>,
        )

        expect(useCountrySelectorOpenObservable).toHaveBeenCalled()
        expect(props.selectDefaultCountry).toHaveBeenCalledWith("test")
        expect(props.openDrawer).toHaveBeenCalledWith(false)
    })

    it("should subscribe to the language redirect events", () => {
        ;(useCountrySelectorRedirectToAlternativeLanguageObservable as any).mockImplementationOnce(cb => {
            cb()
        })

        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector {...props} />
                </SCThemeProvider>
            </Provider>,
        )

        expect(useCountrySelectorRedirectToAlternativeLanguageObservable).toHaveBeenCalled()
        expect(props.redirectPageToAlternativeLanguage).toHaveBeenCalled()
    })

    it("When the country flag is clicked, it should open the drawer", () => {
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector
                        {...props}
                        selectLanguage={mockSelectLanguage}
                        showCountrySelector
                        selectedCountry={mockCountriesData[0]}
                    />
                </SCThemeProvider>
            </Provider>,
        )

        fireEvent.click(screen.getByTestId("header-country-lang-flag"))
        expect(props.openDrawer).toHaveBeenCalledWith(true)
    })
    it("should remove localStorage when clicked", () => {
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector
                        {...props}
                        selectLanguage={mockSelectLanguage}
                        showCountrySelector
                        selectedCountry={mockCountriesData[0]}
                    />
                </SCThemeProvider>
            </Provider>,
        )

        fireEvent.click(screen.getByTestId("country-selector-CTA-button"))
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
    it("should call deleteRecentQueries function when clicked", () => {
        render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <CountryLangSelector
                        {...props}
                        selectLanguage={mockSelectLanguage}
                        showCountrySelector
                        selectedCountry={mockCountriesData[0]}
                    />
                </SCThemeProvider>
            </Provider>,
        )

        fireEvent.click(screen.getByTestId("country-selector-CTA-button"))
        expect(props.deleteRecentQueries).toHaveBeenCalled()
    })
})
