import React, {FC, Fragment} from "react"
import {TextModel} from "models/Text"
import {FiltersPanelContainer} from "../components"
import BrandSearchBar from "../tabbedFilterBrandSearch"
import TabbedFilter from "../tabbedFilter"
import isNumeric from "../../../utils/isNumeric"
import {TabbedFilterContainer, AlphabetSection, PromotedBrandsContainer} from "../tabbedFiltersPanel/components"
import {BRAND, BRAND_0_9} from "../../../config/constants"
import connect from "./connect"

interface Props {
    setBrandNameForSearch: (e: React.SyntheticEvent) => void
    filtersBrand: {restOfFilteredBrands: string[]; filteredBrandsOfTopFive: string[]}
    brandSearch: string
    text: TextModel
}

export const TabbedFilterBrand: FC<Props> = ({filtersBrand, setBrandNameForSearch, brandSearch, text}) => {
    const alphabeticalOrderFilters = filtersBrand.restOfFilteredBrands.reduce((acc, filter) => {
        const filterName = filter.split(":")
        const firstChar = filterName[1]?.substring(0, 1).toUpperCase()
        if (Object.prototype.hasOwnProperty.call(acc, firstChar) && !isNumeric(firstChar)) {
            acc[firstChar].push(filter)
        } else if (isNumeric(firstChar)) {
            if (acc[BRAND_0_9]) acc[BRAND_0_9].push(filter)
            else acc[BRAND_0_9] = [filter]
        } else {
            acc[firstChar] = [filter]
        }

        return acc
    }, {})

    return (
        <FiltersPanelContainer data-testid="plp-tabbed-filters-panel-brand">
            <BrandSearchBar setBrandNameForSearch={setBrandNameForSearch} brandSearch={brandSearch} text={text} />
            <PromotedBrandsContainer data-testid="plp-tabbed-facets-panel-promoted-brands">
                {filtersBrand.filteredBrandsOfTopFive.map(filter => (
                    <TabbedFilter
                        key={filter}
                        filterName={filter}
                        isTabbedFilter
                        data-testid="plp-tabbed-facets-promoted-brand"
                    />
                ))}
            </PromotedBrandsContainer>
            <TabbedFilterContainer data-testid="plp-tabbed-facets-other-brands">
                {Object.keys(alphabeticalOrderFilters)
                    .sort()
                    .map(letter => (
                        <Fragment key={letter}>
                            <AlphabetSection data-testid={`plp-tabbed-brand-alphabet-title-${letter}`}>
                                {letter}
                            </AlphabetSection>
                            {alphabeticalOrderFilters[letter].sort().map(filter => (
                                <TabbedFilter key={filter} filterName={filter} facetName={BRAND} isTabbedFilter />
                            ))}
                        </Fragment>
                    ))}
            </TabbedFilterContainer>
        </FiltersPanelContainer>
    )
}

export default connect(TabbedFilterBrand)
