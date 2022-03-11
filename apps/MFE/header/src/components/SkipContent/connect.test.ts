import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/SkipLinks - Given connect - mapStateToProps()", () => {
    it("should project state", () => {
        expect(mapStateToProps(mockState)).toEqual({
            text: mockText,
        })
    })
})
