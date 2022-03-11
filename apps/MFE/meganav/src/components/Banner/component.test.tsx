import React from "react"
import {render} from "@testing-library/react"
import {Container} from "./component"

describe("Banner components: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Container />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
