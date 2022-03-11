import React from "react"
import {render} from "@testing-library/react"
import {EmbeddedReviews} from "."

describe("Embedded Reviews component - ", () => {
    const testProps = {
        realm: "amido",
        reviewProvider: "Feefo",
        reviewProviderImagePath: "https://xcdn.amido.com/content/platmod/images/pdp/brand/amido/review-provider.svg",
    }

    it("should match the snapshot template with test props", () => {
        const {asFragment} = render(<EmbeddedReviews {...testProps} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
