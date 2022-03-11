import {urlSanitiser} from "../httpUrlTrimmer"
import {SearchApiRequestTypes, GENDER, CLEARANCE} from "../../config/constants"

const getCategoryFromUrl = (path: string, type: SearchApiRequestTypes): string => {
    if (type === SearchApiRequestTypes.Category) {
        const splitPathArray = path.split("/")
        const searchTerm = splitPathArray[2]
        const categoryStrippedQuery = searchTerm.split("?")[0].split("-")
        let category = ""
        if (categoryStrippedQuery.length !== 1) {
            categoryStrippedQuery.forEach((item, index) => {
                // The index % 2 checks the keys in the categoryStrippedQuery,
                // i.e. - if categoryStrippedQuery is gender,women,category,dresses,0, it will check against the gender and category keys
                if (index % 2 === 0 && item !== GENDER) {
                    const categoryItem = categoryStrippedQuery[index + 1]
                    if (item === "issale") {
                        category = CLEARANCE
                    } else if (typeof categoryItem !== "undefined") {
                        category = categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1)
                    }
                }
            })
        }

        return category
    }
    return ""
}

export const getCategorySegmentFromUrl = (url: string, siteUrl: string, type: SearchApiRequestTypes): string => {
    if (type !== SearchApiRequestTypes.Category) {
        return ""
    }
    const path = url.replace(siteUrl, "")
    const sanitisedPath = urlSanitiser(path)
    const splitPathArray = sanitisedPath.split("/")
    const searchTerm = splitPathArray[2]
    const categoryStrippedQuery = searchTerm.split("?")[0]

    return categoryStrippedQuery.replace("-0", "")
}

export default getCategoryFromUrl
