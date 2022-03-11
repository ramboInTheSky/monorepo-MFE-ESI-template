export enum SettingsSdkKeys {
    direction = "header.frontend.direction",
    autoComplete = "header.frontend.autoComplete",
    realm = "header.frontend.realmName",
    territory = "header.frontend.territoryName",
    fullTerritoryName = "header.frontend.fullTerritoryName",
    language = "header.frontend.languageName",
    languageId = "header.alternativeLanguages",
    correlationHeaderName = "x-monorepo-correlation-id",
    appCache = "header.frontend.appCacheTTL",
    cacheControl = "header.frontend.cache-control.max-age",
    cacheControlDefault = "header.frontend.cache-control.default-header.max-age",
    enableFavourites = "header.frontend.enableFavourites",
    featureSwitch = "header.frontend.featureSwitch",
    themeVersion = "header.frontend.themeVersion",
    style = "header.frontend.style",
    textData = "header.frontend.textData",
    countrySelector = "header.frontend.countrySelector",
    countrySelectorVersion = "header.frontend.countrySelectorVersion",
    defaultDataVersion = "header.frontend.defaultDataVersion",
    geolocationVersion = "header.frontend.geolocationVersion",
    googleAnalytics = "header.frontend.googleAnalytics",
    enableGoogleAnalyticsSDK = "header.frontend.enableGoogleAnalyticsSDK",
    monetateSDK = "header.frontend.monetateSDK",
    currencyCode = "header.frontend.currencyCode",
    bloomReachCachingCookieList = "header.frontend.bloomReachCachingCookieList",
    bloomReachCachingEnabled = "header.frontend.bloomReachCachingEnabled",
    bloomreachGroupLocation = "header.frontend.bloomreachGroupLocation",
    bloomreachDomainKey = "header.frontend.bloomreachDomainKey",
    enableQueueIt = "header.frontend.enableQueueIt",
    bookmarkTitle = "header.frontend.bookmarkTitle",
    userConsentManagement = "header.frontend.userConsentManagement.enabled",
    template = "header.frontend.template",
    variant = "header.frontend.variant",
    enableABPlatformTesting = "header.frontend.abPlatformTesting.enabled",
    enableSaleWarningModal = "header.frontend.enableSaleWarningModal",
}

export interface SettingsModel {
    realm: string
    alignment: string
    territory: string
    language: string
    autocomplete: string
    favourites: string
}
