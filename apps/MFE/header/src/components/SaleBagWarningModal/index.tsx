import React, {useState} from "react"
import Typography from "@mui/material/Typography"
import CTA from "../CTA"

import Modal from "../Modal"
import connect from "./connect"
import {SaleBagWarning} from "../../models/text"
import {ModalContainer, ButtonContainer} from "./components"

type SaleBagWarningModalProps = {
    text: SaleBagWarning
    remainOnMainSiteAction: () => void
    vipSitePath: string
    openModal: boolean
}
export const SaleBagWarningModal = ({
    text: {title, textOne, textTwo, primaryButtonText, secondaryButtonText},
    remainOnMainSiteAction,
    openModal = false,
    vipSitePath,
}: SaleBagWarningModalProps) => {
    const [isOpen, setOpenModal] = useState(openModal)

    const remainOnMainSiteLogic = () => {
        remainOnMainSiteAction()
        setOpenModal(false)
    }

    const goToVipSite = () => {
        window.location.href = vipSitePath
    }
    return (
        <Modal open={isOpen} handleClose={remainOnMainSiteLogic} hideBackdrop={false}>
            <ModalContainer>
                <Typography variant="h3">{title}</Typography>
                <p>{textOne}</p>
                <p>{textTwo}</p>
                <ButtonContainer>
                    <CTA
                        testId="header_SaleBagWarningModal_goToVipButton"
                        enable
                        onClick={goToVipSite}
                        themeType="Secondary"
                        text={primaryButtonText}
                    />
                    <CTA
                        testId="header_SaleBagWarningModal_stayMainSiteButton"
                        enable
                        onClick={remainOnMainSiteLogic}
                        themeType="Primary"
                        text={secondaryButtonText}
                    />
                </ButtonContainer>
            </ModalContainer>
        </Modal>
    )
}

export default connect(SaleBagWarningModal)
