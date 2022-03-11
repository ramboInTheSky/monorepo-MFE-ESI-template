import {mockState} from "../../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should project state and return users and siteUrl", () => {
        expect(mapStateToProps(mockState)).toEqual({
            user: mockState.user,
            siteUrl: mockState.languages.siteUrl,
        })
    })
})
