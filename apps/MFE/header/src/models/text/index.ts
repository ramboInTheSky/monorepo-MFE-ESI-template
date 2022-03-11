export interface TextModel {
    recentSearches: RecentSearches
    searchBox: SearchBox
    myAccount: MyAccount
    checkout: Checkout
    autoComplete: AutoComplete
    drawer: Drawer
    favourites: Favourites
    miniShoppingBag: MiniShoppingBag
    shoppingBag: ShoppingBag
    countryChangeModal: CountryChangeModal
    countryLangSelector: CountryLangSelector
    cookiePolicy: CookiePolicy
    saleBagWarning: SaleBagWarning
    skipToMainContent: string
}

interface EnrichedSearch {
    mobileHeader: string
    desktopHeader: string
}

interface SimpleSearch {
    mobileHeader: string
    desktopHeader: string
}

interface RecentSearches {
    enriched: EnrichedSearch
    simple: SimpleSearch
}

interface ClearSearchButton {
    alt: string
}

interface CloseSearchButton {
    text: string
}

interface SearchBox {
    label: string
    bigPlaceholder: string
    smallPlaceholder: string
    clearButton: ClearSearchButton
    closeButton: CloseSearchButton
}

export interface MyAccount {
    title: string
    buttonText: string
    altText: string
    tooltipAltText: string
    notText: string
}

interface Checkout {
    text: string
}

interface Enrich {
    termTitle: string
}

interface AutoComplete {
    loadingText: string
    noResults: string
    headerText: string
    searchLinktext: string
    enrich: Enrich
}

interface Drawer {
    closeIconText: string
}

interface Favourites {
    altText: string
}

interface MiniShoppingBag {
    emptyBagText: string
    totalText: string
    promotionalText: string
    viewAndEditBag: string
    sizeText: string
    qtyText: string
    at: string
    negative: string
    itemText: string
    itemsText: string
    inBagText: string
    salePrice: string
}

interface ShoppingBag {
    altText: string
    youhaveText: string
    itemText: string
    itemsText: string
    inYourBagText: string
}

interface CountryLangSelector {
    headerTitle: string
    locationText: string
    languageText: string
    closeText: string
    stayText: string
    shopNowText: string
    ROWText: string
    ROWLinkText: string
}

interface CountryChangeModal {
    confirm: string
    cancel: string
    bodyTextPt1: string
    bodyTextPt2: string
    titleText: string
}

interface CookiePolicy {
    title: string
    body: string
    link: string
    linkText: string
    closeIconAltText: string
}

export interface SaleBagWarning {
    title: string
    textOne: string
    textTwo: string
    primaryButtonText: string
    secondaryButtonText: string
}