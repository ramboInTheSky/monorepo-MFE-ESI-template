import React from "react"
import { TextModel } from "models/Text"
import {Container, SearchBar, SearchIcon, Icon, Input} from "./components"
import env from "../../../config/env"

const SEARCH_ICON = "search-grey.svg"

interface Props {
    setBrandNameForSearch: (e: React.SyntheticEvent) => void
    brandSearch: string
    text: TextModel
}

const BrandSearchBar = ({setBrandNameForSearch, brandSearch, text}: Props) => {
    return (
        <Container>
            <SearchBar data-testid="plp-tabbed-brand-search-bar">
                <SearchIcon>
                    <Icon
                        src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/${SEARCH_ICON}`}
                        alt={text.imageAlts.tabbedSearchBrands}
                    />
                </SearchIcon>
                <Input
                    placeholder={text.pages.filters.searchBrands}
                    onChange={setBrandNameForSearch}
                    value={brandSearch}
                    data-testid="plp-tabbed-brand-search-bar-input"
                    autoFocus
                />
            </SearchBar>
        </Container>
    )
}

export default BrandSearchBar
