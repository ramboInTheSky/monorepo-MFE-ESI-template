export enum SettingsSdkKeys {
    direction = "meganav.api.direction",
    realm = "meganav.api.realmName",
    territory = "meganav.api.territoryName",
    language = "meganav.api.languageName",
    appCache = "meganav.frontend.appCacheTTL",
    languageId = "meganav.alternativeLanguages",
    imagePlaceHolder = "meganav.frontend.ImagePlaceholder",
    CorrelationHeaderName = "x-monorepo-correlation-id",
    cacheControl = "meganav.frontend.cache-control.max-age",
    cacheControlFallbackMeganav = "meganav.frontend.cache-control.fallback-meganav.max-age",
    secondaryMeganavCacheControl = "meganav.frontend.cache-control.secondary-meganav.max-age",
    themeVersion = "meganav.frontend.themeVersion",
    defaultPrimaryConfig = "meganav.frontend.defaultPrimaryConfig",
    defaultSecondaryConfig = "meganav.frontend.defaultSecondaryConfig",
    textData = "meganav.frontend.textData",
    template = "meganav.frontend.template",
}

export interface SettingsModel {
    realm: string
    alignment: string
    territory: string
    language: string
}
