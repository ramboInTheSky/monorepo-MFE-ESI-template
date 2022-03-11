import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {createFilterOptions} from "@mui/material/Autocomplete"
import {SearchValue} from "ducks/viewAllModal"
import { TextModel } from "models/Text"
import {FacetSearchAutocomplete, AutocompleteContainer} from "./components"
import connect from "./connect"
import {FacetsState} from "../../models/FacetsState"
import {FilterSearchInput} from "../filterSearchInput"
import {useAutocompleteFacetSearch} from "./useAutocompleteFacetSearch"

interface FilterSearchProps {
    facets: FacetsState
    searchFacets: SearchValue[]
    handleSetFilterModal: (filterValue: string) => void
    displayName: string
    text: TextModel
}

const getOptionLabel = (option: any) => ((option as SearchValue).n ? (option as SearchValue).n : "")
const filterOptions = createFilterOptions({
    matchFrom: "start",
})

export const FacetSearch = ({facets, searchFacets, handleSetFilterModal, displayName, text}: FilterSearchProps) => {
    const {filterValue, inputString, setSearchString, setFilterValue} = useAutocompleteFacetSearch(
        facets,
        handleSetFilterModal,
    )

    return (
        <AutocompleteContainer>
            <FacetSearchAutocomplete
                id="facet-search"
                value={filterValue}
                inputValue={inputString}
                onInputChange={setSearchString}
                autoHighlight
                disablePortal
                filterOptions={filterOptions}
                options={searchFacets}
                onChange={setFilterValue}
                data-testid={formatTextTestIds("plp-facet-search")}
                getOptionLabel={getOptionLabel}
                renderInput={params => <FilterSearchInput params={params} displayName={displayName} text={text} />}
                noOptionsText={text.pages.viewAllModal.noResults}
            />
        </AutocompleteContainer>
    )
}

export default connect(FacetSearch)
