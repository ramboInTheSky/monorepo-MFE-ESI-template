import {mockState} from "../../../__mocks__/mockStore"
import {REALM_HEADER} from "../../config/constants"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should return the correct state from the store", () => {
        expect(mapStateToProps(mockState)).toEqual({
            realm: mockState.request.headers![REALM_HEADER],
            variant: mockState.settings.variant,
        })
    })
})
