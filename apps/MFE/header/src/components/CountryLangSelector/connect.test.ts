import {mockState, mockShoppingBag, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import PublishCountrySelectorRedirect from "../../events/countrySelectorRedirect"
import PublishCountrySelectorClosed from "../../events/countrySelectorClosed"
import {setDefaultCountryCode, redirectToAlternativeLanguageThunk} from "../../ducks/country-selector"
import {PublishToModalsClosed} from "../../events/modalsClosed"

jest.mock("../../events/countrySelectorRedirect")
jest.mock("../../events/countrySelectorClosed")
const mockRedirect = jest.fn()
jest.mock("../../ducks/country-selector", () => ({
    openDrawer: jest.fn(),
    closeCountrySelector: jest.fn(),
    getCountriesListThunk: jest.fn(),
    selectLanguage: jest.fn(),
    setDefaultCountryCode: jest.fn(),
    redirectToAlternativeLanguageThunk: jest.fn(() => mockRedirect),
    requestCountryChange: jest.fn(() => true),
}))
jest.mock("../../events/modalsClosed", () => {
    return {
        PublishToModalsClosed: jest.fn(),
    }
})
const expected = {
    territory: "GB",
    isActive: true,
    showCountrySelector: mockState.countrySelector.showCountrySelector,
    language: "en",
    textAlignment: "ltr",
    selectedCountry: null,
    selectedLanguage: null,
    iconUrl: "/static-content/icons/shared/countryflags/gb.png",
    isInternationalCountry: false,
    itemCount: 2,
    showOverlay: true,
    loaded: false,
    ROWLinkUrl: "fakeamido.com/countryselect",
    text: mockText.countryLangSelector,
}

const expectedWithDifferenceTerritoryAndLanguage = {
    ...expected,
    ROWLinkUrl: "fakeamido.com/countryselect",
    territory: "IT",
    iconUrl: "/static-content/icons/shared/countryflags/it.png",
}

describe("Components/Search - Given connect - mergeProps()", () => {
    it("should return required state from mockState", () => {
        const newMockState = {
            ...mockState,
            request: {
                ...mockState.request,
                headers: {
                    ...mockState.request.headers,
                    "x-monorepo-territory": "gb",
                    "x-monorepo-language": "en",
                },
            },
        }
        const got = mapStateToProps(newMockState)
        expect(got).toEqual(expected)
    })
    it("should return required state from mockState with different territory and language", () => {
        const newMockStateWithDifferenceTerritoryAndLanguage = {
            ...mockState,
            request: {
                ...mockState.request,
                headers: {
                    ...mockState.request.headers,
                    "x-monorepo-territory": "it",
                    "x-monorepo-language": "en",
                },
            },
        }
        const got = mapStateToProps(newMockStateWithDifferenceTerritoryAndLanguage)
        expect(got).toEqual(expectedWithDifferenceTerritoryAndLanguage)
    })
    it("should called the dispatch once when closePanel is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, null)
        expect(got.closePanel).toBeTruthy()

        got.closePanel()
        expect(PublishCountrySelectorClosed).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("should called the dispatch once when deleteRecentQueries is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, null)
        expect(got.deleteRecentQueries).toBeTruthy()

        got.deleteRecentQueries()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("should called the dispatch once when getCountriesListThunk is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, null)
        expect(got.getCountriesListThunk).toBeTruthy()

        got.getCountriesListThunk()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("should called the dispatch once when openDrawer is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, null)
        expect(got.openDrawer).toBeTruthy()

        got.openDrawer()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("should called the dispatch once when selectLanguage is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, null)
        expect(got.selectLanguage).toBeTruthy()

        got.selectLanguage("en")
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })

    const selectedCountry = {
        Name: "nl",
        Country: "Netherlands",
        CountryCode: "NL",
        DisplayText: "Netherlands (€)",
        NativeCountryText: "",
        RedirectUrl: "",
        DefaultLanguageName: "nl",
        Languages: [
            {
                Name: "en",
                Value: "English",
                TargetUrl: "http://www.amido.com/nl/en",
                AccountDomainUrl: "account.amido.com/nl/en",
            },
            {
                Name: "nl",
                Value: "Nederlands ",
                TargetUrl: "http://www.amido.com/nl/nl",
                AccountDomainUrl: "account.amido.com/nl/nl",
            },
        ],
        iconUrl: "/static-content/icons/shared/countryflags/nl.png",
        DisplaySequenceAttribute: "",
        PromotedFlagIndex: 0,
        Region: "Europe",
        DomainType: "",
        HideInDropdown: false,
        HideInPage: false,
        IsROW: false,
    }
    it("should call publishToModalsClosed", () => {
        const mockMergeState = {
            ...selectedCountry,
            selectedLanguage: "en",
            language: "en",
            territory: "NL",
            selectedCountry,
        }
        // eslint-disable-next-line
        window = Object.create(window)
        const url = "http://dummyurl.co.uk"
        Object.defineProperty(window, "location", {
            value: {
                href: url,
            },
        })
        const mockDispatch = jest.fn()
        const got = mergeProps(mockMergeState, {dispatch: mockDispatch}, null)
        got.openDrawer(true)
        expect(PublishToModalsClosed).toHaveBeenCalled()
    })

    it("When country is changed and clicked SHOP NOW, it doesn't redirects to country page when there is selectedLanguage", () => {
        const newMockState = {
            ...mockState,
            selectedCountry: {
                ...selectedCountry,
                selectedLanguage: "nl",
                language: "en",
                territory: "EN",
                selectedCountry,
            },
            shoppingBag: {
                ...mockShoppingBag,
                itemCount: 0,
            },
        }
        // eslint-disable-next-line
        window = Object.create(window)
        const url = "http://dummyurl.co.uk"
        Object.defineProperty(window, "location", {
            value: {
                href: url,
            },
        })
        const mockDispatch = jest.fn()
        const got = mergeProps(newMockState, {dispatch: mockDispatch}, null)
        got.shopNowOnClick(0)
        expect(PublishCountrySelectorRedirect).toHaveBeenCalled()
    })
    it("When country is changed and clicked SHOP NOW, it redirects to country page when there is selectedLanguage if the itemCount is 0", () => {
        const newMockState = {
            ...mockState,
            selectedCountry: {
                ...selectedCountry,
                selectedLanguage: "nl",
                language: "en",
                territory: "EN",
                selectedCountry,
            },
            shoppingBag: {
                ...mockShoppingBag,
                itemCount: 0,
            },
        }
        // eslint-disable-next-line
        window = Object.create(window)
        const url = "http://dummyurl.co.uk"
        Object.defineProperty(window, "location", {
            value: {
                href: url,
            },
        })
        const mockDispatch = jest.fn()
        const got = mergeProps(newMockState, {dispatch: mockDispatch}, null)
        got.shopNowOnClick(0)
        expect(PublishCountrySelectorRedirect).toHaveBeenCalled()
    })
    it("When country is changed and clicked SHOP NOW, it redirects to country page when there is selectedLanguage if the itemCount is greater than 0", () => {
        const newMockState = {
            ...mockState,
            selectedCountry: {
                ...selectedCountry,
                selectedLanguage: "fr",
                language: "fr",
                territory: "FR",
                selectedCountry,
            },
            shoppingBag: {
                ...mockShoppingBag,
                itemCount: 1,
            },
        }
        // eslint-disable-next-line
        window = Object.create(window)
        const url = "http://dummyurl.co.uk"
        Object.defineProperty(window, "location", {
            value: {
                href: url,
            },
        })
        const mockDispatch = jest.fn()
        const got = mergeProps(newMockState, {dispatch: mockDispatch}, null)
        got.shopNowOnClick(1)
        expect(mockDispatch).toHaveBeenCalled()
    })
    it("When country is not changed and clicked SHOP NOW, calls the closePanel function", () => {
        const mockMergeState = {
            ...selectedCountry,
            selectedLanguage: "nl",
            language: "nl",
            territory: "NL",
            selectedCountry,
        }
        // eslint-disable-next-line
        const mockDispatch = jest.fn()
        const got = mergeProps(mockMergeState, {dispatch: mockDispatch}, null)
        got.shopNowOnClick(1)
        expect(got.shopNowOnClick).toBeTruthy()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("When selectDefaultCountry is called, it should dispatch the default country action ", () => {
        const mockMergeState = {
            ...selectedCountry,
            selectedLanguage: "nl",
            language: "nl",
            territory: "NL",
            selectedCountry,
        }
        // eslint-disable-next-line
        const mockDispatch = jest.fn()
        const got = mergeProps(mockMergeState, {dispatch: mockDispatch}, null)
        got.selectDefaultCountry("test")
        expect(setDefaultCountryCode).toHaveBeenCalledWith("test")
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("When redirectPageToAlternativeLanguage is called, it should redirect to the alternative language", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, null)
        expect(got.redirectPageToAlternativeLanguage).toBeTruthy()

        got.redirectPageToAlternativeLanguage()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(redirectToAlternativeLanguageThunk())
    })
    it("When country is not changed, but language is, and clicked SHOP NOW, it redirects to country page when there is selectedLanguage if the itemCount is greater than 0", () => {
        const newMockState = {
            ...mockState,
            territory: "NL",
            selectedLanguage: "en",
            language: "nl",
            selectedCountry: {
                ...selectedCountry,
                selectedCountry,
            },
            shoppingBag: {
                ...mockShoppingBag,
                itemCount: 1,
            },
        }
        // eslint-disable-next-line
        window = Object.create(window)
        const url = "http://dummyurl.co.uk"
        Object.defineProperty(window, "location", {
            value: {
                href: url,
            },
        })
        const mockDispatch = jest.fn()
        const got = mergeProps(newMockState, {dispatch: mockDispatch}, null)
        got.shopNowOnClick(1)
        expect(mockDispatch).not.toHaveBeenCalled()
    })
})
