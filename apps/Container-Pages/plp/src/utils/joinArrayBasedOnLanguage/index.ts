import {LANGUAGE_ENGLISH} from "../../config/constants"
import {HeaderLanguageType} from "../seo/types"

export const joinArrayBasedOnLanguage = (siteLanguage: HeaderLanguageType, array: any[]) => {
    let joinedArray = ""
    if (siteLanguage === LANGUAGE_ENGLISH) {
        joinedArray = array.join(" ")
    } else {
        joinedArray = array.join(", ")
    }
    return joinedArray
}
