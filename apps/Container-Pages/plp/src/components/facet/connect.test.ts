import {mapStateToProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"


describe("Given connect", () => {
    it("should project state", () => {
        expect(mapStateToProps(mockState, {})).toEqual({
            enabledTooltips: false
        })
    })
})
