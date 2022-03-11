import {Store} from "redux"
import logger from "@monorepo/core-logger"
import {updateLanguage, LanguageDuckState, initialState} from "../../ducks/languages"
import {SettingsSdkKeys} from "../../models/settings"
import {LanguageOptions, ReturnLanguage} from "../../models/language"

import {languages} from "./languagesconfig.json"

export const setLanguageSettings = (store: Store, configuration: any, siteUrl: string) => {
    if (!configuration[SettingsSdkKeys.languageId]) {
        logger.warn(`Missing language IDs from ${configuration[SettingsSdkKeys.territory].Value}`)
        return
    }

    // get language IDs from settings data
    const languageIds: Array<string> = configuration[SettingsSdkKeys.languageId].map((val: any) => {
        return val.Value
    })

    // get language data from languageconfig.json based on current territory
    const languageData: LanguageOptions = pullLanguagesFromConfig(
        languageIds,
        configuration[SettingsSdkKeys.language].Value,
    )

    // get data to be used in language selector
    const languageSelectorData: LanguageDuckState = extractLanguageSelectorData(
        languageData.Languages,
        configuration[SettingsSdkKeys.language].Value,
        configuration[SettingsSdkKeys.direction].Value,
        siteUrl,
    )

    // apply to redux store
    updateLanguage(store, languageSelectorData)
}

export const pullLanguagesFromConfig = (languageIds: Array<string>, activeLanguage: string): LanguageOptions => {
    const data: LanguageOptions = new LanguageOptions()
    try {
        languageIds.forEach(ident => {
            const lang = languages?.find(({id}) => id === ident)
            if (lang) {
                const isActiveLanguage = lang?.name === activeLanguage
                data.Languages.push({
                    Language: lang,
                    isActiveLanguage,
                })
            }
        })
        return data
    } catch {
        return {Languages: []}
    }
}

export const extractLanguageSelectorData = (
    availableLanguages: Array<ReturnLanguage>,
    currentLanguageName: string,
    direction: string,
    siteUrl: string,
): LanguageDuckState => {
    try {
        const inactiveLanguage = availableLanguages.find(data => !data.isActiveLanguage)!.Language
        const activeLanguage = availableLanguages.find(data => data.isActiveLanguage)!.Language
        return {
            currentLanguageText: activeLanguage.displayText,
            altLanguageName: inactiveLanguage.name,
            altLanguageUrl: inactiveLanguage.url,
            currentLanguageName,
            direction,
            siteUrl,
        }
    } catch {
        return {
            ...initialState,
            siteUrl,
        }
    }
}
