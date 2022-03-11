import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {DesktopHeaderContainer} from "./components"
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Desktop Header Components", () => {
    test("DesktopHeaderContainer with 'hide' as false", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <DesktopHeaderContainer hide={false}>Test</DesktopHeaderContainer>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("DesktopHeaderContainer with 'hide' as true", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <DesktopHeaderContainer hide>Test</DesktopHeaderContainer>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
