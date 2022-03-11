export interface Language {
    id: string
    displayText: string
    name: string
    url: string
}

export interface ReturnLanguage {
    Language: Language
    isActiveLanguage: boolean
}

export class LanguageOptions {
    Languages: Array<ReturnLanguage> = []
}

export enum Direction {
    RTL = 'rtl',
    LTR = 'ltr'
}