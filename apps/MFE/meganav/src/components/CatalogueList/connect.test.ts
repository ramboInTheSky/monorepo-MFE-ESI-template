import {mapStateToProps, mapDispatchToProps} from "./connect"

describe("Components/CatalogueList - Given connect - mapStateToProps()", () => {
    it("should return CatalogueList from the mockState", () => {
        const mockProps = {title: "clothing"}
        const mockState: any = {
            primarynav: {activeDepartment: "men"},
            accordionActivity: {men: false},
            secondarynav: {isImagePlaceholderEnabled: true},
            text: { chevronIconAltText : "Chevron icon"}
        }
        const got = mapStateToProps(mockState, mockProps)
        const expected = {
            opened: false, 
            isImagePlaceholderEnabled: true,
            text: mockState.text
        }
        expect(got).toEqual(expected)
    })
})

describe("Components/CatalogueList - Given connect - mapDispatchToProps()", () => {
    it("should return dispatch methods from connect", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        expect(got).toHaveProperty("setOpened")
    })
    it("should dispatch once when setOpened is called", () => {
        const dispatch = jest.fn()
        const got = mapDispatchToProps(dispatch)
        got.setOpened("men")
        expect(dispatch).toHaveBeenCalledTimes(1)
    })
})
