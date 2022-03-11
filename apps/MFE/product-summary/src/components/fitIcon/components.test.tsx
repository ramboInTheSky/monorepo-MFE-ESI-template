import React from "react"
import {render} from "@testing-library/react"
import {StyledImage, FitsContainer} from "./components"

describe("Given a Fit Icon - StyledImage", () => {
    it("should render as expected", () => {
        const {asFragment} = render(<StyledImage />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given aa Fit Icon - FitsContainer", () => {
    it("should render as expected", () => {
        const {asFragment} = render(<FitsContainer />)
        expect(asFragment()).toMatchSnapshot()
    })
})
