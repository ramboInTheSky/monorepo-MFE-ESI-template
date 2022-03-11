import React from "react"
import {render, fireEvent} from "@testing-library/react"

import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {handleProductClick} from "../../../../events"

import {ColourwayImageSlide} from "."

jest.mock("../../../../hooks/useLazyLoadImage", () => ({
    useProductLazyLoadImage: () => ({
        imageProps: {
            alt: "test-image-url",
            className: "c1 lazyload",
            "data-src": "test-image-url",
            src: "spiderman/Common/Items/Default/Default/ANYTHING.jpg",
        },
    }),
}))

jest.mock("../../../../events", () => ({
    handleProductClick: jest.fn(),
}))

describe("Given a ColourwayImageSlide", () => {
    it("should render the components with tabindex as 1 ", () => {
        const props = {
            id: "abc123",
            imageUrl: "iamImageUrl",
            linkUrl: "iamLinkUrl",
            tooltipTitle: "Dummy tooltipTitle",
            lazyloadProductImages: false,
            isActiveSlide: true,
            textTitle: "test title",
            colour: "White",
            price: "£123",
            currencyCode: "GBP",
            department: "menswear",
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwayImageSlide {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it("should render the components with tabindex as 0", () => {
        const props = {
            id: "abc123",
            imageUrl: "iamImageUrl",
            linkUrl: "iamLinkUrl",
            tooltipTitle: "Dummy tooltipTitle",
            lazyloadProductImages: false,
            isActiveSlide: false,
            textTitle: "test title",
            colour: "White",
            price: "£123",
            currencyCode: "GBP",
            department: "menswear",
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwayImageSlide {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    describe("When clicked", () => {
        it("should call the handleProductClick event", () => {
            const props = {
                id: "abc123",
                imageUrl: "iamImageUrl",
                linkUrl: "iamLinkUrl",
                tooltipTitle: "Dummy tooltipTitle",
                lazyloadProductImages: false,
                isActiveSlide: false,
                textTitle: "test title",
                colour: "White",
                price: "£123",
                currencyCode: "GBP",
                department: "menswear",
            }

            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <ColourwayImageSlide {...props} />
                </ThemeProvider>,
            )

            fireEvent.click(getByTestId("product_summary_image_media"))

            expect(handleProductClick).toHaveBeenCalled()
        })
    })
})
