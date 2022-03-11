import {useCallback, useState} from "react"
import {FacetsState} from "../../models/FacetsState"
import TrackViewAllModalSearchBar from "../../events/trackEvent/events/viewAllModalSearchBar"

export const useAutocompleteFacetSearch = (
    facets: FacetsState,
    handleSetFilterModal: (filterValue: string) => void,
) => {
    const [inputString, setInputString] = useState("")
    const [filterValue, getFilterValueState] = useState(null)

    const setSearchString = useCallback((_event, value: string): void => setInputString(value), [setInputString])
    const setFilterValue = useCallback(
        (_event, selectedFacet): void => {
            if (
                Object.prototype.hasOwnProperty.call(selectedFacet, "v") &&
                Object.prototype.hasOwnProperty.call(facets, selectedFacet.v) &&
                !facets[selectedFacet.v].s
            ) {
                handleSetFilterModal(selectedFacet.v)
                TrackViewAllModalSearchBar(selectedFacet.v)
            }
            setInputString("")
            getFilterValueState(null)
        },
        [facets, handleSetFilterModal, setInputString, getFilterValueState],
    )

    return {filterValue, inputString, setSearchString, setFilterValue}
}
