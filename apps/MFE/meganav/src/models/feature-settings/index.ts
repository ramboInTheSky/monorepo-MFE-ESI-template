export interface FeatureSettings {
    Empire: Empire
    Personas: Persona[]
}

interface Persona {
    PersonaName: string
    Settings: SettingsForPersona
}

interface SettingsForPersona {
    "meganav.api.direction": DefaultValue
    "meganav.enableMainMenu": DefaultValue
}

interface Empire {
    EmpireName: string
    Settings: Settings
    Realms: Realm[]
}

interface Realm {
    RealmName: string
    Settings: SettingsForRealm
    Territories: Territory[]
}

interface Territory {
    TerritoryName: string
    Languages: Language[]
    Settings: SettingsForTerritory
}

interface SettingsForTerritory {
    "meganav.api.territoryName": DefaultValue
    "meganav.alternativeLanguages": DefaultValue[]
}

interface Language {
    LanguageName: string
    Settings: SettingsForLanguage
}

interface SettingsForLanguage {
    "meganav.api.languageName": DefaultValue
    "meganav.api.direction": DefaultValue
}

interface SettingsForRealm {
    "meganav.api.realmName": DefaultValue
    "meganav.frontend.ImagePlaceholder"?: ImagePlaceholder
    "meganav.frontend.defaultDataConfig"?: DataConfig
}

interface DataConfig {
    primary: string
    secondary: string
}

interface ImagePlaceholder {
    EnableImagePlaceholder: boolean
}

interface Settings {
    "meganav.frontend.appCacheTTL": DefaultValue
    "meganav.frontend.themeVersion": DefaultValue
    "meganav.frontend.cache-control.max-age": DefaultValue
    "meganav.frontend.cache-control.default-meganav.max-age": DefaultValue
    "meganav.frontend.defaultPrimaryConfig": DefaultConfig
    "meganav.frontend.defaultSecondaryConfig": DefaultConfig
}

interface DefaultConfig {
    version: string
    country: string
}

interface DefaultValue {
    Value: string
}
