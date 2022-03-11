import {EnableFavourites, EnableReviewStars} from "."

describe("Model - EnableFavourites: ", () => {
    const mockTestState: EnableFavourites = {
        Value: false,
    }
    it("should match the EnableFavourites", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
describe("Model - EnableReviewStars: ", () => {
    const mockTestState: EnableReviewStars = {
        Value: true,
    }
    it("should match the EnableReviewStars", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
