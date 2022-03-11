import React from "react"

import {Wrapper} from "./component"

import Modal from "../../../../components/Modal"

export type ModalProps = {
    open: boolean
    closeText: string
    handleClose: () => void
    children: JSX.Element
}
const EnrichModal = ({open, handleClose, children, closeText}: ModalProps) => (
    <Wrapper>
        <Modal open={open} handleClose={handleClose} hideBackdrop={false}>
            <>
                {children}
                <div tabIndex={0} role="button" onFocus={handleClose} aria-label={closeText} />
            </>
        </Modal>
    </Wrapper>
)

export default EnrichModal
