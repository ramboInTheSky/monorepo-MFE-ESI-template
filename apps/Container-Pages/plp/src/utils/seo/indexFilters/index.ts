import {CATEGORY_FILTERS_REGEX} from "../../../config/constants"

export const indexFilters = (filters: string): boolean => {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const filtersArray = filters.match(CATEGORY_FILTERS_REGEX) || []
    const exceptionToTheRule = "gender"
    if (filtersArray === []) return true
    const keyArray: string[] = []
    filtersArray.forEach(filter => {
        const key: string = filter.split("-")[0]
        if (key !== exceptionToTheRule) keyArray.push(key)
    })
    const duplicates = findDuplicates(keyArray)
    return duplicates.length === 0
}

const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)

export default indexFilters
