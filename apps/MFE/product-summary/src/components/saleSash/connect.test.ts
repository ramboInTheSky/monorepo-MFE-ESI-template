import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    let response
    beforeAll(() => {
        response = mapStateToProps(mockState)
    })

    it("should project state and return expected model", () => {
        expect(response).toEqual({
            saleSashUrl: mockState.productSummary.summaryData.saleSash,
            saleSashPosition: mockState.productSummary.summaryData.saleSashPosition,
        })
    })
})
