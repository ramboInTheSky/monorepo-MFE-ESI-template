export class CountryLanguage {
    Name = ""
    Value = ""
    TargetUrl = ""
    AccountDomainUrl = ""
}

export class Country {
    Name = ""
    Country = ""
    CountryCode = ""
    DisplayText = ""
    NativeCountryText = ""
    RedirectUrl = ""
    DefaultLanguageName = ""
    Languages: CountryLanguage[] = []
    DisplaySequenceAttribute = ""
    PromotedFlagIndex = 0
    Region = ""
    iconUrl = ""
    DomainType = ""
    HideInDropdown = false
    HideInPage = false
    IsROW = false
}
