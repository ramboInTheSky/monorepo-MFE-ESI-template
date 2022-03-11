import {render} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"

import {AlphabetSection, PromotedBrandsContainer} from "./components"
import {mockTheme} from "../../../../__mocks__/mockStore"

describe("tabbedFiltersPanel components", () => {
    describe("Given a AlphabetSection", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <AlphabetSection />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a PromotedBrandsContainer", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(<PromotedBrandsContainer />)

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
