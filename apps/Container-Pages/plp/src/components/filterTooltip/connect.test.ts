import connect from "./connect"
import {renderConnect} from "../../../__mocks__/connect"
import {mockText as text} from "../../../__mocks__/mockStore"

const mockState = {
    categoryQuickLinks: {
        items: [1, 2],
    }
}

describe("Given connect", () => {
    let props
    beforeAll(() => {
        jest.clearAllMocks()
        props = renderConnect(connect, mockState)
    })
    it("should correctly map state to props", () => {
        expect(props).toEqual({
            text,
            siteUrl: "",
            dispatch: expect.any(Function),
        })
    })
})
