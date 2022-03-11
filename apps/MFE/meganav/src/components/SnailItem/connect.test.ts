import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/SnailItem - Given connect - mapStateToProps()", () => {
    it("should return expected data from store", () => {
        const {siteUrl} = mockState.request
        const {showSecondaryNavArrow} = mockState.compositionSettings

        const got = mapStateToProps(mockState)
        expect(got).toEqual({
            siteUrl,
            showSecondaryNavArrow,
        })
    })
})
