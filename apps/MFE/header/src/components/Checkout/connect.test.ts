import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import urls from "../../config/urls"

describe("Components/Checkout - Given connect - mapStateToProps()", () => {
    it("should return Checkout props from the mockState", () => {
        const expected = {
            enable: mockState.shoppingBag.itemCount > 0,
            text: mockState.text.checkout.text,
            url: `${mockState.request.siteUrl}${urls.checkout.url}`,
            isInternationalCountry: mockState.request.isInternationalCountry,
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })
})
