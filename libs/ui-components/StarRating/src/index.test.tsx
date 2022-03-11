import React from "react"
import {render} from "@testing-library/react"
import {StarRating} from "."

const props = {
    value: 3,
    countValue: 100,
    starFilledColour: "#000000",
    starEmptyColour: "#D1D1D1",
}

describe("Common/StarRating: ", () => {
    it("should match the snapshot template with test props", () => {
        const {asFragment} = render(<StarRating {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot template with no props and defaults", () => {
        const {asFragment} = render(<StarRating />)
        expect(asFragment()).toMatchSnapshot()
    })
    describe("countValue", () => {
        it("should render count if countValue is given", () => {
            const {queryByTestId} = render(<StarRating {...props} />)
            const starRatingCount = queryByTestId("star-rating-count")
            expect(starRatingCount).toBeInTheDocument()
        })
        it("should not render count if no countValue is given", () => {
            const {queryByTestId} = render(<StarRating {...{...props, countValue: undefined}} />)
            const starRatingCount = queryByTestId("star-rating-count")
            expect(starRatingCount).not.toBeInTheDocument()
        })
    })
})
