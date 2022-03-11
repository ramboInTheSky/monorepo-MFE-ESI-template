import React, {FC} from "react"

import connect from "./connect"
import {StyledFacetButton, Text, TextWrapper, SelectedFacetIndicator} from "../components"

interface Props {
    facetDisplayName: string
    noBorder?: boolean
    facetName: string
    setSelectedFacet: VoidFunction
    isFocused?: boolean
    hasSelectedFacet: boolean
    hideTopBorder: boolean
    hasSelectedFilters: boolean
    selectedFacetFilters?: string
    disabled: boolean
}

export const TabbedFacet: FC<Props> = ({
    facetDisplayName,
    noBorder,
    setSelectedFacet,
    isFocused,
    hasSelectedFacet,
    hideTopBorder,
    hasSelectedFilters,
    facetName,
    selectedFacetFilters,
    disabled,
}) => (
    <StyledFacetButton
        onClick={setSelectedFacet}
        isFocused={isFocused}
        hideTopBorder={hideTopBorder}
        showLeftBorder={hasSelectedFilters}
        data-testid={`plp-tabbed-filter-button-${facetName}`}
    >
        {hasSelectedFilters && !isFocused && hasSelectedFacet && (
            <SelectedFacetIndicator data-testid="plp-tabbed-facets-selected-dot" />
        )}
        <TextWrapper fullWidth noBorder={hasSelectedFacet || noBorder}>
            <Text variant={hasSelectedFilters && isFocused ? "h5" : "body1"} disabled={disabled}>
                {facetDisplayName}
            </Text>
            {hasSelectedFilters && selectedFacetFilters && (
                <Text $isSecondary data-testid={`plp-tabbed-facets-selected-filter-${facetName}`}>
                    {selectedFacetFilters}
                </Text>
            )}
        </TextWrapper>
    </StyledFacetButton>
)

export default connect(TabbedFacet)
