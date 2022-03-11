import React from "react"
import {render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {MiniShoppingBag, MiniShoppingBagProps} from "."
import {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {Item, ShoppingBag} from "../../models/shoppingbag"

jest.mock("../Checkout", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Checkout</div>,
}))

jest.mock("@monorepo/cta", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    CTA: () => <div>CTA</div>,
}))

jest.mock("../MiniShoppingBagItems", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Mini Shopping bag items</div>,
}))

describe("Components - MiniShoppingBag: ", () => {
    describe("Empty - MiniShoppingBag: ", () => {
        let props: MiniShoppingBagProps
        let propsWithOutOfStock: MiniShoppingBagProps

        beforeEach(() => {
            props = {
                itemCount: 0,
                shoppingBagUrl: "http://somoething/shoppingbag",
                bag: {
                    ItemCount: 0,
                    Description: "Excluding UK Standard Delivery (Normally £3.99)",
                    MultiBuyDiscount: 0,
                    FinalOrderValueFormatted: "£0.00",
                    MultiBuyDiscountFormatted: "£0.00",
                } as ShoppingBag,
                text: mockText.miniShoppingBag,
            }
            propsWithOutOfStock = {
                itemCount: 0,
                shoppingBagUrl: "http://somoething/shoppingbag",
                bag: {
                    ItemCount: 0,
                    Description: "Excluding UK Standard Delivery (Normally £3.99)",
                    MultiBuyDiscount: 0,
                    FinalOrderValueFormatted: "£0.00",
                    MultiBuyDiscountFormatted: "£0.00",
                    Items: [
                        {
                            ItemID: 1,
                            ItemNumber: "436441",
                            OptionNo: "04",
                            SizeDescription: "10 S",
                            StockMessage: "In Stock",
                            Price: "45.00",
                            Quantity: 5,
                        } as Item,
                    ],
                } as ShoppingBag,
                text: mockText.miniShoppingBag,
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot with burger template", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should have empty bag message ", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...props} />
                </SCThemeProvider>,
            )
            const emptyMessage = screen.getByTestId("header-mini-shopping-bag-empty").textContent
            expect(emptyMessage).toBe("Your shopping bag is empty")
        })
        it("should not have empty bag message ", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...propsWithOutOfStock} />
                </SCThemeProvider>,
            )
            const emptyMessage = screen.getByTestId("header-mini-shopping-bag-list").textContent
            expect(emptyMessage).toBeTruthy()
        })
    })

    describe("Not Empty - MiniShoppingBag: ", () => {
        let props: MiniShoppingBagProps
        let propsWithOutOfStock: MiniShoppingBagProps

        beforeEach(() => {
            props = {
                itemCount: 1,
                shoppingBagUrl: "http://somoething/shoppingbag",
                bag: {
                    ItemCount: 1,
                    Description: "Excluding UK Standard Delivery (Normally £3.99)",
                    MultiBuyDiscount: 0,
                    FinalOrderValueFormatted: "£45.00",
                    MultiBuyDiscountFormatted: "",
                    Items: [
                        {
                            ItemID: 1,
                            ItemNumber: "436441",
                            OptionNo: "04",
                            SizeDescription: "10 S",
                            StockMessage: "In Stock",
                            Price: "45.00",
                            Quantity: 5,
                        } as Item,
                    ],
                } as ShoppingBag,
                text: mockText.miniShoppingBag,
            }
            propsWithOutOfStock = {
                itemCount: 0,
                shoppingBagUrl: "http://somoething/shoppingbag",
                bag: {
                    ItemCount: 1,
                    Description: "Excluding UK Standard Delivery (Normally £3.99)",
                    MultiBuyDiscount: 0,
                    FinalOrderValueFormatted: "£45.00",
                    MultiBuyDiscountFormatted: "",
                    Items: [
                        {
                            ItemID: 1,
                            ItemNumber: "436441",
                            OptionNo: "04",
                            SizeDescription: "10 S",
                            StockMessage: "Out Of Stock",
                            Price: "45.00",
                            Quantity: 5,
                        } as Item,
                    ],
                } as ShoppingBag,
                text: mockText.miniShoppingBag,
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot when itemlist has Out Of Stock item", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...propsWithOutOfStock} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should list minishopping bag items ", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...props} />
                </SCThemeProvider>,
            )
            const listComponent = screen.getByTestId("header-mini-shopping-bag-list")
            expect(listComponent).toBeTruthy()
        })

        it("should add event listener wheel to bagContainerRef", () => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const useEffect = jest.spyOn(React, "useEffect").mockImplementation(() => {})
            render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...props} />
                </SCThemeProvider>,
            )
            expect(useEffect).toHaveBeenCalled()
        })

        it("should remove event listener wheel from bagContainerRef", () => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const useEffect = jest.spyOn(React, "useEffect").mockImplementation(() => {})
            const component = render(
                <SCThemeProvider theme={mockTheme}>
                    <MiniShoppingBag {...props} />
                </SCThemeProvider>,
            )

            component.unmount()
            expect(useEffect).toHaveBeenCalled()
        })
    })
})
