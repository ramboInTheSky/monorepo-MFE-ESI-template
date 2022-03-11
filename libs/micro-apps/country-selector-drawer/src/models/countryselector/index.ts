export class Country {
    countryCode = ""
    name = ""
    nameWithCurrency = ""
    isNonStandard = false
    promotedCountryIndex = 0
    region = ""
    languages: Language[] = []
}

export class Language {
    id = ""
    default = false
    targetUrl = ""
    name = ""
}
