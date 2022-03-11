import React, {useEffect, useState} from "react"
import {FadeInAnimation} from "@monorepo/animations"
import Cookies from "js-cookie"
import Typography from "@mui/material/Typography"
import connect from "./connect"
import {CLOSE_ICON_URL, COOKIE_VALUE} from "../../config/constants"
import {formatCdnPath} from "../../utils/getCdnUrl"
import {IS_BROWSER} from "../../utils/window"
import {doCookiePolicy} from "../../utils/featureSwitch"
import {Container, StyledTitle, Link, StyledIcon} from "./component"

const EXPIRATION_DAYS = 365

export type CookieConsentProps = {
    cookieDomain: string
    hasConsentCookie: boolean
    privacyUrl: string
    cookieName: string
    text: any
}

export const CookieConsent = ({cookieDomain, hasConsentCookie, privacyUrl, cookieName, text}: CookieConsentProps) => {
    const [showPopUp, setShowPopUp] = useState(false)
    const {title, body, link, linkText, closeIconAltText} = text

    const onClickHandler = () => {
        setShowPopUp(false)
    }

    useEffect(() => {
        if (doCookiePolicy() && !hasConsentCookie && IS_BROWSER()) {
            Cookies.set(cookieName, COOKIE_VALUE, {expires: EXPIRATION_DAYS, domain: cookieDomain})
            setShowPopUp(true)
        }
    }, [hasConsentCookie, cookieName, cookieDomain])

    return (
        <FadeInAnimation show={showPopUp} timeout={300}>
            <Container id="cookie-consent" data-testid="header-cookie-consent">
                <StyledIcon
                    data-testid="header-cookie-consent-close"
                    onClick={onClickHandler}
                    src={`${formatCdnPath(CLOSE_ICON_URL)}`}
                    alt={closeIconAltText}
                />
                <StyledTitle variant="h5">{title}</StyledTitle>
                <Typography>{body}</Typography>
                <Typography>
                    <Link data-testid="header-cookie-consent-privacy-link" href={privacyUrl}>
                        {link}
                    </Link>{" "}
                    {linkText}
                </Typography>
            </Container>
        </FadeInAnimation>
    )
}

export default connect(CookieConsent)
