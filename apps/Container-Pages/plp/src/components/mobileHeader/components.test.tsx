import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {MobileHeaderContainer, RelativeContainer} from "./components"

describe("Snapshots - Mobile Header", () => {
    test("MobileHeaderContainer with top value", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <MobileHeaderContainer sticky>Test</MobileHeaderContainer>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("MobileHeaderContainer without top value", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <MobileHeaderContainer sticky={false}>Test</MobileHeaderContainer>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    test("RelativeContainer", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <RelativeContainer>Test</RelativeContainer>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
