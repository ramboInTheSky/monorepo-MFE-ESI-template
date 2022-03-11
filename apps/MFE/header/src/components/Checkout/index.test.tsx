import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Checkout, CheckoutProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"
import {LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

describe("Components - Checkout: ", () => {
    let props: CheckoutProps
    beforeEach(() => {
        props = {
            enable: false,
            text: "text",
            url: "/shoppingbag",
            isInternationalCountry: false,
        }
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Checkout {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should be enabled if items are available in bag", () => {
        const w: any = window
        w.AmidoBasket = {Data: {ItemCount: 10}}
        render(
            <SCThemeProvider theme={mockTheme}>
                <Checkout {...props} enable />
            </SCThemeProvider>,
        )
        const button = screen.getByRole("link")
        expect(button).toHaveAttribute("href", "/shoppingbag")
        expect(button).toHaveStyle("opacity:1")
    })
    it("Should be disabled if items are not available in bag", () => {
        const w: any = window
        w.AmidoBasket = {Data: {ItemCount: 0}}
        render(
            <SCThemeProvider theme={mockTheme}>
                <Checkout {...props} enable={false} />
            </SCThemeProvider>,
        )
        const button = screen.getByRole("link")
        expect(button).toHaveAttribute("href", "/shoppingbag")
        expect(button).toHaveStyle({opacity: "0.5", "pointer-events": "none"})
    })
    it("should remove localStorage when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Checkout {...props} enable={false} />
            </SCThemeProvider>,
        )
        const button = screen.getByRole("link")
        fireEvent.click(button)
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
})
