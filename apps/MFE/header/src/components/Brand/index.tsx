import React from "react"
import Icon from "../Icon"
import connect from "./connect"
import {Container} from "./component"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

export type BrandProps = {
    narrowModeIcon: string
    wideModeIcon: string
    tooltip: string
    url: string
    accessibilityText: string
}

export const Brand = ({accessibilityText, tooltip, url, narrowModeIcon, wideModeIcon}: BrandProps) => (
    <Container className="header-adaptive-brand" data-testid="header-adaptive-brand" onClick={removeFromLocalStorage}>
        <a aria-label={accessibilityText} title={tooltip} href={url}>
            <Icon src={narrowModeIcon} alt={accessibilityText} />
        </a>
    </Container>
)

export default connect(Brand)
