import React from "react"
import {render} from "@testing-library/react"
import PercentageFill from "."

describe("PercentageFill component - ", () => {
    it("should match the snapshot with percentage fill provided", () => {
        const {asFragment} = render(
            <PercentageFill percentageValue={30}/>
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot with an out of range value. No fill applied", () => {
        const {asFragment} = render(
            <PercentageFill percentageValue={-50}/>
        )
        expect(asFragment()).toMatchSnapshot()
    })
})