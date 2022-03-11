import React from "react"
import Hidden from "@mui/material/Hidden"
import QuickLinks from "../QuickLinks"
import {Container} from "./component"
import connect from "./connect"
import {QuickLinkProps} from "../QuickLink"

export type QuickLinksContainerProps = {
    quickLinks: QuickLinkProps[] | undefined
    hiddenProps?: any | {}
}

export const QuickLinksContainer = ({hiddenProps, quickLinks}: QuickLinksContainerProps) => {
    if (quickLinks && quickLinks.length === 0) return null
    return (
        <div data-testid="header-adaptive-links" className="header-adaptive-links">
            <Hidden {...hiddenProps} implementation="css">
                <Container>
                    <div className="header-adaptive-quicklinks" data-testid="header-adaptive-quicklinks">
                        <QuickLinks quickLinks={quickLinks!} />
                    </div>
                </Container>
            </Hidden>
        </div>
    )
}

export default connect(QuickLinksContainer)
