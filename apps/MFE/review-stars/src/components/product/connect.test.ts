import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return pid", () => {
        expect(mapStateToProps(mockState)).toEqual({
            overallStarRating: mockState.reviewStars.overallStarRating,
            totalReviewCount: mockState.reviewStars.totalReviewCount,
            hasReviews: true
        })
    })
})
