import {getComponent, mapStateToProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"
import DefaultQuickLink from "./templates/default-template"
import BurgerMenuQuickLink from "./templates/burgermenu-template"

describe("Components/QuickLink - Given connect - mapStateToProps()", () => {
    it("should return initial mockState", () => {
        const expected = {
            componentName: DefaultQuickLink,
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })

    it("should return default component when template name is incorrect", () => {
        expect(getComponent("robin")).toEqual(DefaultQuickLink)
    })

    it("should return mockState with updated template", () => {
        const updatedState = {...mockState, template: "burgerMenu" }
        const expected = {
            componentName: BurgerMenuQuickLink,
        }
        const got = mapStateToProps(updatedState)
        expect(got).toEqual(expected)
    })

    it("should return burgermenu component when template name is burgerMenu", () => {
        expect(getComponent("burgerMenu")).toEqual(BurgerMenuQuickLink)
    })
    
})