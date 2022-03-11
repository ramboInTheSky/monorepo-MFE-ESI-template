import React from "react"
import {render} from "@testing-library/react"
import {SubRegionGrid, GridContainer, AccordionMainLinks, MainLinksHeader} from "./components"

describe("MainLinks: ", () => {
    describe("SubRegionGrid: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<SubRegionGrid />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("GridContainer: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<GridContainer />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("MainLinksHeader: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<MainLinksHeader />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("AccordionMainLinks: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<AccordionMainLinks />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
