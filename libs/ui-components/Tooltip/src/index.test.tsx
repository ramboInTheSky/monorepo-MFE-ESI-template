import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "@monorepo/themes"
import Tooltip, {ToolTipProps} from "."

jest.mock("@mui/material", () => ({
    // eslint-disable-next-line react/display-name
    ClickAwayListener: props => <div {...props}>{props.children}</div>,
    // eslint-disable-next-line react/display-name
    Popper: props => <div {...props}>{props.children}</div>,
}))

jest.mock("@monorepo/animations", () => ({
    // eslint-disable-next-line react/display-name
    FadeInAnimation: props => <div {...props}>{props.children}</div>,
}))

describe("Components - Tooltip: ", () => {
    let props: ToolTipProps
    const timeout = 1000
    const handleClose = jest.fn()
    beforeEach(() => {
        props = {
            children: <h1>content</h1>,
            handleClose,
            open: false,
            anchorEl: null,
            timeout: undefined,
        }
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Tooltip {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot with custom modifiers", () => {
        const newProps: ToolTipProps = {
            ...props,
            modifiers: {
                flip: {
                    enabled: false,
                },
            },
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Tooltip {...newProps} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot - disabling modifiers arrow", () => {
        const newProps = {
            ...props,
            enableModArrow: false,
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Tooltip {...newProps} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("onLoad to fire setMouseOut with Timeout", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <Tooltip {...props} timeout={timeout} />
            </ThemeProvider>,
        )
        setTimeout(() => {
            expect(handleClose).toBeCalled()
        }, timeout)
    })
})
