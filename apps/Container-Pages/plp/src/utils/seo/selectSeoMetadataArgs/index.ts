import State from "../../../models/State"
import {SearchApiRequestTypes, LANGUAGE_HEADER, LANGUAGE_ENGLISH} from "../../../config/constants"
import {selectSelectedFilterNames} from "../../selectSelectedFilterNames"
import {selectRealm, selectTerritory} from "../../../ducks/request"
import {CATEGORY_SEARCH, KEYWORD_SEARCH} from "../getSeoMetadataFromConfig"
import { joinArrayBasedOnLanguage } from "../../joinArrayBasedOnLanguage"
import updateGender from "../updateGender"

export function selectSeoMetadataArgs(state: State) {
    const {
        request: {type, category, gender, territoryName, headers},
        search: {title},
        text
    } = state
    const realm = selectRealm(state)
    const territory = selectTerritory(state)
    const isKeywordSearch = type === SearchApiRequestTypes.Keyword
    const market = territoryName
    const searchType = isKeywordSearch ? KEYWORD_SEARCH : CATEGORY_SEARCH
    let filters = selectSelectedFilterNames(state).join(" ")
    const withFilters = Boolean(filters.length)

    let searchTerm = ""

    if (searchType === CATEGORY_SEARCH) {
        if(gender) {
            const transformedGender = updateGender(gender, headers[LANGUAGE_HEADER], text)
            if(withFilters){
                filters = joinArrayBasedOnLanguage(headers[LANGUAGE_HEADER], [transformedGender, filters])
            } else {
                searchTerm = transformedGender
            }
        }

        if (category) {
            if(searchTerm !== "" && headers[LANGUAGE_HEADER] !== LANGUAGE_ENGLISH) {
                searchTerm = [searchTerm, category].join(', ')
            } else if (searchTerm !== "" && headers[LANGUAGE_HEADER] === LANGUAGE_ENGLISH) {
                searchTerm = [searchTerm, category].join(' ')
            } else {
                searchTerm = category
            }
        }
        if (!gender && !category) {
             searchTerm = title
        }
    } 
    
    if (searchType === KEYWORD_SEARCH) {
        searchTerm = title
    }
    return {realm, territory, searchTerm, market, searchType, filters, withFilters}
}
