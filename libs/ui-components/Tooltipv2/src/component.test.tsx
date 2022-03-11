import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {Arrow} from "./component"

describe("Arrow ", () => {
    it("should match the snapshot ", () => {
        const theme = {direction: "ltr", colours: {popover: {border: "1px solid #000"}}}
        const {asFragment} = render(
            <ThemeProvider theme={theme}>
                <Arrow />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot when rtl", () => {
        const theme = {direction: "rtl", colours: {popover: {border: "1px solid #fff"}}}
        const {asFragment} = render(
            <ThemeProvider theme={theme}>
                <Arrow />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
