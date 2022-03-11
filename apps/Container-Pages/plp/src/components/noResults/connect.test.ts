import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return noResults", () => {
        expect(mapStateToProps(mockState)).toEqual({
            searchTerm: mockState.request.searchTerm,
            text: mockText
        })
    })
})
