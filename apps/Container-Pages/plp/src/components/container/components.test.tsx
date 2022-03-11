import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {PlpContainerComponent} from "./components"

describe("Snapshots - Container", () => {
    test("PlpContainerComponent when pageinfiltersbreakpoint is md", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <PlpContainerComponent>Test</PlpContainerComponent>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("PlpContainerComponent when pageinfiltersbreakpoint is lg ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <PlpContainerComponent>Test</PlpContainerComponent>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
