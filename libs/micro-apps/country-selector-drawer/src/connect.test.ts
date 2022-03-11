import {mockState} from "./__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import PublishCountrySelectorRedirect from "./events/countrySelectorRedirect"
import PublishCountrySelectorClosed from "./events/countrySelectorClosed"
import {setDefaultCountryCode, redirectToAlternativeLanguageThunk} from "./ducks"
import {PublishToModalsClosed} from "./events/modalsClosed"

jest.mock("./events/countrySelectorRedirect")
jest.mock("./events/countrySelectorClosed")
const mockRedirect = jest.fn()
jest.mock("./ducks", () => ({
    openDrawer: jest.fn(),
    closeCountrySelector: jest.fn(),
    getCountriesListThunk: jest.fn(),
    selectLanguage: jest.fn(),
    setDefaultCountryCode: jest.fn(),
    redirectToAlternativeLanguageThunk: jest.fn(() => mockRedirect),
}))
jest.mock("./events/modalsClosed", () => {
    return {
        PublishToModalsClosed: jest.fn(),
    }
})
const expected = {
    territory: "GB",
    showCountrySelector: mockState.showCountrySelector,
    language: "en",
    textAlignment: "ltr",
    selectedCountry: null,
    selectedLanguage: null,
    flagIconUrl: "cdnBaseUrl/icons/shared/countryflags/gb.png",
    isInternationalCountry: false,
    showOverlay: true,
    loaded: false,
    ROWLinkUrl: "siteurl/countryselect",
}

describe("Components/Search - Given connect - mergeProps()", () => {
    const props = {
        realm: "amido",
        territory: "gb",
        language: "en",
        textAlignment: "ltr",
        cdnBaseUrl: "cdnBaseUrl",
        siteUrl: "siteUrl",
        isInternationalCountry: false,
        showCountrySelector: true,
    }
    it("should return required state from mockState", () => {
        const newMockState = {
            ...mockState,
        }
        const got = mapStateToProps(newMockState, props)
        expect(got).toEqual(expected)
    })
    it("should called the dispatch once when closePanel is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, props)
        expect(got.closePanel).toBeTruthy()

        got.closePanel()
        expect(PublishCountrySelectorClosed).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("should called the dispatch once when getCountriesListThunk is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, props)
        expect(got.getCountriesListThunk).toBeTruthy()

        got.getCountriesListThunk()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("should called the dispatch once when openDrawer is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, props)
        expect(got.openDrawer).toBeTruthy()

        got.openDrawer()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("should called the dispatch once when selectLanguage is called", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, props)
        expect(got.selectLanguage).toBeTruthy()

        got.selectLanguage("en")
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })

    const selectedCountry = {
        countryCode: "NL",
        name: "Netherlands",
        nameWithCurrency: "Netherlands (€)",
        isNonStandard: false,
        promotedCountryIndex: 1,
        region: "Europe",
        languages: [
            {
                id: "en",
                targetUrl: "//www.amido.com",
                name: "English",
            },
            {
                name: "nl",
                default: true,
                value: "Nederlands",
                targetUrl: "http://www.amidodirect.com/nl/nl",
                accountDomainUrl: "account.amidodirect.com/nl/nl",
            },
        ],
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
        const got = mergeProps(mockMergeState, {dispatch: mockDispatch}, props)
        got.openDrawer(true)
        expect(PublishToModalsClosed).toHaveBeenCalled()
    })

    it("When country is changed and clicked SHOP NOW, it redirects to country page when there is selectedLanguage", () => {
        const mockMergeState = {
            ...selectedCountry,
            selectedLanguage: "nl",
            language: "en",
            territory: "EN",
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
        const got = mergeProps(mockMergeState, {dispatch: mockDispatch}, props)
        got.shopNowOnClick()
        expect(PublishCountrySelectorRedirect).toHaveBeenCalled()
        expect(window.location.href).toBe("http://www.amidodirect.com/nl/nl")
    })
    it("When country is changed and clicked SHOP NOW, it redirects to country page En", () => {
        const mockMergeState = {
            ...selectedCountry,
            selectedLanguage: props,
            language: "en",
            territory: "EN",
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
        const got = mergeProps(mockMergeState, {dispatch: mockDispatch}, props)
        got.shopNowOnClick()
        expect(PublishCountrySelectorRedirect).toHaveBeenCalled()
        expect(window.location.href).toBe("http://www.amidodirect.com/nl/nl")
    })
    it("When country is not changed and clicked SHOP NOW, calls the closePanel function", () => {
        const mockMergeState = {
            ...selectedCountry,
            selectedLanguage: "nl",
            language: "nl",
            territory: "NL",
            selectedCountry,
        }
        const newProps = {
            ...props,
            territory: "NL",
            language: "nl",
        }
        // eslint-disable-next-line
        const mockDispatch = jest.fn()
        const got = mergeProps(mockMergeState, {dispatch: mockDispatch}, newProps)
        got.shopNowOnClick()
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
        const got = mergeProps(mockMergeState, {dispatch: mockDispatch}, props)
        got.selectDefaultCountry("test")
        expect(setDefaultCountryCode).toHaveBeenCalledWith("test")
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("When redirectPageToAlternativeLanguage is called, it should redirect to the alternative language", () => {
        const mockDispatch = jest.fn()
        const got = mergeProps(expected, {dispatch: mockDispatch}, props)
        expect(got.redirectPageToAlternativeLanguage).toBeTruthy()

        got.redirectPageToAlternativeLanguage()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(redirectToAlternativeLanguageThunk("realm", "gb", "cdnUrl"))
    })
})
