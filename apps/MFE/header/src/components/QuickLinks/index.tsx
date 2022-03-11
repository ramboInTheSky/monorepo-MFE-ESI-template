import React from "react"
import QuickLink, {QuickLinkProps} from "../QuickLink"
import {List} from "./component"

export interface QuickLinksProps {
    quickLinks: QuickLinkProps[]
}

const QuickLinks = ({quickLinks}: QuickLinksProps) => (
    <List>
        {quickLinks.map(quickLink => (
                <QuickLink key={quickLink.accessibilityText} {...quickLink} />
        ))}
    </List>
)

export default QuickLinks
