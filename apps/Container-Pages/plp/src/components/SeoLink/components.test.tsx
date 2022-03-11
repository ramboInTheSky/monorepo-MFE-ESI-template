import React from "react"
import {render} from "@testing-library/react"
import {SEOLinkComponent} from "./components"

describe("Snapshots - products title", () => {
    test("StyledProductTitle", () => {
        const {asFragment} = render(<SEOLinkComponent />)
        expect(asFragment()).toMatchSnapshot()
    })
})
