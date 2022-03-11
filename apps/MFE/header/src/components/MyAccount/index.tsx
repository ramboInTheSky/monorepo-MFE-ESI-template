import React, {useState, useEffect} from "react"
import ToolTip from "@monorepo/tooltip"
import {CTA} from "@monorepo/cta"
import Hidden from "@mui/material/Hidden"
import {useShoppingBagGetCallbackObservable, useModalsCloseObservable} from "@monorepo/eventservice"
import {PublishToModalsClosed} from "../../events/modalsClosed"
import Icon from "../Icon"
import connect from "./connect"
import Link from "../Link"
import {
    SignoutButton,
    Container,
    IconContainer,
    ViewAccountSummaryLink,
    ToolTipContent,
    Username,
    StyledHr,
    SmallIconContainer,
    ToolTipTitle,
    ToolTipUsername,
    TooltipFooter,
    TooltipHeader,
    ImgAccount,
} from "./component"
import {HEADER_NAV_BAR_QUICK_LINKS, HEADER_NAV_BAR_QUICK_LINKS_MY_ACCOUNT, NO_FOLLOW} from "../../config/constants"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

export type MyAccountProps = {
    accessibilityText: string
    isLoggedIn: boolean
    myAccountText: string
    narrowModeIcon: string
    wideModeIcon: string
    tooltipIcon: string
    url: string
    signoutUrl: string
    updateShoppingBag: (data: any) => void
    userUpdated: boolean
    text: any
    firstName: string
    hideText: boolean
}

export const MyAccount = ({
    hideText,
    accessibilityText,
    myAccountText,
    isLoggedIn,
    url,
    signoutUrl,
    narrowModeIcon,
    tooltipIcon,
    wideModeIcon,
    updateShoppingBag,
    userUpdated,
    text,
    firstName,
}: MyAccountProps) => {
    useShoppingBagGetCallbackObservable(data => {
        return updateShoppingBag(data)
    })

    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    const handleClose = event => {
        if (event) event.preventDefault()
        if (event?.type === "scroll" && event?.target !== document) return
        setOpen(false)
    }

    const handleClick = event => {
        if (!open) PublishToModalsClosed()

        setAnchorEl(event.currentTarget)
        event.preventDefault()
        setOpen(!open)
    }

    useEffect(() => {
        if (open) window.addEventListener("scroll", handleClose, true)
        else window.removeEventListener("scroll", handleClose)
    }, [open])

    useModalsCloseObservable(() => handleClose(null))

    const onClick = isLoggedIn ? {onClick: handleClick} : {onClick: removeFromLocalStorage}

    return (
        <div className="header-adaptive-my-account" data-testid="header-adaptive-my-account">
            <Hidden lgUp implementation="css">
                <SmallIconContainer onClick={removeFromLocalStorage} data-testid="header-adaptive-my-account-smallIcon">
                    <MyAccountLink
                        src={narrowModeIcon}
                        accessibilityText={accessibilityText}
                        url={url}
                        dataTestId="header-adaptive-my-account-smallIcon-container-link"
                    />
                </SmallIconContainer>
            </Hidden>

            <Hidden mdDown implementation="css">
                <Container>
                    <IconContainer
                        {...onClick}
                        showContainer={hideText || userUpdated}
                        data-testid="header-adaptive-my-account-icon-container"
                    >
                        <MyAccountLink
                            src={wideModeIcon}
                            accessibilityText={accessibilityText}
                            url={url}
                            hideText={hideText}
                            myAccountText={myAccountText}
                            dataTestId="header-adaptive-my-account-icon-container-link"
                        />
                    </IconContainer>

                    {isLoggedIn && (
                        <LoggedInTooltip
                            open={open}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                            tooltipIcon={tooltipIcon}
                            accessibilityText={accessibilityText}
                            url={url}
                            text={text}
                            firstName={firstName}
                            signoutUrl={signoutUrl}
                        />
                    )}
                </Container>
            </Hidden>
        </div>
    )
}

const MyAccountLink = ({src, accessibilityText, url, dataTestId, hideText = false, myAccountText = ""}) => {
    return (
        <Link
            href={url}
            dataGaV1={HEADER_NAV_BAR_QUICK_LINKS}
            dataGaV2={HEADER_NAV_BAR_QUICK_LINKS_MY_ACCOUNT}
            rel={NO_FOLLOW}
            dataTestId={dataTestId}
        >
            <ImgAccount src={src} alt={accessibilityText} />
            {!hideText && <Username> {myAccountText} </Username>}
        </Link>
    )
}

const LoggedInTooltip = ({
    open,
    anchorEl,
    handleClose,
    tooltipIcon,
    accessibilityText,
    url,
    text,
    firstName,
    signoutUrl,
}) => {
    return (
        <ToolTip open={open} anchorEl={anchorEl} handleClose={handleClose} animationTimeout={300}>
            <ToolTipContent data-testid="header-my-account-container">
                <TooltipHeader>
                    <ViewAccountSummaryLink
                        onClick={removeFromLocalStorage}
                        data-testid="header-my-account-container-tooltip-link"
                    >
                        <Icon src={tooltipIcon} alt={accessibilityText} />
                        <ToolTipTitle>
                            <a href={url} rel={NO_FOLLOW}>
                                {text.title}
                            </a>
                        </ToolTipTitle>
                    </ViewAccountSummaryLink>
                    <StyledHr />
                </TooltipHeader>
                <TooltipFooter>
                    <ToolTipUsername>
                        <span>{`${text.notText} ${firstName}?`}</span>
                    </ToolTipUsername>
                    <SignoutButton>
                        <CTA enable themeType="Secondary" url={signoutUrl} text={text.buttonText} />
                    </SignoutButton>
                </TooltipFooter>
            </ToolTipContent>
        </ToolTip>
    )
}

export default connect(MyAccount)
