import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Components/CatalogueItem - Given connect - mapStateToProps()", () => {
    it("should return expected data from store", () => {
        const {
            text,
            request: {siteUrl},
        } = mockState
        const got = mapStateToProps(mockState)
        expect(got).toEqual({
            textAlignment: "ltr",
            text: {chevronIconAltText: text.chevronIconAltText},
            siteUrl,
        })
    })
})
