import React, {useCallback} from "react"
import { TextModel } from "models/Text"
import {ViewResultsButton} from "../components"
import connect from "./connect"

interface TabbedFilterViewResultsProps {
    totalResults: number
    closeTabbedFilters: () => void
    text: TextModel
}

export const TabbedFilterViewResults = ({totalResults, closeTabbedFilters, text}: TabbedFilterViewResultsProps) => {
    const closeFiltersPanel = useCallback(() => {
        closeTabbedFilters()
    }, [closeTabbedFilters])

    return (
        <ViewResultsButton onClick={closeFiltersPanel} data-testid="plp-filters-view-products-cta-button" disableRipple>
            {text.buttons.viewResults} {totalResults} {text.buttons.viewProducts}
        </ViewResultsButton>
    )
}

export default connect(TabbedFilterViewResults)
