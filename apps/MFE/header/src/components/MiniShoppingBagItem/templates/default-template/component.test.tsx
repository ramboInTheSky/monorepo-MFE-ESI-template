import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {PriceParentWrapper, ProductDetails, StatusWrapper} from "./component"
import {IN_STOCK, SOLD_OUT} from "../../../../config/constants"

describe("Mini ShoppingBag Components: ", () => {
    describe("StatusWrapper ", () => {
        it("should match the snapshot with In stock status", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <StatusWrapper status={IN_STOCK} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot with delayed status", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <StatusWrapper status="Delayed" />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot with sold out status", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <StatusWrapper status={SOLD_OUT} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match the snapshot with empty status", () => {
            const status = ""
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <StatusWrapper status={status} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("ProductDetails ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ProductDetails />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("PriceParentWrapper ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <PriceParentWrapper />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
