import {useCommonObservable} from "../useObservable"
import {CountrySelectorOpenESB, CountrySelectorOpenContractModel} from "../../events/countrySelector/open"
import {CountrySelectorRedirectToAlternativeLanguageESB} from "../../events/countrySelector/redirectToAlternativeLanguage"

export const useCountrySelectorOpenObservable = (callback: (data: CountrySelectorOpenContractModel) => void) => {
    return useCommonObservable(new CountrySelectorOpenESB(), callback)
}

export const useCountrySelectorRedirectToAlternativeLanguageObservable = (callback: () => void) => {
    return useCommonObservable(new CountrySelectorRedirectToAlternativeLanguageESB(), callback)
}
