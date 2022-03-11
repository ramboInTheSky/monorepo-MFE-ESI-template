import {REPLACE_YEAR} from "../../config/constants"

const getWithDynamicYear = (text: string): string => {
    if (text.includes(REPLACE_YEAR)) {
        const date = new Date()
        const getYear = date.getFullYear()
        return text.replace(REPLACE_YEAR, getYear.toString())
    }
    return text
}

export default getWithDynamicYear
