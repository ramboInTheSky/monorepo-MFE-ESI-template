import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import urls from "../../config/urls"

describe("Components/ShoppingBagNotification - Given connect - mapStateToProps()", () => {
    it("should project state and itemCount", () => {
        expect(mapStateToProps(mockState)).toEqual({
            text: {miniShoppingBag: mockText.miniShoppingBag, shoppingBag: mockText.shoppingBag},
            itemCount: mockState.shoppingBag.itemCount,
            checkoutUrl: `${mockState.request.siteUrl}${urls.shoppingBag.url}`,
        })
    })
})
