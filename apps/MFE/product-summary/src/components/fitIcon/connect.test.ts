import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import text from "../../../__mocks__/default-text.json"

describe("Given connect - mapStateToProps()", () => {
    const mappedProps = mapStateToProps(mockState)

    it("should project state and only return pid", () => {
        expect(mappedProps).toEqual({
            isLazyloadFitIcons: mockState.lazyload.fitIcons,
            text,
        })
    })
})
