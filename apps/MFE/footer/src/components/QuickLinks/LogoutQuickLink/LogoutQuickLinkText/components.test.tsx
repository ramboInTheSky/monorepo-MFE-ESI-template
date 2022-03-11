import React from "react"
import {render} from "@testing-library/react"
import {LogoutText} from "./components"

describe("LogoutQuickLinkText: ", () => {
    describe("LogoutText: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<LogoutText />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
