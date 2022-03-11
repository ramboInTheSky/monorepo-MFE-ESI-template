export enum SettingsSdkKeys {
    Direction = "monorepo.plp.frontend.direction",
    Realm = "monorepo.plp.frontend.realmName",
    Territory = "monorepo.plp.frontend.territoryName",
    Language = "monorepo.plp.frontend.languageName",
    CorrelationHeaderName = "x-monorepo-correlation-id",
    AppCache = "monorepo.plp.frontend.appCacheTTL",
    TextData = "monorepo.plp.frontend.textData",
    ThemeVersion = "monorepo.plp.frontend.themeVersion",
    SearchCacheControl = "monorepo.plp.frontend.cache-control.search",
    ShopCacheControl = "monorepo.plp.frontend.cache-control.shop",
    DebounceTime = "monorepo.plp.frontend.debounceTime",
    SeoFilters = "monorepo.plp.frontend.seoFilters",
    FeatureSwitch = "monorepo.plp.frontend.featureSwitch",
    SingleOptionFacetList = "monorepo.plp.frontend.singleOptionFacetList",
    TerritoryDescription = "monorepo.plp.frontend.territoryDescription",
    ItemsPerPage = "monorepo.plp.frontend.itemsPerPage",
    ItemsPerRow = "monorepo.plp.frontend.itemsPerRow",
    InPageFilters = "monorepo.plp.frontend.inPageFilters",
    FetchTriggerOffset = "monorepo.plp.frontend.fetchTriggerOffset",
    FetchTriggerOffsetRows = "monorepo.plp.frontend.fetchTriggerOffsetRows",
    SubsequentPagesNonLazyloadRows = "monorepo.plp.frontend.subsequentPagesNonLazyloadRows",
    HideSearchFilterModalElements = "monorepo.plp.frontend.hideSearchFilterModalElements",
    SearchBannersAppCache = "monorepo.plp.frontend.searchBannerAppCacheTTL",
    BloomreachPersonalizationCookies = "monorepo.plp.frontend.bloomreachPersonalizationCookies",
}

export interface SettingsModel {
    realm: string
    territory: string
    language: string
}
