export class Language {
    id = ""
    displayText = ""
    name = ""
    url = ""
}

export class ReturnLanguage {
    Language = new Language()
    isActiveLanguage = false
}

export class LanguageOptions {
    Languages: Array<ReturnLanguage> = []
}
