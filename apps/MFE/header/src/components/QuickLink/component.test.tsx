import React from "react"
import {render} from "@testing-library/react"
import {Li, Text} from "./component"

describe(" components: Li ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<Li />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe(" components: Text ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(<Text />)
        expect(asFragment()).toMatchSnapshot()
    })
})
