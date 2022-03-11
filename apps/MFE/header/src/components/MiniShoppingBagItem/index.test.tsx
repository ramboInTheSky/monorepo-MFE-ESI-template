import React from "react"
import {render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Provider} from "react-redux"
import mockStore, {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {Item} from "../../models/shoppingbag"
import {MiniShoppingBagItem, MiniShoppingBagItemProps} from "."
import {MiniShoppingBagDescription} from "./templates/default-template"

describe("Components - MiniShoppingBagItem: ", () => {
    describe("Item in the Bag- MiniShoppingBagItem: ", () => {
        let props: MiniShoppingBagItemProps
        beforeEach(() => {
            props = {
                item: {
                    ItemID: 1,
                    ItemNumber: "436441",
                    Description: "UGO Herman Melange Jacket",
                    AlternativeDescription: "",
                    OptionNo: "04",
                    SizeDescription: "10 S",
                    StockMessage: "In Stock",
                    Price: "45.00",
                    Quantity: 5,
                    CistStoreName: "LEICESTER - HIGH CROSS SHOPPING CENTRE",
                    Url: "/test-url",
                    IsDiscount: false,
                } as Item,
                text: mockText.miniShoppingBag,
                ComponentName: MiniShoppingBagDescription,
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItem {...props} />
                    </SCThemeProvider>
                </Provider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot with alternative description ", () => {
            const newProps = {
                item: {
                    ItemID: 1,
                    ItemNumber: "436441",
                    Description: "UGO Herman Melange Jacket",
                    AlternativeDescription: "Alternative UGO Herman Melange Jacket",
                    OptionNo: "04",
                    SizeDescription: "10 S",
                    StockMessage: "In Stock",
                    Price: "45.00",
                    Quantity: 5,
                    CistStoreName: "LEICESTER - HIGH CROSS SHOPPING CENTRE",
                } as Item,
                text: mockText.miniShoppingBag,
                ComponentName: "default",
            }
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItem {...newProps} />
                    </SCThemeProvider>
                </Provider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        const newProps = {
            item: {
                ItemID: 1,
                ItemNumber: "436441",
                Description: "UGO Herman Melange Jacket",
                AlternativeDescription: "Alternative UGO Herman Melange Jacket",
                OptionNo: "04",
                SizeDescription: "10 S",
                StockMessage: "In Stock",
                Price: "45.00",
                Quantity: 5,
                CistStoreName: "LEICESTER - HIGH CROSS SHOPPING CENTRE",
                IsDiscount: true,
            } as Item,
            text: mockText.miniShoppingBag,
            ComponentName: MiniShoppingBagDescription,
        }
        it("should match the snapshot with discount element ", () => {
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItem {...newProps} />
                    </SCThemeProvider>
                </Provider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should have sale price text", () => {
            render(
                <Provider store={mockStore}>
                    <SCThemeProvider theme={mockTheme}>
                        <MiniShoppingBagItem {...newProps} />
                    </SCThemeProvider>
                </Provider>,
            )
            const salePriceText = screen.getByTestId("header-mini-shopping-bag-item-sale-price").textContent
            expect(salePriceText).toBe(newProps.text.salePrice)
        })
    })
})
