import React from "react"
import {DrawerProps as MuiDrawerProps, useMediaQuery} from "@mui/material"
import {breakpoints} from "@monorepo/themes"
import {DrawerContainer, CloseIcon} from "./component"
import {formatCdnPath} from "../../utils/getCdnUrl"
import {SEARCH_DATA_GA, CLOSE_SEARCH_DATA_GA} from "../../config/constants"

export type DrawerProps = Pick<MuiDrawerProps, "open" | "anchor" | "children"> & {
    onClose: () => void
    text: any
}

const Drawer = ({anchor, open, onClose, children, text}: DrawerProps) => {
    const shouldDisableScrollLock = useMediaQuery(`(min-width:${breakpoints.values.md}px)`)

    const modalProps = {
        keepMounted: false,
        disableRestoreFocus: true,
        disableAutoFocus: true,
        disableEnforceFocus: true,
        closeAfterTransition: false,
        disablePortal: true,
        disableScrollLock: shouldDisableScrollLock,
        hideBackdrop: false,
    }

    return (
        <DrawerContainer className="drawer" anchor={anchor} open={open} onClose={onClose} ModalProps={modalProps}>
            <CloseIcon
                src={`${formatCdnPath("/icons/shared/amido_close-white.svg")}`}
                onClick={onClose}
                alt={text.closeIconText}
                data-ga-v1={SEARCH_DATA_GA}
                data-ga-v2={CLOSE_SEARCH_DATA_GA}
            />
            {children}
        </DrawerContainer>
    )
}

export default Drawer
