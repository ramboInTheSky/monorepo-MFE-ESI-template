import React from "react"
import {render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Provider} from "react-redux"
import mockStore, {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {Item, ShoppingBag} from "../../models/shoppingbag"
import {MiniShoppingBagItems, MiniShoppingBagItemsProps} from "."

describe("Components - MiniShoppingBagItems: ", () => {
    describe("Items in the Bag- MiniShoppingBagItems: ", () => {
        let props: MiniShoppingBagItemsProps
        beforeEach(() => {
            props = {
                bag: {
                    Description: "Excluding UK Standard Delivery (Normally £3.99)",
                    MultiBuyDiscount: 1,
                    FinalOrderValueFormatted: "£89.00",
                    MultiBuyDiscountFormatted: "£1.00",
                    Items: [
                        {
                            ItemID: 1,
                            ItemNumber: "436441",
                            OptionNo: "04",
                            SizeDescription: "10 S",
                            StockMessage: "In Stock",
                            Description: "UGO Herman Melange Jacket",
                            AlternativeDescription: "",
                            Price: "45.00",
                            Quantity: 5,
                            CistStoreName: "LEICESTER - HIGH CROSS SHOPPING CENTRE",
                        } as Item,
                        {
                            ItemID: 2,
                            ItemNumber: "436461",
                            OptionNo: "04",
                            SizeDescription: "10 S",
                            StockMessage: "Delayed",
                            Price: "45.00",
                            Description: "UGO Herman Melange Jacket",
                            AlternativeDescription: "",
                            Quantity: 5,
                            CistStoreName: "",
                        } as Item,
                    ],
                } as ShoppingBag,
                text: mockText.miniShoppingBag,
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItems {...props} />
                    </SCThemeProvider>
                </Provider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should display the multibuy discount", () => {
            render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItems {...props} />
                    </SCThemeProvider>
                </Provider>,
            )
            const discountExpected = screen.getByTestId("header-mini-shopping-bag-multibuy-discount").textContent
            expect(discountExpected).toBe(`-${props.bag.MultiBuyDiscountFormatted}`)
        })

        it("should not display the multibuy discount", () => {
            const innerProps = {
                bag: {
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
                            Description: "UGO Herman Melange Jacket",
                            AlternativeDescription: "",
                            Price: "45.00",
                            Quantity: 5,
                            CistStoreName: "LEICESTER - HIGH CROSS SHOPPING CENTRE",
                        } as Item,
                    ],
                } as ShoppingBag,
                text: mockText.miniShoppingBag,
                template: "default",
            }
            render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItems {...innerProps} />
                    </SCThemeProvider>
                </Provider>,
            )
            const totalExpected = screen.getByTestId("header-mini-shopping-bag-total").textContent
            expect(totalExpected).toBe(`${innerProps.bag.FinalOrderValueFormatted}`)

            const discountElement = screen.queryAllByTestId("header-mini-shopping-bag-multibuy-discount")
            expect(discountElement.length).toBe(0)
        })

        it("should display the total", () => {
            render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItems {...props} />
                    </SCThemeProvider>
                </Provider>,
            )
            const totalExpected = screen.getByTestId("header-mini-shopping-bag-total").textContent
            expect(totalExpected).toBe(`${props.bag.FinalOrderValueFormatted}`)
        })

        it("should add event listener wheel to bagContainerRef", () => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const useEffect = jest.spyOn(React, "useEffect").mockImplementation(() => {})
            render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItems {...props} />
                    </SCThemeProvider>
                </Provider>,
            )
            expect(useEffect).toHaveBeenCalled()
        })

        it("should remove event listener wheel from bagContainerRef", () => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            const useEffect = jest.spyOn(React, "useEffect").mockImplementation(() => {})
            const component = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItems {...props} />
                    </SCThemeProvider>
                </Provider>,
            )

            component.unmount()
            expect(useEffect).toHaveBeenCalled()
        })
    })
})
