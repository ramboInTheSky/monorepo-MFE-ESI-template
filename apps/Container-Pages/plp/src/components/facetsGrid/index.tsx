import React, {useRef} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import connect from "./connect"
import {FacetsGridContainer, FacetsGridList, FacetsGridListItem} from "./components"
import {FacetState} from "../../models/FacetsState"
import Filter from "../facet"

export interface FacetsGridProps {
    facets: FacetState[]
    handleSetFacet: (filterValue: string) => void
}

export const FacetsGrid = ({facets, handleSetFacet}: FacetsGridProps) => {
    const filtersGridContainerElement = useRef<HTMLDivElement>(null)
    return (
        <FacetsGridContainer
            data-testid={formatTextTestIds("filter-grid-container")}
            ref={filtersGridContainerElement}
            variant="outlined"
            square
        >
            <FacetsGridList>
                {facets.map(filter => (
                    <FacetsGridListItem key={filter.v}>
                        <Filter key={`${filter.v}-filter-grid`} facet={filter} handleSetFacet={handleSetFacet} modal />
                    </FacetsGridListItem>
                ))}
            </FacetsGridList>
        </FacetsGridContainer>
    )
}

export default connect(FacetsGrid)
