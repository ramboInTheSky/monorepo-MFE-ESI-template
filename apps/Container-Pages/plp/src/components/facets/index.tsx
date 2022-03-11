import React, {useState, useEffect} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {Collapse} from "@mui/material"
import {TextModel} from "models/Text"
import connect from "./connect"
import Filter from "../facet"
import {StyledFacetsContainer} from "./components"
import {ViewLinkOptions} from "../../config/constants"
import FilterButton from "../filterButton"
import {FacetsState} from "../../models/FacetsState"

interface FacetsProps {
    facetName: string
    isViewMoreOpen?: boolean
    viewLink?: ViewLinkOptions
    firstFilters: string[]
    lastFilters?: string[]
    facets: FacetsState
    onClick: () => void
    toggleViewMore: () => void
    openViewAllModal: () => void
    handleSetFilter: (filterValue: string) => void
    isFetchingPageItems: boolean
    text: TextModel
}

export const Facets = ({
    isViewMoreOpen,
    toggleViewMore,
    openViewAllModal,
    viewLink,
    firstFilters,
    lastFilters,
    facets,
    handleSetFilter,
    isFetchingPageItems,
    text,
}: FacetsProps) => {
    const [first, setFirstFilters] = useState(firstFilters)
    const [last, setLastFilters] = useState(lastFilters)
    const [filterValueTooltipOpen, setFilterValueTooltipOpen] = useState<string>("")

    const filterTooltipHandler = (filterValue: string) => {
        setFilterValueTooltipOpen(filterValue)
    }

    useEffect(() => {
        if (isFetchingPageItems) {
            setFirstFilters(first)
            setLastFilters(last)
        } else {
            setFirstFilters(firstFilters)
            setLastFilters(lastFilters)
        }
    }, [isFetchingPageItems]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <StyledFacetsContainer>
            {first.map(option => (
                <Filter
                    key={`${option}-filter`}
                    facet={facets[option]}
                    handleSetFacet={handleSetFilter}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            ))}
            {viewLink === ViewLinkOptions.viewMore && (
                <Collapse in={isViewMoreOpen}>
                    <StyledFacetsContainer>
                        {last!.map(option => (
                            <Filter
                                key={`${option}-filter`}
                                facet={facets[option]}
                                handleSetFacet={handleSetFilter}
                                filterTooltipHandler={filterTooltipHandler}
                                filterValueTooltipOpen={filterValueTooltipOpen}
                            />
                        ))}
                    </StyledFacetsContainer>
                </Collapse>
            )}
            {viewLink === ViewLinkOptions.viewMore && (
                <FilterButton
                    text={isViewMoreOpen ? text.buttons.viewLess : text.buttons.viewMore}
                    data-testid={formatTextTestIds("plp-view-more-button")}
                    onClick={toggleViewMore}
                />
            )}
            {viewLink === ViewLinkOptions.viewAll && (
                <FilterButton
                    text={text.buttons.viewAll}
                    data-testid={formatTextTestIds("plp-view-all-button")}
                    onClick={openViewAllModal}
                />
            )}
        </StyledFacetsContainer>
    )
}

export default connect(Facets)
