import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/CatalogueItem - Given connect - mapStateToProps()", () => {
    it("should return expected data from store", () => {
        expect(mapStateToProps(mockState)).toEqual({
            text: { drawerIconAltText: mockState.text.drawerIconAltText },
        })
    })
})
