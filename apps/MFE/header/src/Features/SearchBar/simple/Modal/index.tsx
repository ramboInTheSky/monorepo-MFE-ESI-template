import React from "react"

import {Wrapper} from "./components"

import Modal from "../../../../components/Modal"

export type ModalProps = {
    open: boolean
    closeText: string
    handleClose: () => void
    children: JSX.Element
}

const SimpleModal = ({open, handleClose, children, closeText}: ModalProps) => {
    return (
        <Wrapper>
            <Modal open={open} handleClose={handleClose} hideBackdrop>
                <>
                    {children}
                    <div tabIndex={0} role="button" onFocus={handleClose} aria-label={closeText} />
                </>
            </Modal>
        </Wrapper>
    )
}

export default SimpleModal
