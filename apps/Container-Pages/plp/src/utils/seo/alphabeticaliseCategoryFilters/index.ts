import {AlphabeticalisedFilters} from "models/Filter"
import {CATEGORY_FILTERS_REGEX} from "../../../config/constants"

export const alphabeticaliseCategoryFilters = (filters: string): AlphabeticalisedFilters => {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const filtersArray: string[] = filters.match(CATEGORY_FILTERS_REGEX) || []
    const isortElement: string =
        filtersArray.find(element => {
            if (element.includes("isort")) {
                return true
            }
            return false
        }) || ""
    const minPrice: string =
        filtersArray.find(element => {
            if (element.includes("minprice")) {
                return true
            }
            return false
        }) || ""
    const maxprice: string =
        filtersArray.find(element => {
            if (element.includes("maxprice")) {
                return true
            }
            return false
        }) || ""
    const price = minPrice !== "" && maxprice !== "" ? `${minPrice}-${maxprice}` : ""
    if (isortElement !== "") filterSplice(filtersArray, isortElement)
    if (minPrice !== "") filterSplice(filtersArray, minPrice)
    if (maxprice !== "") filterSplice(filtersArray, maxprice)
    let filterString = ""
    filtersArray.sort()
    const filterArrayLength = filtersArray.length
    let dash = ""
    filtersArray.forEach((filter, index) => {
        dash = index !== filterArrayLength - 1 ? "-" : ""
        filterString += `${filter}${dash}`
    })

    return {sortedFilters: filterString, isort: isortElement, price}
}

const filterSplice = (filterArray, text) => {
    filterArray.splice(filterArray.indexOf(text), 1)
}

export default alphabeticaliseCategoryFilters
