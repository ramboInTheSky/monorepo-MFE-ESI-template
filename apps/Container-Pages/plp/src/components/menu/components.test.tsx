import React from "react"
import {render} from "@testing-library/react"
import {StyledMenuContainer} from "./components"

describe("Snapshots - Sort", () => {
    test("StyledMenuContainer", () => {
        const {asFragment} = render(<StyledMenuContainer>Test</StyledMenuContainer>)
        expect(asFragment()).toMatchSnapshot()
    })
})
