import {SearchApiRequestTypes} from "../../../config/constants"
import {urlSanitiser} from "../../httpUrlTrimmer"

export interface CategoryUrlSegments {
    category: string
    filter: string
    page: string
}

// have this return an object of the different segments
export const getCategorySearchUrlSegment = (url: string, type: SearchApiRequestTypes): CategoryUrlSegments => {
    if (type !== SearchApiRequestTypes.Category) {
        return {category: "", filter: "", page: ""}
    }
    const sanitisedPath = urlSanitiser(url)
    const splitPathArray = sanitisedPath.split("/")
    const category = splitPathArray[2]

    // TO DO - get page out
    const filter = splitPathArray[3]?.split("?")[0] || ""
    const pageSplit = splitPathArray[3]?.split("?")[1]
    const page = pageSplit !== undefined ? `?${pageSplit}` : ""
    return {category, filter, page}
}
