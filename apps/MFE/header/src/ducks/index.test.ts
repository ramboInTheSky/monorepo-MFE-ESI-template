import {HeaderModel} from "../models/headerModel"
import {rootReducer, makeStore} from "."
import {mockShoppingBag, mockRecents, mockSearch, mockText} from "../../__mocks__/mockStore"

const SET_USER = "SET_USER"

jest.mock("./user", () => () => ({
    firstName: "string",
    loggedIn: true,
    userUpdated: true,
}))

const expectedInitialState = {
    user: {
        firstName: "string",
        loggedIn: true,
        userUpdated: true,
    },
    request: {
        headers: {},
        url: "/",
        siteUrl: "",
        timeMachineDate: null,
        isInternationalCountry: false,
        geolocationBaseUrl: "",
        geolocationVersion: 0,
        bloomReachCachingCookieList: "",
        bloomReachCachingEnabled: false,
        bloomreachGroupLocation: "",
        bloomreachDomainKey: "",
        useTimeMachineCookie: false,
        currencyCode: "",
        fullTerritoryName: "",
        monetateSDK: false,
        accountMonetateSDK: "",
        cookieDomain: "",
        showSaleWarningBag: false,
    },
    autocomplete: {
        numFound: 0,
        products: [],
        q: "",
        suggestions: [],
        isLoading: false,
        parameters: {
            accountId: "abc",
            domainKey: "next",
            authKey: "authKey",
        },
    },
    data: new HeaderModel(),
    recents: mockRecents,
    search: mockSearch,
    shoppingBag: mockShoppingBag,
    languages: {
        currentLanguageText: "",
        altLanguageName: "",
        altLanguageUrl: "",
        currentLanguageName: "",
        direction: "",
        siteUrl: "",
    },
    textAlignment: "ltr",
    favourites: {
        enableFavourites: false,
        hasFavourites: true,
    },
    features: {
        SearchBar: {
            Value: "",
        },
    },
    countrySelector: {
        showCountrySelector: false,
        countriesList: null,
        isActive: true,
        selectedCountry: null,
        selectedLanguage: null,
        showOverlay: true,
        defaultCountryCode: null,
        showBFPOFlag: false,
        loaded: false,
        requestedCountryChange: false,
        countrySelectorEndpoint: "",
    },
    template: "",
    text: mockText,
    settings: {variant: "inverted", "userConsentManagement.enabled": false},
}

describe("combined reducers", () => {
    it("generates the correct state", () => {
        const result = rootReducer(
            {
                user: {
                    firstName: "string",
                    loggedIn: true,
                    userUpdated: true,
                },
                request: {
                    headers: {},
                    url: "/",
                    siteUrl: "",
                    timeMachineDate: null,
                    isInternationalCountry: false,
                    geolocationBaseUrl: "",
                    geolocationVersion: 0,
                    bloomReachCachingCookieList: "",
                    bloomReachCachingEnabled: false,
                    bloomreachDomainKey: "",
                    bloomreachGroupLocation: "",
                    useTimeMachineCookie: false,
                    currencyCode: "",
                    fullTerritoryName: "",
                    monetateSDK: false,
                    accountMonetateSDK: "",
                    cookieDomain: "",
                    showSaleWarningBag: false,
                },
                recents: mockRecents,
                autocomplete: {
                    numFound: 0,
                    products: [],
                    q: "",
                    suggestions: [],
                    isLoading: false,
                    parameters: {
                        accountId: "abc",
                        domainKey: "next",
                        authKey: "authKey",
                    },
                },
                search: mockSearch,
                shoppingBag: mockShoppingBag,
                data: new HeaderModel(),
                textAlignment: "ltr",
                languages: {
                    currentLanguageText: "",
                    altLanguageName: "",
                    altLanguageUrl: "",
                    currentLanguageName: "",
                    direction: "",
                    siteUrl: "",
                },
                favourites: {
                    enableFavourites: false,
                    hasFavourites: true,
                },
                features: {
                    SearchBar: {
                        Value: "",
                    },
                },
                countrySelector: {
                    showCountrySelector: false,
                    countriesList: null,
                    isActive: true,
                    selectedCountry: null,
                    selectedLanguage: null,
                    showOverlay: true,
                    defaultCountryCode: null,
                    showBFPOFlag: false,
                    loaded: false,
                    requestedCountryChange: false,
                    countrySelectorEndpoint: "",
                },
                template: "",
                text: mockText,
                settings: {variant: "inverted", "userConsentManagement.enabled": false},
            },
            {
                type: SET_USER,
                user: {firstName: "spiderman", loggedIn: true, userUpdated: true},
            },
        )
        expect(result).toEqual(expectedInitialState)
    })

    describe("Store => makeStore ", () => {
        it("Genereates the store correctly with no errors", () => {
            const store = makeStore(expectedInitialState)
            const initialState = store.getState()
            expect(initialState).toEqual(expectedInitialState)
        })
    })
})
