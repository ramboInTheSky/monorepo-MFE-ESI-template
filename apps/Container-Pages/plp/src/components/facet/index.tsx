import React, {useCallback, useEffect, useState} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import connect from "./connect"
import env from "../../config/env"
import {featAvailable, featBackInStock, featDeliverBy} from "../../config/constants"
import {FacetCheckbox, FacetCountLabel, FacetLabel, FacetLabelText, FacetTooltipIcon} from "./components"
import {FacetState} from "../../models/FacetsState"
import TooltipComponent from "../filterTooltip"

interface FacetProps {
    handleSetFacet: (facetValue: string) => void
    facet: FacetState
    enabledTooltips: boolean
    filterTooltipHandler: (filterValue: string) => void
    filterValueTooltipOpen: string
    modal?: boolean
}

export const Facet = ({
    facet = {} as any,
    handleSetFacet,
    enabledTooltips,
    filterTooltipHandler,
    filterValueTooltipOpen,
    modal = false,
}: FacetProps) => {
    const [visibleTooltip, setVisibleTooltip] = useState<boolean>(false)
    const {v, s, c, n, d} = facet

    useEffect(() => {
        if (v === featAvailable || v === featBackInStock || v === featDeliverBy) {
            setVisibleTooltip(true)
        }
    }, [v])

    const handleTooltipClose = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        filterTooltipHandler("")
        event.stopPropagation()
        event.preventDefault()
    }

    const handleTooltipOpen = (event: any) => {
        filterTooltipHandler(v)
        event.stopPropagation()
        event.preventDefault()
    }

    const handleChange = useCallback(() => {
        handleSetFacet(v)
    }, [handleSetFacet, v])

    const handleKeyDown = useCallback(
        e => {
            if (e.key === "Enter") {
                handleChange()
            }
        },
        [handleChange],
    )

    const checkboxName = `plp-facet-checkbox-${(modal ? "modal-" : "") + v}`
    const labelName = `plp-facet-checkbox-${modal ? "modal-" : ""}label-${v}`
    return (
        <>
            <FacetCheckbox
                type="checkbox"
                data-testid={formatTextTestIds(checkboxName)}
                checked={s ?? false}
                value={v}
                name={checkboxName}
                id={checkboxName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={d}
            />
            <FacetLabel
                $checked={s}
                $disabled={d}
                data-testid={formatTextTestIds(labelName)}
                component="label"
                htmlFor={checkboxName}
                id={labelName}
                tabIndex={-1}
            >
                <FacetLabelText
                    data-testid={formatTextTestIds(`plp-facet-modal-label-${v}`)}
                    title={n}
                    needsTruncating={v === featDeliverBy}
                >
                    {n}
                </FacetLabelText>
                <FacetCountLabel data-testid={formatTextTestIds(`plp-facet-modal-count-label-${v}-${c}`)}>
                    ({c})
                </FacetCountLabel>
                {enabledTooltips && visibleTooltip && (
                    <>
                        <FacetTooltipIcon
                            onClick={handleTooltipOpen}
                            data-testid={formatTextTestIds(`plp-facet-tooltip-icon-${v}`)}
                            src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/help-question.svg`}
                            alt={`${n} Tooltip Icon`}
                            aria-label={`${v}-filter-tooltip-open`}
                        />
                    </>
                )}
            </FacetLabel>
            {filterValueTooltipOpen === v && (
                <TooltipComponent handleTooltipClose={handleTooltipClose} filterType={v} />
            )}
        </>
    )
}

export default connect(Facet)
