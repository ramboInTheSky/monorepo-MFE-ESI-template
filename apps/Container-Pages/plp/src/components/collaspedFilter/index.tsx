import React, {Fragment} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {FacetName, FacetList} from "./components"

interface CollaspedFilterComponentProps {
    filteredFacets: {[key: string]: string[]}
}

export const CollaspedFilter = ({filteredFacets}: CollaspedFilterComponentProps) => (
    <>
        {Object.entries(filteredFacets).map(([facet, value]) => {
            return (
                <Fragment key={facet}>
                    <FacetName variant="h5" data-testid={formatTextTestIds(`plp-collasped-facet-${facet}`)}>
                        {facet} ({value.length}):
                    </FacetName>
                    <FacetList>
                        {value.map((filterName: string, key: number) => {
                            return (
                                <span
                                    key={`${facet}-${filterName}`}
                                    data-testid={formatTextTestIds(`plp-collasped-facet-${facet}-${filterName}`)}
                                >
                                    {filterName}
                                    {value.length === key + 1 ? "" : ", "}
                                </span>
                            )
                        })}
                    </FacetList>
                </Fragment>
            )
        })}
    </>
)

export default CollaspedFilter
