import React from "react"
import connect from "./connect"

import SimpleAutoComplete from "./simple/AutoComplete"
import SimpleRecentSearches from "./simple/RecentSearches"
import SimpleModal from "./simple/Modal"

import EnrichedAutoComplete from "./enriched/AutoComplete"
import EnrichedRecentSearches from "./enriched/RecentSearches"
import EnrichedModal from "./enriched/Modal"

import {SupportedFeatures} from "../../models/features"
import {SupportedSearchBar} from "../../models/features/searchBar"

export const GetAutoCompleteComponent = ({features: {SearchBar}}: SupportedFeatures) => {
    switch (SearchBar.Value) {
        case SupportedSearchBar.SimpleSearch:
            return <SimpleAutoComplete />
        case SupportedSearchBar.EnrichSearch:
            return <EnrichedAutoComplete />
        default:
            return <SimpleAutoComplete />
    }
}
export const GetRecentSearchesComponent = ({features: {SearchBar}}: SupportedFeatures) => {
    switch (SearchBar.Value) {
        case SupportedSearchBar.SimpleSearch:
            return <SimpleRecentSearches />
        case SupportedSearchBar.EnrichSearch:
            return <EnrichedRecentSearches />
        default:
            return <SimpleRecentSearches />
    }
}

interface ModalComponentProps extends SupportedFeatures {
    open: boolean
    closeText: string
    handleClose: () => void
    children: JSX.Element
}

export const GetModalComponent = ({
    features: {SearchBar},
    open,
    handleClose,
    children,
    closeText,
}: ModalComponentProps) => {
    switch (SearchBar.Value) {
        case SupportedSearchBar.SimpleSearch:
            return (
                <SimpleModal open={open} handleClose={handleClose} closeText={closeText}>
                    {children}
                </SimpleModal>
            )
        case SupportedSearchBar.EnrichSearch:
            return (
                <EnrichedModal open={open} handleClose={handleClose} closeText={closeText}>
                    {children}
                </EnrichedModal>
            )
        default:
            return <div>Default</div>
    }
}

export const AutoCompleteComponent = connect(GetAutoCompleteComponent)
export const RecentSearchesComponent = connect(GetRecentSearchesComponent)
export const ModalComponent = connect(GetModalComponent)
