import {getComponent, mapStateToProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"
import {MiniShoppingBagDescription} from "./templates/default-template"
import {BurgerMenuMiniShoppingBagDescription} from "./templates/burgermenu-template"

describe("Components/MiniShoppingBagItem - Given connect - mapStateToProps()", () => {
    it("should return initial mockState", () => {
        const expected = {
            ComponentName: MiniShoppingBagDescription,
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })

    it("should return default component when template name is incorrect", () => {
        expect(getComponent("default")).toEqual(MiniShoppingBagDescription)
    })

    it("should return mockState with updated template", () => {
        const updatedState = {...mockState, template: "burgerMenu"}
        const expected = {
            ComponentName: BurgerMenuMiniShoppingBagDescription,
        }
        const got = mapStateToProps(updatedState)
        expect(got).toEqual(expected)
    })

    it("should return burgermenu component when template name is burgerMenu", () => {
        expect(getComponent("burgerMenu")).toEqual(BurgerMenuMiniShoppingBagDescription)
    })
})
