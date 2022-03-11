import React, {FC} from "react"

import { TextModel } from "models/Text"
import connect from "./connect"
import {FilterFacet, FilterPrice} from "../../../models/Filter"
import {FiltersPanelContainer, PaddedWrapper} from "../components"
import FacetsPrice from "../../facetsPrice"
import {isPriceFilter} from "../../../models/Filter/typeGuards"
import LoadingText from "../loadingText"
import FilterDetails from "../filterDetails"

interface Props {
    filter: FilterFacet | FilterPrice | null
    isFetchingPageItems?: boolean
    text: TextModel
}

export const TabbedFiltersPanel: FC<Props> = ({filter, isFetchingPageItems, text}) => {
    if (!filter) return <></>

    if (isPriceFilter(filter)) {
        return (
            <FiltersPanelContainer data-testid="plp-tabbed-facets-panel">
                <PaddedWrapper>
                    {!isFetchingPageItems ? <FacetsPrice name={filter.name} isTabbedFilter /> : <LoadingText text={text} />}
                </PaddedWrapper>
            </FiltersPanelContainer>
        )
    }

    return <FilterDetails {...filter} showLoadingText={isFetchingPageItems} text={text} />
}

export default connect(TabbedFiltersPanel)
