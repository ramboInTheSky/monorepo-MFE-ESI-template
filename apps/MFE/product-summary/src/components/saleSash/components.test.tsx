import React from "react"
import {render} from "@testing-library/react"

import {SaleImg} from "./components"

describe("Given a SaleSah component - SaleImg", () => {
    it("should render the component correctly to match the snapshot", () => {
        const {asFragment} = render(<SaleImg src="test-img" />)

        expect(asFragment()).toMatchSnapshot()
    })
})
