import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {MiniShoppingBagDescription, MiniShoppingBagDescriptionProps} from "."

describe("Components - MiniShoppingBagDescription: ", () => {
    const props: MiniShoppingBagDescriptionProps = {
        AlternativeDescription: "AlternativeDescription",
        Description: "Description",
        IsDiscount: true,

        ProductName: "ProductName",
        sizeText: "sizeText",
        SizeDescription: "SizeDescription",
        qtyText: "qtyText",
        Quantity: "2",
        StockStatus: "in stock",
        StockMessage: "StockMessage",
        ciStoreName: "ciStoreName",
        PriceFormatted: "£10.00",
        text: "any",
    }

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MiniShoppingBagDescription {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
