import React from "react"
import logger from "@monorepo/core-logger"
import {UserDuckState} from "../../../ducks/user"
import {SubRegionElementModel} from "../../../models/footerModel"
import {DefaultColumns} from "../../../models/regions"
import LogoutLink from "./LogoutQuickLinkButton"
import LogoutQuickLinkText from "./LogoutQuickLinkText"
import connect from "./connect"
import configUrlPath from "../../../utils/configUrlPath"

import {LogoutWrapper, LogoutContainer, LogoutHidden} from "./components"

interface LogoutLinkComponentProps {
    elements: SubRegionElementModel[]
    key: number
    user: UserDuckState
    siteUrl: string | null
}

export enum SupportedLogoutTypes {
    Logout = "Logout",
    LogoutButton = "LogoutButton",
}

export const LogoutLinkComponent = (props: LogoutLinkComponentProps) => {
    const {
        elements,
        key,
        user: {loggedIn, accountFirstName},
        siteUrl,
    } = props

    if (
        elements.length !== 2 ||
        !elements.some(element => element.type === SupportedLogoutTypes.Logout) ||
        !elements.some(element => element.type === SupportedLogoutTypes.LogoutButton)
    ) {
        logger.warn("INVALID QUICKLINKS LOGOUT JSON")
        return null
    }

    if (!loggedIn) return null

    return (
        <LogoutHidden lgUp implementation="css">
            <LogoutContainer
                key={key}
                item
                xs={DefaultColumns.xs}
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                container
            >
                {elements.map((element: SubRegionElementModel) => {
                    let logoutUrl
                    // TEMP FIX - THIS WILL BE REMOVED
                    if (element.type === SupportedLogoutTypes.LogoutButton) {
                        logoutUrl = element.url
                        const containsNewLogoutUrl = logoutUrl.indexOf("/forget-me") !== -1

                        if (!containsNewLogoutUrl) {
                            logger.warn(
                                `Logout component, ${SupportedLogoutTypes.LogoutButton} url is using old path ${element.url}`,
                            )
                            logoutUrl = "/forget-me"
                        }
                    }
                    return (
                        <LogoutWrapper key={element.type}>
                            {element.type === SupportedLogoutTypes.Logout && (
                                <LogoutQuickLinkText text={element.text} accountFirstName={accountFirstName} />
                            )}
                            {element.type === SupportedLogoutTypes.LogoutButton && (
                                <LogoutLink
                                    linkText={element.text}
                                    openInNewWindow={element.openInNewWindow}
                                    accessibilityText={element.accessibilityText}
                                    url={configUrlPath(logoutUrl, siteUrl)}
                                />
                            )}
                        </LogoutWrapper>
                    )
                })}
            </LogoutContainer>
        </LogoutHidden>
    )
}

export default connect(LogoutLinkComponent)
