import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import {Arrow, Popper} from "./component"

describe("Arrow ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Arrow />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when rtl", () => {
        const rtlTheme = {...mockTheme, direction: "rtl"}
        const {asFragment} = render(
            <ThemeProvider theme={rtlTheme}>
                <Arrow />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Popper : ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Popper id="test" transition open={false} anchorEl={undefined} role={undefined}>
                    Testing
                </Popper>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot with different props", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Popper id="test" $closeToTop transition open={false} anchorEl={undefined} role={undefined}>
                    Testing
                </Popper>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
