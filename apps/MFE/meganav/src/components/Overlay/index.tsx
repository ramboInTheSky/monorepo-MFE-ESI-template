import React, {useEffect, useState} from "react"
import {Backdrop} from "@mui/material"
import {Container} from "./component"
import {OVERLAY_TIMEOUT, PRIMARY_NAV_ITEM_HOVER_DELAY} from "../../config/constants"

export type OverlayProps = {
    open: boolean
    children: JSX.Element
    handleClose: () => void
}
const innerOverlayDefaultProps = {
    disableRestoreFocus: true,
    disableAutoFocus: true,
    disableEnforceFocus: false,
    disablePortal: true,
    keepMounted: false,
    closeAfterTransition: true,
    disableScrollLock: true,
    disableEscapeKeyDown: false,
}
let timerId: any = 0
const Overlay = ({open, children, handleClose}: OverlayProps) => {
    const [delayedOpen, setOpen] = useState(false)
    useEffect(() => {
        timerId = setTimeout(() => setOpen(open), PRIMARY_NAV_ITEM_HOVER_DELAY)
        return () => {
            handleClose()
            clearTimeout(timerId)
        }
    }, [open, handleClose])

    return (
        <Container
            {...innerOverlayDefaultProps}
            data-testid="overlay"
            open={delayedOpen}
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: OVERLAY_TIMEOUT}}
            onClose={handleClose}
        >
            <>{children}</>
        </Container>
    )
}

export default Overlay
