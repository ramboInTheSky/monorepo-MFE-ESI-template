import React from "react"
import {render} from "@testing-library/react"
import {Img} from "./component"

describe("Icon components: ", () => {
    describe("Icon: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Img />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
