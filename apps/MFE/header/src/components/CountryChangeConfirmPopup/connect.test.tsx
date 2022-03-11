import {mapStateToProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"

jest.mock("../../utils/redirectPage", () => ({
  redirectPage: jest.fn(),
}))

describe("CountryChangeConfirmPopup - Given connect - mapStateToProps()", () => {
    it("should return state from the mockState", () => {
        const {countrySelector, text: {countryChangeModal}} = mockState

        const expected = {
            selectedCountry: countrySelector.selectedCountry,
            selectedLanguage: countrySelector.selectedLanguage,
            text: countryChangeModal
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })
})
