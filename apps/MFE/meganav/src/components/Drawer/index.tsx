import React from "react"
import {DrawerProps as MuiDrawerProps} from "@mui/material"
import {DrawerContainer, CloseIcon} from "./component"
import urls from "../../config/urls"
import connect from "./connect"

export type DrawerProps = Pick<MuiDrawerProps, "open" | "anchor" | "children"> & {
    showCloseIcon?: boolean
    onClose: () => void
    text: any
}

const modalProps = {
    keepMounted: true,
    disableRestoreFocus: true,
    disableAutoFocus: true,
    disableEnforceFocus: true,
    closeAfterTransition: false,
    disablePortal: true,
}

const Drawer = ({anchor, open, onClose, showCloseIcon = true, children, text}: DrawerProps) => (
    <DrawerContainer
        data-testid="drawer"
        className="drawer"
        anchor={anchor}
        open={open}
        onClose={onClose}
        transitionDuration={0}
        ModalProps={modalProps}
    >
        {showCloseIcon && (
            <CloseIcon alt={text.drawerIconAltText} src={`${urls.drawerCloseIcon}`} onClick={onClose} />
        )}
        {children}
    </DrawerContainer>
)

export default connect(Drawer)
