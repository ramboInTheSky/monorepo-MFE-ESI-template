import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/CatalogueItem - Given connect - mapStateToProps()", () => {
    it("should return expected data from store", () => {
        const {text} = mockState
        expect(mapStateToProps(mockState)).toEqual({
            text: { chevronIconAltText: text.chevronIconAltText }, 
        })
    })
})
