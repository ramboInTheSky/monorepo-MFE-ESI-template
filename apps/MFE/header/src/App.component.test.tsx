import React from "react"
import {render} from "@testing-library/react"
import {Section} from "./App.component"

describe("App: ", () => {
    describe("Section: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Section />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
