import React from "react"
import {Backdrop} from "@mui/material"
import {Container} from "./component"
import {MODAL_TIMEOUT} from "../../config/constants"
import {handlePropagation} from "../../utils/handlePropagation"

export type ModalProps = {
    open: boolean
    handleClose: () => void
    children: JSX.Element
    darkerBackdrop?: boolean
    hideBackdrop?: boolean
}
const innerModalDefaultProps = {
    disableRestoreFocus: true,
    disableAutoFocus: true,
    disableEnforceFocus: true,
    disablePortal: true,
    keepMounted: false,
    disableScrollLock: true,
}

const Modal = ({open, handleClose, children, darkerBackdrop, hideBackdrop = false}: ModalProps) => (
    <Container
        {...innerModalDefaultProps}
        data-testid="modal"
        open={open}
        onClose={handleClose}
        onClick={handlePropagation}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: MODAL_TIMEOUT}}
        $darkerBackdrop={darkerBackdrop}
        hideBackdrop={hideBackdrop}
    >
        <>{children}</>
    </Container>
)

export default Modal
