export enum SettingsSdkKeys {
    direction = "footer.frontend.direction",
    realm = "footer.frontend.realmName",
    territory = "footer.frontend.territoryName",
    language = "footer.frontend.languageName",
    appCache = "footer.frontend.appCacheTTL",
    languageId = "footer.alternativeLanguages",
    correlationHeaderName = "x-monorepo-correlation-id",
    sessionHeaderName = "x-monorepo-session-id",
    cacheControl = "footer.frontend.cache-control.max-age",
    cacheControlDefaultFooter = "footer.frontend.cache-control.default-footer.max-age",
    themeVersion = "footer.frontend.themeVersion",
    textData = "footer.frontend.textData",
    variant = "footer.frontend.variant",
}

export interface SettingsModel {
    realm: string
    alignment: string
    territory: string
    language: string
}
