import React from "react"
import {render} from "@testing-library/react"
import {mockDimensions} from "../../../__mocks__/mockStore"
import {Container} from "./component"

describe("Overlay component: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const props = {dimensions: mockDimensions, open: false}
            const {asFragment} = render(
                <Container {...props}>
                    <h1>Example</h1>
                </Container>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
