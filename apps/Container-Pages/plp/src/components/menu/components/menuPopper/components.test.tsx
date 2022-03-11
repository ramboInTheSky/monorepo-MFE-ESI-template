import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {StyledMenuItem, Arrow, StyledPopper, StyledMenuList} from "./components"

describe("Given components for the MenuPopper", () => {
    test("StyledMenuItem", () => {
        const {asFragment} = render(<StyledMenuItem>Test</StyledMenuItem>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("Arrow", () => {
        const {asFragment} = render(<Arrow />)
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledPopper", () => {
        const {baseElement} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledPopper id="test" transition open anchorEl={undefined} role={undefined}>
                    TEST
                </StyledPopper>
            </ThemeProvider>,
        )
        expect(baseElement).toMatchSnapshot()
    })

    test("StyledMenuList", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledMenuList />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
