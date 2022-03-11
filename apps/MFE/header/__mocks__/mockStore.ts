import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {mockColors} from "@monorepo/themes"
import {State} from "../src/ducks"
import apiData from "./amido.json"
import {ShoppingBag, ChargesAndIncentive, Item} from "../src/models/shoppingbag"

export const mockStyles = {
    sm: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
    },
    xs: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
    },
    md: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
        margin: "10rem",
        decoration: "none",
    },
    lg: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
    },
    xl: {
        width: "5.375rem",
        height: "2.75rem",
        padding: "0.625rem 0",
        borderRadius: "0",
        border: "0",
        order: "1",
    },
}

export const mockMyAccountStyles = {
    ...mockStyles,
    SmallIcon: mockStyles,
    SmallIconContainer: mockStyles,
    IconOnly: mockStyles,
    IconContainer: mockStyles,
    ToolTip: mockStyles,
    Divider: mockStyles,
}

export const mockCountrySelectorStyles = {
    ...mockStyles,
    Container: mockStyles,
}

const mockShoppingBagStyles = {
    ...mockStyles,
    productImage: mockStyles,
    itemsContainer: mockStyles,
}

const mockFavouritesStyles = {
    ...mockStyles,
    img: mockStyles,
}

export const mockRealmStyles = {
    CTA: mockStyles,
    UpperHeader: mockStyles,
    Meganav: mockStyles,
    PrimaryNav: mockStyles,
    Brand: mockStyles,
    SearchBox: mockStyles,
    Checkout: mockStyles,
    Quicklinks: mockStyles,
    SearchBoxDivider: mockStyles,
    SearchBoxIcon: mockStyles,
    Favourites: mockFavouritesStyles,
    CountrySelector: mockCountrySelectorStyles,
    ShoppingBag: mockShoppingBagStyles,
    MyAccount: mockMyAccountStyles,
    AutoCompleteButton: mockStyles,
    DrawerContainer: mockStyles,
}

const discount = 10
export const mockShoppingBag = {
    itemCount: 2,
    loading: false,
    bag: {
        FirstName: "cypress-account",
        Description: "Excluding UK Standard Delivery (Normally £3.99)",
        MultiBuyDiscount: 1,
        FinalOrderValue: 89,
        FinalOrderValueFormatted: "£89.00",
        MultiBuyDiscountFormatted: "£1.00",
        ChargesAndIncentives: [
            {
                AdditionalAmount: -discount,
                AdditionalAmountFormatted: `-£${discount.toFixed(2)}`,
                AdditionalCode: "UKCO1",
                MaximumOrderValue: 0,
                MinimumOrderValue: 15,
                OfferShortDescription: "Welcome Offer",
                OfferTypeDescription: "Welcome Offer",
                Type: "PRO",
            } as ChargesAndIncentive,
        ],
        ItemCount: 2,
        Items: [
            {
                ItemID: 1,
                ItemNumber: "436441",
                OptionNo: "04",
                SizeDescription: "10 S",
                Price: "45.00",
                Quantity: 10,
                StockMessage: "Delayed",
                Description: "Black Lift, Slim And Shape Skinny Jeans",
                AlternativeDescription: "Alternative - Black Lift, Slim And Shape Skinny Jeans",
                CistStoreName: "",
                Url: "/path1",
            } as Item,
            {
                ItemID: 2,
                ItemNumber: "436642",
                OptionNo: "04",
                SizeDescription: "15 L",
                Price: "45.00",
                Quantity: 5,
                StockMessage: "In Stock",
                Description: "Black Lift, Slim And Shape Skinny Jeans 2",
                AlternativeDescription: "Alternative - Black Lift, Slim And Shape Skinny Jeans 2",
                CistStoreName: "LEICESTER - HIGH CROSS SHOPPING CENTRE",
                Url: "/path2",
            } as Item,
        ],
    } as ShoppingBag,
}

export const mockRecents = {
    queryIds: ["celio", "gucci", "prada", "&", "#", "+"],
}

export const mockAutoComplete: any = {
    isLoading: false,
    q: "socks",
    suggestions: [
        {
            dq: "girls socks",
            q: "girls socks",
        },
        {
            dq: "boys socks",
            q: "boys socks",
        },
    ],
    products: [],
    numFound: 2,
    parameters: {
        accountId: "abc",
        domainKey: "Amido",
    },
}

export const mockLanguages = {
    currentLanguageText: "English",
    altLanguageName: "ar",
    altLanguageUrl: "/ar",
    currentLanguageName: "en",
    direction: "ltr",
    siteUrl: "http://amido.com",
}

export const mockSearch = {
    typedCharacters: "",
    showAutocomplete: false,
    showRecentSearch: false,
}

export const mockText = {
    recentSearches: {
        enriched: {
            mobileHeader: "RECENT SEARCHES",
            desktopHeader: "Your recent searches: ",
        },
        simple: {
            mobileHeader: "RECENT SEARCHES",
            desktopHeader: "RECENT SEARCHES",
        },
    },
    searchBox: {
        label: "Search",
        bigPlaceholder: "Search product",
        smallPlaceholder: "Search...",
        clearButton: {
            alt: "Clear search button",
        },
        closeButton: {
            text: "Close",
        },
    },
    myAccount: {
        title: "View Account Summary",
        buttonText: "SIGN OUT",
        altText: "My account icon",
        tooltipAltText: "icon",
        notText: "Not",
    },
    checkout: {
        text: "Checkout",
    },
    autoComplete: {
        loadingText: "Loading...",
        noResults: "No results found for ",
        headerText: "TOP MATCHES",
        searchLinktext: "See all results",
        enrich: {
            termTitle: "Top results for ",
        },
    },
    drawer: {
        closeIconText: "Close icon",
    },
    favourites: {
        altText: "Favourites icon",
    },
    miniShoppingBag: {
        emptyBagText: "Your shopping bag is empty",
        totalText: "Total",
        promotionalText: "Promotional Savings",
        viewAndEditBag: "VIEW/EDIT BAG",
        sizeText: "Size:",
        qtyText: "Qty:",
        at: "at",
        negative: "-",
        itemText: "Item",
        itemsText: "Items",
        inBagText: "In Bag",
        salePrice: "Sale Price",
    },
    shoppingBag: {
        altText: "Shopping bag icon",
        youhaveText: "You have",
        itemText: "item",
        itemsText: "items",
        inYourBagText: "in your bag",
    },
    countryLangSelector: {
        headerTitle: "CHANGE COUNTRY",
        locationText: "Location",
        languageText: "Language",
        closeText: "Close",
        stayText: "Stay on Amido.co.uk",
        shopNowText: "Shop now",
        ROWText: "Can't find the country you're looking for?",
        ROWLinkText: "View All Countries",
    },
    countryChangeModal: {
        confirm: "CONTINUE",
        cancel: "CANCEL",
        bodyTextPt1: "Are you sure you want to navigate away from this site?",
        bodyTextPt2: "If you navigate away from this site you will leave your shopping bag and it’s contents.",
        titleText: "Confirm country change",
    },
    cookiePolicy: {
        title: "Cookie Policy",
        body: "We use cookies to provide you with the best posible experience. By continuing to use our site, you agree to our use of cookies.",
        link: "Find out more",
        linkText: "about managing your cookie settings.",
        closeIconAltText: "Close",
    },
    saleBagWarning: {
        title: "Careful",
        textOne: "You could lose your sale bag.",
        textTwo: "Would you like to return to our Sale Site?",
        primaryButtonText: "YES, RETURN TO THE SALE",
        secondaryButtonText: "NO, THANK YOU",
    },
    skipToMainContent: "Skip to main content",
    closeIconAltText: "Close",
}

export const mockState: State = {
    settings: {
        "userConsentManagement.enabled": false,
        variant: "default",
    },
    user: {firstName: "", loggedIn: false, userUpdated: false},
    autocomplete: mockAutoComplete,
    recents: mockRecents,
    shoppingBag: mockShoppingBag,
    search: mockSearch,
    template: "default",
    request: {
        headers: {"x-monorepo-territory": "gb"},
        url: "/",
        siteUrl: "fakeamido.com",
        timeMachineDate: "20201215",
        isInternationalCountry: false,
        fullTerritoryName: "United Kingdom",
        geolocationBaseUrl: "",
        geolocationVersion: 0,
        bloomReachCachingCookieList: "",
        bloomReachCachingEnabled: false,
        useTimeMachineCookie: false,
        currencyCode: "EUR",
        bloomreachGroupLocation: "southernhemisphere",
        bloomreachDomainKey: "GB",
        monetateSDK: false,
        accountMonetateSDK: "",
        cookieDomain: ".amido.com",
        showSaleWarningBag: false,
    },
    languages: mockLanguages,
    data: {...apiData, language: ""},
    textAlignment: "ltr",
    text: mockText,
    features: {
        SearchBar: {
            Value: "SimpleSearch",
            RecentSearch: {
                MaxItems: 12,
            },
            Autocomplete: {
                MaxItems: 10,
                ProductsMaxItems: {
                    xs: 8,
                    sm: 8,
                    md: 4,
                    lg: 4,
                    xl: 5,
                },
            },
        },
    },
    favourites: {enableFavourites: true, hasFavourites: true},
    countrySelector: {
        showCountrySelector: false,
        isActive: true,
        countriesList: null,
        selectedCountry: null,
        selectedLanguage: null,
        defaultCountryCode: null,
        showOverlay: true,
        showBFPOFlag: false,
        loaded: false,
        requestedCountryChange: false,
        countrySelectorEndpoint: "",
    },
}

export const mockTextAlignment = {Value: "ltr"}

export const mockTheme = {styles: mockRealmStyles, colours: mockColors, direction: "ltr"}
export const mockConfigureStore = configureMockStore([thunk])
const mockStore = mockConfigureStore(mockState)

export default mockStore
