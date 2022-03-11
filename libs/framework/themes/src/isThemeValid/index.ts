import logger from "@monorepo/core-logger"
import {ThemeColor} from "../themecolors"

export const isThemeValid = theme => {
    if (!theme) {
        logger.error("Feature Settings - Theme is not provided")
        return false
    }

    return !validateSettings(new ThemeColor(), theme, "")
}

const validateSettings = (theme: object, themeToTest: object, parentKey: string) => {
    return Object.keys(theme).some(key => {
        const combinedKey = formatKey(parentKey, key)
        if (!themeToTest[key]) {
            logger.error(`Feature Setting - Theme: ${combinedKey} is not provided`)
            return true
        }
        if (typeof theme[key] === "object") {
            return validateSettings(theme[key], themeToTest[key], combinedKey) > 0
        }
        return false
    })
}

const formatKey = (oldKey: string, newKey: string) => {
    return oldKey ? `${oldKey} - ${newKey}` : newKey
}
