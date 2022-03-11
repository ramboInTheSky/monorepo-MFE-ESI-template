import React from "react"
import {render} from "@testing-library/react"
import {Container, Column, Hr} from "./component"

describe("Catalogue component: ", () => {
    describe("Container", () => {
        it("should match the snapshot when it has Missions", () => {
            const {asFragment} = render(<Container hasMissions />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Container hasMissions={false} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Column", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Column numberofcolumns={4} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Hr", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Hr />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
