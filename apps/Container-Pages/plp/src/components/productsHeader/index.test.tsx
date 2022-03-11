import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import ProductsHeader from "."
import {mockTheme} from "../../../__mocks__/mockStore"
import * as ReachedHideFixedItemsModule from "../../hooks/useHideFixedItems"

jest.mock("../desktopSort", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST DESKTOP SORT </div>,
}))
jest.mock("../productsTitle", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST PRODUCT TITLE </div>,
}))

function mockUseHideFixedItems(hideFixedItems: boolean) {
    jest.spyOn(ReachedHideFixedItemsModule, "useHideFixedItems").mockReturnValue({hideFixedItems})
}

describe("Given a Desktop header", () => {
    describe("When rendering", () => {
        it("should show the Desktop header", () => {
            mockUseHideFixedItems(true)

            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <ProductsHeader />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
