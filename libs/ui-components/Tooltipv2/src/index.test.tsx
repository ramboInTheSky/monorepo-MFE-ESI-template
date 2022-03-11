import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import Tooltipv2, {ToolTipProps} from "."

jest.mock("@mui/material", () => ({
    // eslint-disable-next-line react/display-name
    ClickAwayListener: props => <div {...props}>{props.children}</div>,
}))

describe("Components - Tooltipv2: ", () => {
    let props: ToolTipProps
    const timeout = 1000
    const handleClose = jest.fn()
    const theme = {direction: "ltr", colours: {popover: {border: "1px solid #000"}}}
    beforeEach(() => {
        props = {
            children: <h1>content</h1>,
            handleClose,
            referenceElement: null,
            timeout: undefined,
        }
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={theme}>
                <Tooltipv2 {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("onLoad to fire setMouseOut with Timeout", () => {
        render(
            <ThemeProvider theme={theme}>
                <Tooltipv2 {...props} timeout={timeout} />
            </ThemeProvider>,
        )
        setTimeout(() => {
            expect(handleClose).toBeCalled()
        }, timeout)
    })
})
