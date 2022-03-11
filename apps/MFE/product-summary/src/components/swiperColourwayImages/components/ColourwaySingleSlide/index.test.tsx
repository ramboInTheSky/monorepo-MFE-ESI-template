import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import text from "../../../../../__mocks__/default-text.json"

import {ColourwaySingleSlide} from "."
import {Fits} from "../../../../config/constants"

jest.mock("../ColourwaySwiperDetails", () => ({
    // eslint-disable-next-line react/display-name
    ColourwaySwiperDetails: () => <div>ColourwaySwiperDetails</div>,
}))
jest.mock("../ColourwayImageSlide", () => ({
    // eslint-disable-next-line react/display-name
    ColourwayImageSlide: () => <div>ColourwayImageSlide</div>,
}))

describe("Given a ColourwaySingleSlide component", () => {
    it("should match the snapshot when isOnServer set to true", () => {
        const slide = {
            imageUrl: "abc",
            tooltipTitle: "abc",
            linkUrl: "abc",
            id: "abc",
            lazyloadProductImages: true,
            textTitle: "abc",
            colour: "blue",
            price: "£123",
            currencyCode: "GBP",
            department: "menswear",
        }

        const imageDetails = {
            displayNewIn: true,
            fits: [Fits.Tall],
            isOnSale: true,
            showFitsIcons: true,
            text,
        }
        const props = {
            slide,
            imageDetails,
            isOnServer: true,
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwaySingleSlide {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when isOnServer set to false", () => {
        const slide = {
            imageUrl: "abc",
            tooltipTitle: "abc",
            linkUrl: "abc",
            id: "abc",
            lazyloadProductImages: true,
            textTitle: "abc",
            colour: "blue",
            price: "£123",
            currencyCode: "GBP",
            department: "menswear",
        }

        const imageDetails = {
            displayNewIn: true,
            fits: [Fits.Tall],
            isOnSale: true,
            showFitsIcons: true,
            text,
        }
        const props = {
            slide,
            imageDetails,
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwaySingleSlide {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
