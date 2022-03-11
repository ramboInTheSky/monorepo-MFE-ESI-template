import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {BurgerMenuMiniShoppingBagDescriptionProps, BurgerMenuMiniShoppingBagDescription} from "."

describe("Components - MiniShoppingBagDescription: ", () => {
    const props: BurgerMenuMiniShoppingBagDescriptionProps = {
        ProductName: "ProductName",
        sizeText: "sizeText",
        SizeDescription: "SizeDescription",
        qtyText: "qtyText",
        Quantity: "2",
        StockStatus: "in stock",
        StockMessage: "StockMessage",
        ciStoreName: "ciStoreName",
        PriceFormatted: "£10.00",
        TPSearchDescription: "TPSearchDescription",
        Description: "Description",
    }

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <BurgerMenuMiniShoppingBagDescription {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
