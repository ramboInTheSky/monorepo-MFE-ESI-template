import React from "react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {fireEvent, render} from "@testing-library/react"
import {CountryChangeConfirmPopup} from "."
import {mockState, mockTheme, mockText} from "../../../__mocks__/mockStore"
import redirectPage from "../../utils/redirectPage"

jest.mock("../../utils/redirectPage", () => ({
    __esModule: true,
    default: jest.fn(),
}))
describe("CountryChangeConfirmPopup component", () => {
    const closeModalMock = jest.fn()

    const props = {
        showModal: true,
        selectedCountry: mockState.countrySelector.selectedCountry,
        selectedLanguage: mockState.countrySelector.selectedLanguage,
        closeModal: closeModalMock,
        text: mockText.countryChangeModal,
    }

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <CountryChangeConfirmPopup {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call redirectPage if the 'Continue' button is pressed", () => {
        const wrapper = render(
            <SCThemeProvider theme={mockTheme}>
                <CountryChangeConfirmPopup {...props} />
            </SCThemeProvider>,
        )
        const confirmButton = wrapper.getByTestId("header-country-change-modal-confirm")

        fireEvent.click(confirmButton)
        expect(redirectPage).toBeCalled()
    })

    it("should call requestCountryChange if the 'Cancel' button is pressed", () => {
        const wrapper = render(
            <SCThemeProvider theme={mockTheme}>
                <CountryChangeConfirmPopup {...props} />
            </SCThemeProvider>,
        )
        const cancelButton = wrapper.getByTestId("header-country-change-modal-cancel")

        fireEvent.click(cancelButton)
        expect(closeModalMock).toBeCalled()
    })
})
