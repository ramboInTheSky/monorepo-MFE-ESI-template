import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should project state when enabledSearchDesc is disabled", () => {
        const response = mapStateToProps(mockState)
        expect(response).toEqual({
            linkUrl: "http://test.co.uk/g5990s21/845632#845632",
            overallStarRating: 0,
            tooltipTitle: "White tall My Product (99434296) | £123",
        })
    })
    it("should project state when enabledSearchDesc is enabled", () => {
        const response = mapStateToProps({
            ...mockState,
            productSummary: {...mockState.productSummary, enabledSearchDesc: true},
        })
        expect(response).toEqual({
            linkUrl: "http://test.co.uk/g5990s21/845632#845632",
            overallStarRating: 0,
            tooltipTitle: "White (99434296) | £123",
        })
    })
})
