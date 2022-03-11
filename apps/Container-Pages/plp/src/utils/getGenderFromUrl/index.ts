import {SearchApiRequestTypes, GENDER} from "../../config/constants"

const getGenderFromUrl = (path: string, searchType: SearchApiRequestTypes): string[] | null => {
    if (searchType === SearchApiRequestTypes.Category) {
        const splitPathArray = path.split("/")
        const searchTerm = splitPathArray[2]
        const genderStrippedQuery = searchTerm.split("?")[0].split("-")
        const genderArray: string[] = []
        genderStrippedQuery.forEach((item, index) => {
            // The index % 2 checks the keys in the genderStrippedQuery,
            // i.e. - if genderStrippedQuery is gender,women,category,dresses,0, it will check against the gender and category keys
            if (index % 2 === 0 && item === GENDER) {
                const genderItem = genderStrippedQuery[index + 1]
                if (genderItem) {
                    genderArray.push(genderItem)
                }
            }
        })
        return genderArray.length > 0 ? genderArray : null
    }
    return null
}

export default getGenderFromUrl
