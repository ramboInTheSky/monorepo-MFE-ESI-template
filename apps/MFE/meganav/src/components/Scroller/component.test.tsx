import React from "react"
import {render} from "@testing-library/react"
import {Container} from "./component"

describe("TabsScroll component: ", () => {
    describe("Container: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Container canScrollRight canScrollLeft />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
