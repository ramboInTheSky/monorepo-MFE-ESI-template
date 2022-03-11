import React, {FC} from "react"
import { TextModel } from "models/Text"
import {FilterFacet} from "../../../models/Filter"

import TabbedFilter from "../tabbedFilter"
import {FiltersPanelContainer} from "../components"
import {BRAND} from "../../../config/constants"

import TabbedFilterBrand from "../tabbedFilterBrand"

import NoOptionsText from "../noOptionsText"
import LoadingText from "../loadingText"
import {TabbedFilterContainer} from "../tabbedFiltersPanel/components"

interface FacetDetailsProps extends Pick<FilterFacet, "disabled" | "name" | "facets"> {
    showLoadingText?: boolean
    text: TextModel
}

const FilterDetails: FC<FacetDetailsProps> = ({name, showLoadingText, disabled, facets, text}) => {
    if (disabled || !facets) return <NoOptionsText text={text}/>
    return showLoadingText ? (
        <FiltersPanelContainer data-testid="plp-tabbed-facets-panel">
            <LoadingText text={text}/>
        </FiltersPanelContainer>
    ) : (
        <>
            {name === BRAND ? (
                <TabbedFilterBrand />
            ) : (
                <FiltersPanelContainer data-testid="plp-tabbed-facets-panel">
                    <TabbedFilterContainer>
                        {facets.map((filter, index) => (
                            <TabbedFilter
                                key={filter}
                                filterName={filter}
                                isTabbedFilter
                                facetName={name}
                                tabAutoFocus={index === 0}
                            />
                        ))}
                    </TabbedFilterContainer>
                </FiltersPanelContainer>
            )}
        </>
    )
}

export default FilterDetails
