import React from "react"
import { TextModel } from "models/Text"
import connect from "./connect"
import FadeInAnimation from "../fadeInAnimation"
import {OpenFiltersButton, ButtonContainer} from "./components"
import CollaspedFilter from "../collaspedFilter"
import CollaspedPriceFilter from "../collaspedPriceFilter"

interface OpenFilterButtonProps {
    isFilterSelected?: boolean
    handleOpenFilterBtnClick: () => void
    isFilteredPrice: boolean
    filteredFacets: {[key: string]: string[]}
    text: TextModel
}

export const OpenFilterButtonComponent = ({
    isFilterSelected,
    handleOpenFilterBtnClick,
    isFilteredPrice,
    filteredFacets,
    text
}: OpenFilterButtonProps) => {

    return (
        <FadeInAnimation timeout={300} show>
            <ButtonContainer onClick={handleOpenFilterBtnClick} data-testid="plp-facets-collapsed-container">
                <OpenFiltersButton
                    data-testid="plp-facets-open-filters-btn"
                    onClick={handleOpenFilterBtnClick}
                    disableRipple
                >
                    {text.buttons.openFilters}
                </OpenFiltersButton>
                {isFilterSelected && <CollaspedFilter filteredFacets={filteredFacets} />}
                {isFilteredPrice && <CollaspedPriceFilter />}
            </ButtonContainer>
        </FadeInAnimation>
    )
}

export default connect(OpenFilterButtonComponent)
