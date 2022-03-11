import React from "react"
import {render} from "@testing-library/react"

import {
    ChevronContainer,
    Chevron,
} from "./components"

describe("SearchBannerChevron", () => {
    test("ChevronContainer", () => {
        const {asFragment} = render(<ChevronContainer>Test</ChevronContainer>)
        expect(asFragment()).toMatchSnapshot()
    })
    test("Chevron is open", () => {
        const {asFragment} = render(<Chevron isOpen />)
        expect(asFragment()).toMatchSnapshot()
    })

    test("Chevron is closed", () => {
        const {asFragment} = render(<Chevron isOpen={false} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
