import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/MeganavESI - Given connect - mapStateToProps()", () => {
    it("should project state and only return timeMachineDate", () => {
        expect(mapStateToProps(mockState)).toEqual({
            timeMachineDate: mockState.request.timeMachineDate,
            siteUrl: mockState.request.siteUrl,
        })
    })
})
