import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {StyledMenuButton} from "./components"
import {mockTheme} from "../../../../../__mocks__/mockStore"

describe("Given components for MenuButton", () => {
    test("StyledMenuButton", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledMenuButton />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
