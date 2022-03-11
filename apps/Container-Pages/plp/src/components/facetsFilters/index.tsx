import React from "react"
import Typography from "@mui/material/Typography"
import {formatTextTestIds} from "@monorepo/utils"
import {
    StyledAccordion,
    StyledAccordionSummary,
    StyledAccordionDetails,
    AccordionTitle,
    ClearLink,
    FieldSet,
} from "./components"
import env from "../../config/env"
import Facets from "../facets"
import connect from "./connect"
import {FilterType} from "../../config/constants"
import FacetsPrice from "../facetsPrice"
import {TextModel} from "../../models/Text"

interface FiltersFiltersProps {
    name: string
    displayName: string
    type: FilterType
    isOpen: boolean
    isFilterSelected?: boolean
    toggleExpansionPanel: (event: React.ChangeEvent<{}>) => void
    clearTypeFilters: () => void
    text: TextModel
}

export const FacetsFilters = ({
    name,
    displayName,
    isOpen,
    toggleExpansionPanel,
    clearTypeFilters,
    isFilterSelected,
    type,
    text,
}: FiltersFiltersProps) => {
    const clearTypeFiltersFn = event => {
        event.stopPropagation()
        clearTypeFilters()
    }

    return (
        <FieldSet>
            <StyledAccordion
                TransitionProps={{unmountOnExit: true}}
                square
                expanded={isOpen}
                onChange={toggleExpansionPanel}
            >
                <StyledAccordionSummary
                    expandIcon={
                        <img
                            src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/chevron.svg`}
                            alt={text.assetsAlt.chevron}
                        />
                    }
                    aria-controls={`plp-f-c-${name}`}
                    aria-label={displayName}
                    id={`plp-f-h-${name}`}
                    data-testid={formatTextTestIds(`plp-f-f-${name}`)}
                >
                    <AccordionTitle>
                        <Typography variant="h5">
                            <legend>{displayName}</legend>
                        </Typography>
                        {isFilterSelected && (
                            <Typography variant="h5">
                                <ClearLink
                                    data-testid={formatTextTestIds(`plp-filter-clear-link-${name}`)}
                                    onClick={clearTypeFiltersFn}
                                    aria-label={text.pages.filters.clearText}
                                >
                                    {text.pages.filters.clearText}
                                </ClearLink>
                            </Typography>
                        )}
                    </AccordionTitle>
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                    {type === "filter" && <Facets facetName={name} />}
                    {type === "price" && <FacetsPrice name={name} />}
                </StyledAccordionDetails>
            </StyledAccordion>
        </FieldSet>
    )
}

export default connect(FacetsFilters)
