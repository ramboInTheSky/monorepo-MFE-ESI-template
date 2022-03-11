import {Country, Language} from "../../models/countryselector"

export const getCountryFlagPath = (cdnBaseUrl: string, code: string): string =>
    `${cdnBaseUrl}/icons/shared/countryflags/${code.toLowerCase()}.png`

export const getDefaultLanguage = (country: Country): Language => {
    return country.languages.filter(language => language.default)[0]
}
