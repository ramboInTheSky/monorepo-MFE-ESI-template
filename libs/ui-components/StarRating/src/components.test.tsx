import React from "react"
import {render} from "@testing-library/react"
import {StarRatingContainer, StarRatingsCount} from "./components"

describe("Common/StarRating - Components", () => {
    describe("StarRatingContainer", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <StarRatingContainer>
                    test
                </StarRatingContainer>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    
    })
    describe("StarRatingsCount", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <StarRatingsCount>
                    (100)
                </StarRatingsCount>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
