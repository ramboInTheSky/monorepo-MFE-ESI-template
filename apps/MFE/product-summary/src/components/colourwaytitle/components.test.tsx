import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {TileTitle} from "./components"

describe("Given a Product Component - TileTitle", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <TileTitle />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
