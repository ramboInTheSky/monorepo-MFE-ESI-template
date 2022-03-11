import React from "react"
import {render} from "@testing-library/react"
import {CategoryQuickLinksContainer, NoResultsContainer} from "./components"

describe("Plp components -", () => {
    test("ProductsGridContainer", () => {
        const {asFragment} = render(<NoResultsContainer>Test</NoResultsContainer>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("CategoryQuickLinksContainer", () => {
        const {asFragment} = render(<CategoryQuickLinksContainer>Test</CategoryQuickLinksContainer>)
        expect(asFragment()).toMatchSnapshot()
    })
})
