import React from "react"
import {render} from "@testing-library/react"
import {Anchor} from "./component"

describe("Components - Anchor: ", () => {
    it("should match snapshot", () => {
        const {asFragment} = render(<Anchor />)
        expect(asFragment).toMatchSnapshot()
    })
})
