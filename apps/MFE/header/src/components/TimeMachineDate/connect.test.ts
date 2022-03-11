import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/TimeMachineDate - Given connect - mapStateToProps()", () => {
    it("should project state and return useTimeMachineCookie", () => {
        expect(mapStateToProps(mockState)).toEqual({
            useTimeMachineCookie: mockState.request.useTimeMachineCookie,
        })
    })
})
