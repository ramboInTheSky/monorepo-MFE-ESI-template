import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {ProductReviewStars} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

jest.mock("@monorepo/star-rating", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    StarRating: () => <div>TEST STARRATING COMPONENT</div>,
}))

describe("ProductReviewStars component - ", () => {
    it("should render correctly", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ProductReviewStars overallStarRating={2.5} totalReviewCount={9} hasReviews />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render correctly when no reviews", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ProductReviewStars overallStarRating={0} totalReviewCount={0} hasReviews={false} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
