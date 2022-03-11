import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/MiniShoppingBag - Given connect - mapStateToProps()", () => {
    it("should project state and return shoppingBagUrl, bag and itemCount", () => {
        expect(mapStateToProps(mockState)).toEqual({
            bag: mockState.shoppingBag.bag,
            itemCount: mockState.shoppingBag.itemCount,
            shoppingBagUrl: "fakeamido.com/shoppingbag",
            text: mockText.miniShoppingBag,
        })
    })

    it("should project state with transformed shoppingBagUrl to contain siteUrl", () => {
        const {siteUrl} = mockState.request
        const props = mapStateToProps(mockState)

        expect(props.shoppingBagUrl).toContain(siteUrl)
    })
})
