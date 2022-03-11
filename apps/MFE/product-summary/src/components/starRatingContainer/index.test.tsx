import React from "react"
import {render} from "@testing-library/react"
import {StarRatingContainer} from "."

jest.mock("@monorepo/star-rating", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    StarRating: ({value}) => <div>Star Rating {value}</div>,
}))

describe("Given a StarRatingContainer Component", () => {
    it("should match the snapshot when star rating is 3", () => {
        const props = {
            overallStarRating: 3,
            linkUrl: "superman/URL",
            tooltipTitle: "some text",
        }
        const {asFragment} = render(<StarRatingContainer {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when star rating is 0", () => {
        const props = {
            overallStarRating: 0,
            linkUrl: "superman/URL",
            tooltipTitle: "some text",
        }
        const {asFragment} = render(<StarRatingContainer {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
