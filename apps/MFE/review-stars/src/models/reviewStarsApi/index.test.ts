import {ReviewStarsApiContract} from "."

describe("Model - ReviewStars: ", () => {
    it("should match the expected ReviewStars model structure", () => {
        const testResponse = new ReviewStarsApiContract()
        testResponse.itemNumber = "1234"
        testResponse.totalReviewCount = 10
        testResponse.overallStarRating = 2.5
        expect(testResponse).toMatchSnapshot()
    })
})
