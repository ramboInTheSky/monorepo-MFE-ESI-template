import React from "react"
import {render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {ShoppingBagNotification, ShoppingBagNotificationProps} from "."
import {mockTheme, mockText} from "../../../__mocks__/mockStore"

jest.mock("@monorepo/cta", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    CTA: () => <div>CTA</div>,
}))

describe("Components - ShoppingBagNotification: ", () => {
    describe("ShoppingBagNotification with 5 items: ", () => {
        let props: ShoppingBagNotificationProps
        beforeEach(() => {
            props = {
                itemCount: 5,
                checkoutUrl: "http://something/checkoutUrl",
                text: {miniShoppingBag: mockText.miniShoppingBag, shoppingBag: mockText.shoppingBag},
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ShoppingBagNotification {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should have match notification message", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <ShoppingBagNotification {...props} />
                </SCThemeProvider>,
            )
            const notificationMessage = screen.getByTestId("header-shopping-bag-notification-message")
            expect(notificationMessage).toBeTruthy()
            expect(notificationMessage.textContent).toContain("You have 5 items in your bag")
        })

        it("should not have view edit button ", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <ShoppingBagNotification {...props} />
                </SCThemeProvider>,
            )
            const viewEditBtn = screen.getByTestId("header-shopping-bag-notification-view-edit-bag-btn")
            expect(viewEditBtn).toBeTruthy()
        })
    })

    describe("ShoppingBagNotification with 1 item: ", () => {
        let props: ShoppingBagNotificationProps
        beforeEach(() => {
            props = {
                itemCount: 1,
                checkoutUrl: "http://something/checkoutUrl",
                text: {miniShoppingBag: mockText.miniShoppingBag, shoppingBag: mockText.shoppingBag},
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ShoppingBagNotification {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should have match notification message", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <ShoppingBagNotification {...props} />
                </SCThemeProvider>,
            )
            const notificationMessage = screen.getByTestId("header-shopping-bag-notification-message")
            expect(notificationMessage).toBeTruthy()
            expect(notificationMessage.textContent).toContain("You have 1 item in your bag")
        })

        it("should have view edit button ", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <ShoppingBagNotification {...props} />
                </SCThemeProvider>,
            )
            const viewEditBtn = screen.getByTestId("header-shopping-bag-notification-view-edit-bag-btn")
            expect(viewEditBtn).toBeTruthy()
        })
    })

    describe("ShoppingBagNotification with 0 items: ", () => {
        let props: ShoppingBagNotificationProps
        beforeEach(() => {
            props = {
                itemCount: 0,
                checkoutUrl: "http://something/checkoutUrl",
                text: {miniShoppingBag: mockText.miniShoppingBag, shoppingBag: mockText.shoppingBag},
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ShoppingBagNotification {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
