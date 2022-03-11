import {mockState} from "../../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return linkColor", () => {
        expect(mapStateToProps(mockState)).toEqual({
            cookies: mockState.request.headers?.cookie,
            siteUrl: "http://amido.com",
            isAmidoInternational: false,
        })
    })
})
