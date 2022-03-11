import React from "react"
import {render} from "@testing-library/react"
import {CloseIcon} from "./drawer-component"

describe("Drawer - Components", () => {
    describe("CloseIcon", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<CloseIcon />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
