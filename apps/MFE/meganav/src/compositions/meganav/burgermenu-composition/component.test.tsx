import React from "react"
import {render} from "@testing-library/react"
import {NavigationBar} from "./component"

describe("NavigationBar component: ", () => {
    describe("NavigationBar: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<NavigationBar />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
