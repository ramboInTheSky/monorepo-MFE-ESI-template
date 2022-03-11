import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import text from "../../../../../__mocks__/default-text.json"

import {ColourwaySwiperDetails} from "."
import {Fits} from "../../../../config/constants"

jest.mock("../../../fitIcon", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST fitIcon</div>,
}))
jest.mock("../../../saleSash", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST saleSash</div>,
}))

describe("Given a ColourwaySwiperDetails component", () => {
    it("should match the snapshot when displayNewIn, isOnSale, showFitsIcons set to true", () => {
        const props = {
            displayNewIn: true,
            fits: [Fits.Tall],
            isOnSale: true,
            showFitsIcons: true,
            text
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwaySwiperDetails {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when displayNewIn, isOnSale set to true", () => {
        const props = {
            displayNewIn: true,
            fits: [Fits.Tall],
            isOnSale: true,
            showFitsIcons: false,
            text
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwaySwiperDetails {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when displayNewIn set to true", () => {
        const props = {
            displayNewIn: true,
            fits: [Fits.Tall],
            isOnSale: false,
            showFitsIcons: false,
            text
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwaySwiperDetails {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when all set to false", () => {
        const props = {
            displayNewIn: false,
            fits: [Fits.Tall],
            isOnSale: false,
            showFitsIcons: false,
            text
        }
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwaySwiperDetails {...props} />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
