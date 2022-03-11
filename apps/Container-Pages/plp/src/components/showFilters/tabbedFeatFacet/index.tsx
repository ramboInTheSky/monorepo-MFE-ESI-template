import React, {FC} from "react"

import connect from "./connect"
import {FeatFacetsContainer} from "../components"
import TabbedFilter from "../tabbedFilter"

interface Props {
    filters: string[]
    hasSelectedFacet: boolean
}

const TabbedFeatFacet: FC<Props> = ({filters, hasSelectedFacet}) => (
    <FeatFacetsContainer showRightBorder={hasSelectedFacet}>
        {filters.map(filter => (
            <TabbedFilter key={filter} filterName={filter} />
        ))}
    </FeatFacetsContainer>
)
export default connect(TabbedFeatFacet)
