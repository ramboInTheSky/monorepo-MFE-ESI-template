import React, {useState, useEffect} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {
    CloseIcon,
    CloseIconButton,
    Tooltip,
    TooltipArrowShadow,
    TooltipArrowNoShadow,
    TooltipBody,
    TooltipTerms,
    TooltipTitle,
    TooltipTitleWrapper,
    TooltipWrapper,
} from "./components"
import connect from "./connect"
import env from "../../config/env"
import {featAvailable, featBackInStock, featDeliverBy} from "../../config/constants"
import {TextModel} from "../../models/Text"

interface TooltipProps {
    handleTooltipClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    filterType: string
    text: TextModel
    siteUrl: string
}

const TooltipComponent = ({handleTooltipClose, filterType, text, siteUrl}: TooltipProps) => {
    const [showTermsOfService, setShowTermsOfService] = useState<boolean>(false)
    const [tooltipTitle, setTooltipTitle] = useState<string>("")
    const [tooltipBodyText, setTooltipBodyText] = useState<string>("")

    useEffect(() => {
        if (filterType === featAvailable || filterType === featDeliverBy) setShowTermsOfService(true)

        switch (filterType) {
            case featAvailable:
                setTooltipTitle("In Stock")
                setTooltipBodyText(text.labels.tooltipInStock)
                break
            case featDeliverBy:
                setTooltipTitle("Deliver by Christmas")
                setTooltipBodyText(text.labels.tooltipDeliverByChristmas)
                break
            case featBackInStock:
                setTooltipTitle("Back in stock")
                setTooltipBodyText(text.labels.tooltipBackInStock)
                break
            default:
                setTooltipTitle("")
                break
        }
    }, [filterType, text])

    const tooltipNameId = `plp-facet-tooltip-${filterType}`
    const tooltipTitleId = `plp-facet-tooltip-title-${filterType}`
    const tooltipBodyId = `plp-facet-tooltip-body-${filterType}`

    return (
        <Tooltip data-testid={formatTextTestIds(tooltipNameId)}>
            <TooltipArrowShadow />
            <TooltipArrowNoShadow />
            <TooltipWrapper>
                <TooltipTitleWrapper>
                    <TooltipTitle data-testid={formatTextTestIds(tooltipTitleId)}>{tooltipTitle}</TooltipTitle>
                    <CloseIconButton data-testid="plp-filters-close-button" onClick={e => handleTooltipClose(e)}>
                        <CloseIcon
                            src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/close-black.svg`}
                            alt="Close Icon"
                            aria-label={`${filterType}-filter-tooltip-close`}
                        />
                    </CloseIconButton>
                </TooltipTitleWrapper>
                <TooltipBody data-testid={formatTextTestIds(tooltipBodyId)}>
                    {tooltipBodyText}
                    {filterType === "feat:deliveryby" ? ` ${new Date().getFullYear()}). ` : ` `}
                    {showTermsOfService && (
                        <span>
                            {text.labels.toolTipTermsAndConditionsStart}
                            <TooltipTerms aria-label={`${filterType}-filter-tooltip-terms`} href={`${siteUrl}/terms`}>
                                {text.labels.toolTipTermsAndConditions}
                            </TooltipTerms>
                            {text.labels.toolTipTermsAndConditionsEnd}
                        </span>
                    )}
                </TooltipBody>
            </TooltipWrapper>
        </Tooltip>
    )
}

export default connect(TooltipComponent)
