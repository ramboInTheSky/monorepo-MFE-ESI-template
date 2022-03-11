import React from "react"
import {render} from "@testing-library/react"
import {StyledFacetsContainer} from "./components"

describe("Facets Components", () => {
    test("StyledFacetsContainer", () => {
        const {asFragment} = render(<StyledFacetsContainer>Test</StyledFacetsContainer>)
        expect(asFragment()).toMatchSnapshot()
    })
})
