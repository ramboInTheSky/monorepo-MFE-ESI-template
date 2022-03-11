import React from "react"
import {render} from "@testing-library/react"
import {PercentageFillContainer, BorderLinearProgress} from "./component"

describe("PercentageFillContainer component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <PercentageFillContainer />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("BorderLinearProgress component: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <BorderLinearProgress />
        )
        expect(asFragment()).toMatchSnapshot()
    })
})