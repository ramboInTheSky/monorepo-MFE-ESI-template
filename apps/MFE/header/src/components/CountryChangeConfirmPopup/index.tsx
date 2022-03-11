import React from "react"
import {
    Container,
    StyledTitle,
    StyledText,
    StyledButtonWrapper,
    StyledButtonConfirm,
    StyledButtonCancel,
} from "./component"
import Modal from "../Modal"
import {Country as CountryType} from "../../models/countryselector"
import connect from "./connect"
import redirectPage from "../../utils/redirectPage"

type CountryChangeConfirmPopupProps = {
    showModal: boolean
    selectedCountry: CountryType | null
    selectedLanguage: string | null
    closeModal: () => void
    text: any
}

export const CountryChangeConfirmPopup = ({
    showModal,
    selectedCountry,
    selectedLanguage,
    closeModal,
    text
}: CountryChangeConfirmPopupProps) => {
    const {titleText, bodyTextPt1, bodyTextPt2, confirm, cancel} = text

    const redirectPageHandler = () => {
        redirectPage(selectedCountry, selectedLanguage)
    }

    return (
        <Modal data-testid="header-country-change-modal" open={showModal} handleClose={closeModal} darkerBackdrop>
            <Container data-testid="header-country-change-modal-wrapper">
                <StyledTitle variant="h5">{titleText}</StyledTitle>
                <StyledText>{bodyTextPt1}</StyledText>
                <StyledText>{bodyTextPt2}</StyledText>
                <StyledButtonWrapper>
                    <StyledButtonConfirm
                        data-testid="header-country-change-modal-confirm"
                        onClick={redirectPageHandler}
                    >
                        {confirm}
                    </StyledButtonConfirm>
                    <StyledButtonCancel
                        data-testid="header-country-change-modal-cancel"
                        onClick={closeModal}
                    >
                        {cancel}
                    </StyledButtonCancel>
                </StyledButtonWrapper>
            </Container>
        </Modal>
    )
}

export default connect(CountryChangeConfirmPopup)
