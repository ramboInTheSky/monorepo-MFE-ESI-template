import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Li, Ul} from "./components"

describe("AutoComplete component: ", () => {
    describe("Ul: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Ul />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Li: ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Li />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
