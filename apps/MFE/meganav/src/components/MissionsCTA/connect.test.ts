import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/MissionsCTA - Given connect - mapStateToProps()", () => {
    it("should return expected data from store", () => {
        const {siteUrl} = mockState.request
        const {text} = mockState
        const got = mapStateToProps(mockState)
        expect(got).toEqual({
            siteUrl,
            textAlignment: "ltr",
            text: { arrowIconUrlAltText: text.arrowIconUrlAltText}
        })
    })
})
