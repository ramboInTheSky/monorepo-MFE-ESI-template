import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Copyright - Given connect - mapStateToProps()", () => {
    it("should project state and only data, regions, textAlignment", () => {
        expect(mapStateToProps(mockState)).toEqual({
            data: mockState.data,
            textAlignment: mockState.textAlignment,
            text: mockState.text,
        })
    })
})
