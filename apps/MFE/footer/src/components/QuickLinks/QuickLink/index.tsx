import React from "react"
import logger from "@monorepo/core-logger"

import {formatTextTestIds} from "@monorepo/utils"
import {SubRegionElementModel} from "../../../models/footerModel"
import {targetWindow} from "../../../utils/targetWindow"
import configUrlPath from "../../../utils/configUrlPath"
import env from "../../../config/env"
import {QuickLinkContent, QuickLinkDescription, QuickLinkImg, QuickLinkTitle, StyledLink} from "./components"
import connect from "./connect"
import {formatCdnPathWithVariant} from "../../../utils/getCdnUrl"

const {REACT_APP_BLOB_STORAGE_PATH} = env

type QuickLinkProps = {
    data: SubRegionElementModel | any
    siteUrl: string
    realm: string
    variant: string
}

export const QuickLink = (props: QuickLinkProps) => {
    const {url, openInNewWindow, text, icon, description, accessibilityText, type} = props.data
    const {siteUrl, realm, variant} = props

    if (!siteUrl) {
        logger.error("Quicklinks/Quicklink - site url is not defined")
    }

    return (
        <StyledLink
            href={configUrlPath(url, siteUrl)}
            target={targetWindow(openInNewWindow)}
            aria-label={accessibilityText}
            data-testid={formatTextTestIds(`footer-quick-links-${type}-${text}`)}
        >
            {icon && (
                <QuickLinkImg
                    src={`${REACT_APP_BLOB_STORAGE_PATH}${formatCdnPathWithVariant(icon, realm, variant)}`}
                    aria-hidden="true"
                    alt={accessibilityText}
                />
            )}

            <QuickLinkContent>
                <QuickLinkTitle data-testid={formatTextTestIds(`footer-quick-links-title-${text}`)} variant="h5">
                    {text}
                </QuickLinkTitle>

                <QuickLinkDescription
                    data-testid={formatTextTestIds(`footer-quick-links-description-${description}`)}
                    variant="subtitle1"
                    component="h4"
                >
                    {description}
                </QuickLinkDescription>
            </QuickLinkContent>
        </StyledLink>
    )
}

export default connect(QuickLink)
