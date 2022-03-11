import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {targetWindow} from "../../../../utils/targetWindow"
import {LogoutLinkComponent} from "./components"

interface LogoutLinkProps {
    openInNewWindow: boolean
    accessibilityText: string
    url: string
    linkText: string
}

const LogoutLink = (props: LogoutLinkProps) => {
    return (
        <LogoutLinkComponent
            data-testid={formatTextTestIds(`footer-quick-links-${props.linkText}-button`)}
            target={targetWindow(props.openInNewWindow)}
            aria-label={props.accessibilityText}
            href={props.url}
        >
            {props.linkText}
        </LogoutLinkComponent>
    )
}

export default LogoutLink
