import React from "react"
import {render} from "@testing-library/react"
import {DrawerContainer, CloseIcon} from "./component"

describe("Drawer components: ", () => {
    describe("DrawerContainer: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<DrawerContainer />)
            expect(asFragment()).toMatchSnapshot()
        })
        describe("CloseIcon: ", () => {
            it("should match the snapshot ", () => {
                const {asFragment} = render(<CloseIcon />)
                expect(asFragment()).toMatchSnapshot()
            })
        })
    })
})
