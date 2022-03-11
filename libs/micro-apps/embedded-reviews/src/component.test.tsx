import React from "react"
import {render} from "@testing-library/react"
import {ReviewTitleContainer, ReviewProviderLogoContainer, ReviewSummaryContainer} from "./component"

describe("ReviewTitleContainer component: ", () => {
    it("should render correctly", () => {
        const {asFragment} = render(
            <ReviewTitleContainer />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("ReviewProviderLogoContainer component: ", () => {
    it("should render correctly", () => {
        const {asFragment} = render(<ReviewProviderLogoContainer />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("ReviewSummaryContainer component: ", () => {
    it("should render correctly", () => {
        const {asFragment} = render(<ReviewSummaryContainer />)
        expect(asFragment()).toMatchSnapshot()
    })
})
