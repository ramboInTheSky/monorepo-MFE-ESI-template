import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/MiniShoppingBagItems - Given connect - mapStateToProps()", () => {
    it("should project state and only return bag when set realm as amido", () => {
        const newMockState = {...mockState, request: {...mockState.request, siteUrl: "http://fakeamido.com/en"}}
        const {
            text: {miniShoppingBag},
        } = newMockState

        expect(mapStateToProps(newMockState)).toEqual({
            bag: newMockState.shoppingBag.bag,
            text: miniShoppingBag,
        })
    })
})
