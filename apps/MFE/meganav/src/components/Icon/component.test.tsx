import React from "react"
import {render} from "@testing-library/react"
import {Container} from "./component"

describe("Icon components: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Container rotationDegrees={0} width={1} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
