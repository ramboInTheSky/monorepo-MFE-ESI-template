import React from "react"
import {render} from "@testing-library/react"
import {StyledMenuItem, StyledListItemText, StyledListItemIcon} from "./components"

describe("Given components for the MenuPopper", () => {
    test("StyledMenuItem", () => {
        const {asFragment} = render(<StyledMenuItem>Test</StyledMenuItem>)
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledListItemText", () => {
        const {asFragment} = render(<StyledListItemText />)
        expect(asFragment()).toMatchSnapshot()
    })

    test("StyledListItemIcon", () => {
        const {asFragment} = render(<StyledListItemIcon />)
        expect(asFragment()).toMatchSnapshot()
    })
})
