import React from "react"
import {formatTextTestIds} from "@monorepo/utils"

import {TextModel} from "models/Text"
import connect from "./connect"
import {
    FilterContainer,
    FilterFlexContainer,
    FiltersContainer,
    FixedInfoContainer,
    TotalProductsResult,
    TotalProductsTitle,
    ClearAllLink,
} from "./components"
import {useShowFilters} from "./useShowFilters"
import FacetsFilters from "../facetsFilters"
import FacetsFeats from "../facetsFeats"
import {Filters} from "../../models/Filter"
import {useHideFixedItems} from "../../hooks/useHideFixedItems"
import OpenFilterButton from "../openFilterButton"

interface FiltersComponentProps {
    totalResults: number
    consolidatedFilters: string[]
    filters: Filters
    isFilterSelected?: boolean
    clearAllFilters: () => void
    locale: string
    text: TextModel
}

export const FiltersComponent = ({
    totalResults,
    consolidatedFilters,
    filters,
    isFilterSelected,
    clearAllFilters,
    text,
}: FiltersComponentProps) => {
    const {hideFixedItems} = useHideFixedItems()
    const {
        infoContainerTop,
        infoContainerRef,
        containerRef,
        facetAbsoluteTop,
        showOpenFilterBtn,
        showFixedFacets,
        facetsContainerRef,
        underlayElementHeight,
        totalProductsHeight,
        totalProductsRef,
        handleOpenFilterBtnClick,
    } = useShowFilters(hideFixedItems)

    return (
        <FilterFlexContainer>
            <FilterContainer ref={containerRef} data-testid={formatTextTestIds(`plp-facets`)}>
                <FixedInfoContainer ref={infoContainerRef} top={infoContainerTop}>
                    <TotalProductsResult ref={totalProductsRef}>
                        <TotalProductsTitle variant="h3" component="h2" data-testid="plp-total-products" role="status">
                            {totalResults} {text.labels.products}
                        </TotalProductsTitle>
                        {isFilterSelected && (
                            <ClearAllLink
                                data-testid="plp-filter-clear-all-link"
                                onClick={clearAllFilters}
                                aria-label={text.labels.clearText}
                            >
                                {text.labels.clearText}
                            </ClearAllLink>
                        )}
                    </TotalProductsResult>
                    {showOpenFilterBtn && <OpenFilterButton handleOpenFilterBtnClick={handleOpenFilterBtnClick} />}
                </FixedInfoContainer>
                <FiltersContainer
                    ref={facetsContainerRef}
                    absoluteTop={facetAbsoluteTop}
                    showFixedFacets={showFixedFacets}
                    hide={hideFixedItems}
                    data-testid="plp-facet-items"
                    isFiltersHidden={showOpenFilterBtn}
                    totalProductsHeight={totalProductsHeight}
                >
                    {consolidatedFilters.map(facet => {
                        switch (filters[facet].type) {
                            case "feat":
                                return <FacetsFeats key={facet} name={facet} />
                            default:
                                return <FacetsFilters key={facet} name={facet} />
                        }
                    })}
                </FiltersContainer>
                {showFixedFacets && <div style={{height: underlayElementHeight}} />}
            </FilterContainer>
        </FilterFlexContainer>
    )
}

export default connect(FiltersComponent)
