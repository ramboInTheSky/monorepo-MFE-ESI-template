import {mockState} from "../../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should the siteurl", () => {
        expect(mapStateToProps(mockState)).toEqual({
            siteUrl: mockState.languages.siteUrl,
        })
    })
})
