import React from "react"
import {render} from "@testing-library/react"
import {Li } from "./component"

describe(" components: Li ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<Li />)
        expect(asFragment()).toMatchSnapshot()
    })
})
