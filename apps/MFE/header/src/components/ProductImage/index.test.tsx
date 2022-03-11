import React from "react"
import {render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import ProductImage, {ProductImageProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Components - MiniShoppingBagItem: ", () => {
    describe("Item in the Bag- MiniShoppingBagItem: ", () => {
        let props: ProductImageProps
        beforeEach(() => {
            props = {
                description: "UGO Herman Melange Jacket",
                url: "/test-url999",
                itemNumber: "12345",
            }
        })

        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <ProductImage {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should have the correct href ", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <ProductImage {...props} />
                </SCThemeProvider>,
            )
            expect(screen.getByRole("link")).toHaveAttribute("href", "/test-url999#12345")
        })
        it("should not have href element ", () => {
            const propsWithEmptyStringUrl = {
                description: "UGO Herman Melange Jacket",
                url: "",
                itemNumber: "12345",
            }
            render(
                <SCThemeProvider theme={mockTheme}>
                    <ProductImage {...propsWithEmptyStringUrl} />
                </SCThemeProvider>,
            )
            expect(() => screen.getByRole("link")).toThrow('Unable to find an accessible element with the role "link"')
        })
    })
})
