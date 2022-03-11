import React from "react"
import logger from "@monorepo/core-logger"
import {replaceText, formatTextTestIds} from "@monorepo/utils"
import {LogoutText} from "./components"
import {REPLACE_USERNAME} from "../../../../config/constants"

interface LogoutQuickLinkTextProps {
    text: string
    accountFirstName: string
}

export enum SupportedLogoutTypes {
    Logout = "Logout",
    LogoutButton = "LogoutButton",
}

const LogoutQuickLinkText = (props: LogoutQuickLinkTextProps) => {
    const {text, accountFirstName} = props

    // eslint-disable-next-line @typescript-eslint/prefer-includes
    if (text.indexOf(REPLACE_USERNAME) === -1) {
        logger.error("INVALID QUICKLINKS LOGOUT TEXT JSON - Does not contain <username>")
        return null
    }
    const firstName = replaceText(text, accountFirstName, /<username>/)

    return (
        <LogoutText variant="h5" data-testid={formatTextTestIds(`footer-quick-links-logout-text`)}>
            {firstName}
        </LogoutText>
    )
}

export default LogoutQuickLinkText
